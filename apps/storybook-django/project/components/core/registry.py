"""Component registry with improved autodiscovery and readability.

This module exposes a small public surface:

- `register(cls)` decorator: explicit registration (keeps compatibility).
- `get_component(name)` and `get_all_components()` lookup helpers.

Autodiscovery behavior (performed lazily on first lookup):
- Import Python modules under the parent `project.components` package.
- Optionally import Python files found under paths in
  `USX_COMPONENT_PATHS`.
- Discover "template-only" components by scanning template directories
  (from `TEMPLATES['DIRS']`) and any `USX_COMPONENT_PATHS`. If a folder
  contains a `config.json` and a `*.django.html` template, a lightweight
  `Component` instance is registered so templates can be rendered.

The implementation is broken into small helpers for clarity and easier
testing/maintenance.
"""

from __future__ import annotations

import importlib
import importlib.util
import inspect
import logging
import pkgutil
import sys
from pathlib import Path
from types import ModuleType
from typing import Iterable, List, Optional

from .component import Component

logger = logging.getLogger(__name__)

# Public registry: component_name -> component_instance
_registry: dict[str, Component] = {}

# Flag to avoid repeated discovery
_autodiscovered = False


def _get_django_settings():
    try:
        from django.conf import settings
        # Avoid triggering Django's lazy settings setup; only return the
        # settings object if it's already configured by the environment.
        if getattr(settings, 'configured', False):
            return settings
        return None
    except Exception:
        return None


def _import_package_modules(parent_pkg_name: str) -> None:
    """Import all submodules under ``parent_pkg_name`` using pkgutil.

    Import errors in individual modules are logged and ignored so a
    single broken module doesn't prevent discovery of others.
    """
    try:
        parent = importlib.import_module(parent_pkg_name)
    except Exception:
        logger.debug("Parent package %s not importable; skipping package import.", parent_pkg_name)
        return

    if not getattr(parent, "__path__", None):
        logger.debug("Parent package %s has no __path__; skipping walk_packages.", parent_pkg_name)
        return

    for finder, modname, ispkg in pkgutil.walk_packages(parent.__path__, prefix=parent_pkg_name + "."):
        try:
            importlib.import_module(modname)
        except Exception:
            logger.debug("Failed importing module during autodiscovery: %s", modname, exc_info=True)
            continue


def _import_python_files_from_paths(paths: Iterable[str]) -> None:
    """Load Python files found under the given filesystem paths.

    Each discovered file is loaded under a synthetic module name to avoid
    clashing with existing modules. Import errors are logged and ignored.
    """
    for p in paths:
        try:
            base = Path(p)
            if not base.exists():
                logger.debug("USX component path does not exist: %s", p)
                continue
            for py in base.rglob("*.py"):
                if py.name == "__init__.py":
                    continue
                module_name = f"usx_discovered.{py.stem}_{abs(hash(str(py))) % (10**8)}"
                if module_name in sys.modules:
                    continue
                try:
                    spec = importlib.util.spec_from_file_location(module_name, str(py))
                    if spec and spec.loader:
                        mod = importlib.util.module_from_spec(spec)
                        sys.modules[module_name] = mod
                        spec.loader.exec_module(mod)
                except Exception:
                    logger.debug("Failed to import discovered file %s", str(py), exc_info=True)
                    continue
        except Exception:
            logger.debug("Error walking USX component path %s", p, exc_info=True)
            continue


def _discover_template_only_components(template_dirs: Iterable[str], extra_paths: Iterable[str]) -> None:
    """Scan template dirs and configured paths to register template-only components.

    A template-only component is defined as a directory containing a
    `config.json` and at least one `*.django.html` template file. We create
    a lightweight ``Component`` instance so the render pipeline can use it.
    """
    checked_dirs: List[Path] = []
    for d in template_dirs:
        try:
            p = Path(d)
            if p.exists() and p.is_dir():
                checked_dirs.append(p)
        except Exception:
            continue

    for d in extra_paths:
        try:
            p = Path(d)
            if p.exists() and p.is_dir():
                checked_dirs.append(p)
        except Exception:
            continue

    for basep in checked_dirs:
        for child in basep.iterdir():
            if not child.is_dir():
                continue
            cfg = child / "config.json"
            if not cfg.exists():
                continue
            tpl_file = None

            # Prefer the canonical template naming convention:
            #   <component-name>.django.html
            preferred_name = f"{child.name}.django.html"
            preferred_path = child / preferred_name
            if preferred_path.exists() and preferred_path.is_file():
                tpl_file = preferred_name
            else:
                for f in child.iterdir():
                    if f.suffix == ".html" and "django" in f.name:
                        tpl_file = f.name
                        break
            if not tpl_file:
                continue
            comp_name = child.name
            if comp_name in _registry:
                continue
            try:
                comp = Component()
                comp.name = comp_name
                comp.template = f"{comp_name}/{tpl_file}"
                comp.props_file = f"{comp_name}/config.json"
                _registry[comp.name] = comp
                logger.debug("Registered template-only component: %s", comp.name)
            except Exception:
                logger.debug("Failed creating lightweight component for %s", comp_name, exc_info=True)
                continue


