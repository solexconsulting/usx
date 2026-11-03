from django.apps import AppConfig

from .core.multiline import enable_multiline_tags


class ComponentsConfig(AppConfig):
    name = 'project.components'

    def ready(self):
        enable_multiline_tags()
