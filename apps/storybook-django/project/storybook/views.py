from django.shortcuts import render, HttpResponse
from django.views import View
import json
from django.http import JsonResponse, HttpResponse
from django.template.loader import render_to_string
from project.components.core.registry import get_all_components
from project.components.core.render import render_component

import project.components


CLICKABLE_STORIES = {
    'single', 'multiple', 'color', 'read-johns', 'quote', 'quote-manual',
    'all-classes', 'within-link', 'outside-link', 'button',
}


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
            if component_name == 'clickable' and isinstance(props, dict) and '__storybookExample' in props:
                example = props.pop('__storybookExample')
                if not isinstance(example, str) or example not in CLICKABLE_STORIES:
                    raise ValueError(f'Unknown Clickable story: {example}')
                html = render_to_string(
                    f'clickable/story-{example}.html',
                    {**props, 'numbers': [1, 2, 3]},
                )
            else:
                html = render_component(component_name, props)
            return HttpResponse(html)
        except (KeyError, ValueError) as e:
            print(f"Error rendering component '{component_name}': {e}")
            return HttpResponse(str(e), status=400)
