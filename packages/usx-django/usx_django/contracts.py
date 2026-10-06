import json
from importlib.resources import files


def get_contracts():
    """Return the CMS contract manifest, including unresolved component references."""
    return json.loads(files("usx_django").joinpath("component-contracts.json").read_text(encoding="utf-8"))