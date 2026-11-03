from django.urls import path
from project.storybook.views import (
    TestView,
    ComponentsView,
    RenderComponentView,
    TemplateWorkbenchView,
)

urlpatterns = [
    path('test/', TestView.as_view(), name='test'),
    path('components/', ComponentsView.as_view(), name='components'),
    path('render/<str:component_name>/', RenderComponentView.as_view(), name='render_component'),
    path('workbench/', TemplateWorkbenchView.as_view(), name='template_workbench'),
]
