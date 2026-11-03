import json
from django.http import JsonResponse, HttpResponse
from django.template.exceptions import TemplateSyntaxError
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from project.components.core.registry import get_all_components
from project.components.core.render import render_component
from project.storybook.story_tree import render_story_tree
from project.storybook.workbench import render_workbench

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
            component.load_props()
            data.append({
                'name': name,
                'props': component.props,
                'default': component.example_default,
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
            tree = props.pop('__usxStoryTree', None) if isinstance(props, dict) else None
            if tree is None and request.GET.get('format') == 'story':
                tree = {'__usxNode': 'component', 'name': component_name, 'props': props}
            if tree is not None:
                html, source = render_story_tree(tree)
                if request.GET.get('format') == 'story':
                    return JsonResponse({'html': html, 'source': source})
                return HttpResponse(html)
            return HttpResponse(render_component(component_name, props))
        except (KeyError, ValueError) as e:
            print(f"Error rendering component '{component_name}': {e}")
            return HttpResponse(str(e), status=400)


# This endpoint only renders bounded input; it does not change server state.
@method_decorator(csrf_exempt, name='dispatch')
class TemplateWorkbenchView(View):
    def post(self, request):
        if request.content_type != 'application/json':
            return JsonResponse({'error': 'Expected JSON.'}, status=415)
        try:
            if int(request.META.get('CONTENT_LENGTH') or 0) > 40000 or len(request.body) > 40000:
                return JsonResponse({'error': 'Request is too large.'}, status=413)

            def reject_constant(_value):
                raise ValueError('Invalid JSON number.')

            payload = json.loads(request.body, parse_constant=reject_constant)
            if not isinstance(payload, dict):
                raise ValueError('Expected a JSON object.')
            result = render_workbench(payload.get('template'), payload.get('props', {}))
        except (ValueError, TypeError, KeyError, TemplateSyntaxError) as error:
            return JsonResponse({'error': str(error)}, status=400)
        response = JsonResponse(result)
        response['Cache-Control'] = 'no-store'
        return response
