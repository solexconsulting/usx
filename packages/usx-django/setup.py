from pathlib import Path

from setuptools import setup


package = Path(__file__).parent / "usx_django"
for required in (
    "core/render.py",
    "templatetags/__init__.py",
    "templatetags/components.py",
    "component-contracts.json",
):
    if not (package / required).is_file():
        raise RuntimeError("Missing generated Django package files. Run pnpm generate:django from the repository root first.")
if not any((package / "templates").rglob("*.django.html")):
    raise RuntimeError("Missing generated Django templates. Run pnpm generate:django from the repository root first.")

setup()
