from django.shortcuts import render, HttpResponse
from django.views import View
import json
from django.http import JsonResponse, HttpResponse
from project.components.core.registry import get_all_components
from project.components.core.render import render_component

import project.components


class TestView(View):
    def get(self, request):
        return HttpResponse("Hello, Storybook!")


class ComponentsView(View):
    """
    Endpoint to get metadata for all registered components.

    Returns a JSON list of component metadata, including name and props definitions.
    """
    def get(self, request):
        components = get_all_components()
        data = []
        for name, component in components.items():
            data.append({
                'name': name,
                'props': component.props
            })
        return JsonResponse(data, safe=False)


class RenderComponentView(View):
    """
    Endpoint to render a specific component.

    Accepts a 'props' query parameter as JSON string, parses it, and renders the component.
    """
    def get(self, request, component_name):
        props_json = request.GET.get('props', '{}')
        try:
            props = json.loads(props_json)
        except json.JSONDecodeError:
            return HttpResponse('Invalid JSON in props parameter', status=400)

        try:
            print("PROPS", props)
            html = render_component(component_name, props)
            return HttpResponse(html)
        except (KeyError, ValueError) as e:
            return HttpResponse(str(e), status=400)