def _find_repo_component_default_paths() -> List[str]:
    """Attempt to locate repository-level component folders to include by default.

    This searches ancestors of this file for a sentinel file (pnpm-workspace.yaml)
    and then yields the conventional `packages/usx-react/src/components` path if it exists.
    """
    here = Path(__file__).resolve()
    for parent in here.parents:
        if (parent / "pnpm-workspace.yaml").exists() or (parent / "package.json").exists():
            candidate = parent / "packages" / "usx-react" / "src" / "components"
            if candidate.exists() and candidate.is_dir():
                return [str(candidate)]
            # fallback: packages/usx-react/components
            candidate2 = parent / "packages" / "usx-react" / "components"
            if candidate2.exists() and candidate2.is_dir():
                return [str(candidate2)]
            break
    return []


def _register_component_classes_from_loaded_modules(parent_pkg_name: str, extra_paths: Iterable[str] | None = None) -> None:
    """Scan currently-loaded modules for Component subclasses and register them.

    Only modules whose package begins with ``parent_pkg_name`` are considered.
    """
    extra_paths = [str(p) for p in (extra_paths or [])]
    for mod in list(sys.modules.values()):
        if not mod:
            continue

        consider = False
        pkg = getattr(mod, "__package__", None)
        if pkg and pkg.startswith(parent_pkg_name):
            consider = True

        mod_file = getattr(mod, "__file__", None)
        if not consider and mod_file and extra_paths:
            try:
                mod_path = Path(mod_file).resolve()
                for p in extra_paths:
                    try:
                        if mod_path.is_relative_to(Path(p).resolve()):
                            consider = True
                            break
                    except Exception:
                        # fallback for older Python versions or odd paths
                        if str(mod_path).startswith(str(Path(p).resolve())):
                            consider = True
                            break
            except Exception:
                pass

        if not consider:
            continue

        for obj in vars(mod).values():
            if inspect.isclass(obj) and issubclass(obj, Component) and obj is not Component:
                try:
                    inst = obj()
                    name = getattr(inst, "name", None)
                    if name:
                        _registry[name] = inst
                        logger.debug("Registered component (class): %s", name)
                except Exception:
                    logger.debug("Failed instantiating component class %s", obj, exc_info=True)
                    continue


def _autodiscover_components() -> None:
    global _autodiscovered
    if _autodiscovered:
        return

    # Determine parent package (e.g. project.components.core -> project.components)
    pkg_parts = (__package__ or "").split(".")
    if len(pkg_parts) <= 1:
        _autodiscovered = True
        return
    parent_pkg_name = ".".join(pkg_parts[:-1])

    # 1) Import package submodules
    _import_package_modules(parent_pkg_name)

    # 2) Optionally import explicit module names and python files from settings
    django_settings = _get_django_settings()

    # Start with repository-default component paths so the monorepo's
    # conventional locations are included even when Django settings are
    # not configured.
    repo_default_paths = _find_repo_component_default_paths()

    extra_paths: List[str] = []
    if django_settings is not None:
        extra_paths = [str(p) for p in (getattr(django_settings, "USX_COMPONENT_PATHS", []) or [])]

    # merge repo defaults with configured extra paths (config takes precedence)
    merged_extra_paths = list(dict.fromkeys((extra_paths or []) + repo_default_paths))

    # Import python files from merged paths
    if merged_extra_paths:
        _import_python_files_from_paths(merged_extra_paths)

    # 3) Discover template-only components in template dirs and merged extra paths
    tpl_dirs: List[str] = []
    if django_settings is not None:
        tpl_settings = getattr(django_settings, "TEMPLATES", []) or []
        for engine in tpl_settings:
            tpl_dirs.extend([str(d) for d in engine.get("DIRS", []) or []])

    _discover_template_only_components(tpl_dirs, merged_extra_paths)

    # 4) Register concrete Component subclasses found in loaded modules
    _register_component_classes_from_loaded_modules(parent_pkg_name, merged_extra_paths)

    _autodiscovered = True


def get_component(name: str) -> Component:
    _autodiscover_components()
    if name not in _registry:
        raise KeyError(f"Component '{name}' is not registered.")
    return _registry[name]


def get_all_components() -> dict[str, Component]:
    _autodiscover_components()
    return _registry.copy()
