"""
Base Component class for the Django component system.

This class serves as the foundation for all components. Components inherit from this class
and define their name, template, and default props. The get_context method allows for
custom context preparation based on props.
"""

import os
import json
from django.conf import settings


class Component:
    """
    Base class for Django components.

    Attributes:
        name (str): The unique name of the component (e.g., 'usx/button').
        template (str): The path to the template file relative to the components directory.
        props (dict): Default props for the component, with types and options for Storybook.
    """
    name = None
    template = None
    props = {}
    # Example: 'button/config.json'
    props_file = None

    def load_props(self):
        """
        Load props from the props_file if specified.
        """

        if not self.props_file:
            raise RuntimeError(f"Component '{self.name or self.__class__.__name__}' must set 'props_file'.")

        # collect template dirs from settings, preserving order
        tpl_settings = getattr(settings, 'TEMPLATES', [])
        dirs = []
        if tpl_settings and isinstance(tpl_settings, (list, tuple)):
            for engine in tpl_settings:
                engine_dirs = engine.get('DIRS', [])
                if engine_dirs:
                    dirs.extend([str(d) for d in engine_dirs])

        # fallback to BASE_DIR
        base_dir = getattr(settings, 'BASE_DIR', None)
        if base_dir:
            dirs.append(str(base_dir))

        # search for the props file in each template dir
        for d in dirs:
            candidate = os.path.join(d, self.props_file)
            try:
                if os.path.isfile(candidate):
                    with open(candidate, 'r', encoding='utf-8') as f:
                        props_config = json.load(f)
                    props = props_config.get('props') or props_config or {}
                    self.props = props
                    return self.props
            except Exception:
                continue

        # not found
        raise FileNotFoundError(f"Props file '{self.props_file}' not found in template dirs: {dirs}")

