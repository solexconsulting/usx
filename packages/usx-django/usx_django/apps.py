from django.apps import AppConfig

from .core.multiline import enable_multiline_tags


class USXConfig(AppConfig):
    name = "usx_django"
    verbose_name = "USX Components"

    def ready(self):
        enable_multiline_tags()
