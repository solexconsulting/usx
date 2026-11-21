import importlib.util
import io
import json
from pathlib import Path
from tempfile import NamedTemporaryFile
import unittest
from unittest.mock import patch
from urllib.error import HTTPError, URLError

spec = importlib.util.spec_from_file_location(
    "django_release", Path(__file__).resolve().parents[1] / "check-django-release.py"
)
release = importlib.util.module_from_spec(spec)
spec.loader.exec_module(release)


class DjangoReleaseTests(unittest.TestCase):
    def test_new_version_publishes(self):
        with patch.object(release, "urlopen", side_effect=HTTPError("url", 404, "Not found", {}, None)):
            self.assertTrue(release.needs_publish("solex-usx-django", "0.2.0"))

    def test_complete_release_skips_but_partial_upload_retries(self):
        for kinds, expected in [([], True), (["sdist"], True), (["bdist_wheel"], True),
                                (["sdist", "bdist_wheel"], False)]:
            with self.subTest(kinds=kinds):
                response = io.BytesIO(json.dumps({"urls": [{"packagetype": kind} for kind in kinds]}).encode())
                with patch.object(release, "urlopen", return_value=response) as request:
                    self.assertEqual(release.needs_publish("solex-usx-django", "0.2.0"), expected)
                    request.assert_called_once_with("https://pypi.org/pypi/solex-usx-django/0.2.0/json", timeout=30)

    def test_registry_errors_are_not_mistaken_for_missing_releases(self):
        for error in [HTTPError("url", 403, "Forbidden", {}, None),
                      HTTPError("url", 500, "Unavailable", {}, None), URLError("Offline")]:
            with self.subTest(error=error), patch.object(release, "urlopen", side_effect=error):
                with self.assertRaises(type(error)):
                    release.needs_publish("solex-usx-django", "0.2.0")

    def test_github_output_for_both_release_decisions(self):
        for publish in [True, False]:
            with self.subTest(publish=publish), NamedTemporaryFile() as output:
                with patch.object(release, "needs_publish", return_value=publish), \
                     patch.dict(release.os.environ, {"GITHUB_OUTPUT": output.name}), \
                     patch("builtins.print"):
                    release.main()
                self.assertEqual(output.read().decode(), f"publish={str(publish).lower()}\n")
