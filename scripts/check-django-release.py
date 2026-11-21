"""Check release completeness without uploading anything; registry errors fail the job."""

import json
import os
from pathlib import Path
import tomllib
from urllib.error import HTTPError
from urllib.request import urlopen


def needs_publish(name, version):
    try:
        with urlopen(f"https://pypi.org/pypi/{name}/{version}/json", timeout=30) as response:
            release = json.load(response)
    except HTTPError as error:
        if error.code == 404:
            return True
        raise
    # Retry a partially uploaded release as well as a version that does not exist yet.
    kinds = {file["packagetype"] for file in release["urls"]}
    return not {"bdist_wheel", "sdist"}.issubset(kinds)


def main():
    directory = Path(__file__).resolve().parents[1] / "packages/usx-django"
    project = tomllib.loads((directory / "pyproject.toml").read_text())["project"]
    publish = needs_publish(project["name"], project["version"])
    print(f"{project['name']} {project['version']}: {'publication needed' if publish else 'already published'}")
    with open(os.environ["GITHUB_OUTPUT"], "a") as output:
        output.write(f"publish={str(publish).lower()}\n")


if __name__ == "__main__":
    main()
