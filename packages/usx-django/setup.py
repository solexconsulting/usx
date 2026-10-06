from pathlib import Path

from setuptools import setup


package = Path(__file__).parent / "usx_django"
for required in (
    "core/render.py",
    "templatetags/__init__.py",
    "templatetags/components.py",
    "component-contracts.json",
    "templates/label/label.django.html",
    "templates/table/table_helper.py",
):
    if not (package / required).is_file():
        raise RuntimeError("Missing generated Django package files. Run pnpm generate:django from the repository root first.")

setup()