import json

from django.template import Context, Template
from django.test import SimpleTestCase
from project.storybook.story_tree import render_story_tree


class TemplateWorkbenchTests(SimpleTestCase):
    def test_component_list_includes_shared_story_default(self):
        components = {item['name']: item for item in self.client.get('/components/').json()}
        self.assertEqual(components['avatar']['default']['alt'], 'Statue of Liberty')
        self.assertIn('src', components['avatar']['default'])

    def post(self, template, props=None):
        return self.client.post('/workbench/',
                                data=json.dumps({'template': template, 'props': props or {}}),
                                content_type='application/json')

    def test_nested_components_and_prop_bindings(self):
        response = self.post(
            '{% alert variant=kind heading=heading %}'
            '{% button label=action %}{% endbutton %}'
            '{% endalert %}',
            {'kind': 'info', 'heading': 'Ready', 'action': 'Continue'},
        )
        self.assertEqual(response.status_code, 200)
        result = response.json()
        self.assertIn('Ready', result['html'])
        self.assertIn('Continue', result['html'])
        self.assertEqual([(binding['name'], binding.get('component'), binding.get('prop'))
                          for binding in result['bindings']], [
            ('kind', 'alert', 'variant'),
            ('heading', 'alert', 'heading'),
            ('action', 'button', 'label'),
        ])
        self.assertEqual(result['bindings'][0]['options'][0], 'info')

    def test_component_props_object_exposes_its_contract(self):
        result = self.post('{% button props=buttonProps %}{% endbutton %}').json()
        binding = result['bindings'][0]
        self.assertEqual(binding['name'], 'buttonProps')
        self.assertIn('variant', binding['fields'])
        self.assertEqual(result['props']['buttonProps'], {})

    def test_multiline_component_tags_work_in_templates_and_workbench(self):
        source = '{% avatar\n  href=href\n  src=src\n  alt=alt\n%}{% endavatar %}'
        props = {'href': '/profile', 'src': '/person.png', 'alt': 'Person'}
        self.assertIn('alt="Person"', Template('{% load usx_components %}' + source).render(Context(props)))
        response = self.post(source, props)
        self.assertEqual(response.status_code, 200)
        self.assertIn('alt="Person"', response.json()['html'])
        self.assertEqual([item['name'] for item in response.json()['bindings']], ['href', 'src', 'alt'])

    def test_multiline_comment_documents_props_but_context_supplies_them(self):
        source = ('{% comment %}\nitems = [\n  {"title": "Documented item"}\n]\n'
                  '{% include "ignored.html" %}\n{% endcomment %}\n'
                  '{% accordion items=items %}{% endaccordion %}')
        response = self.post(source, {'items': [{'id': 'example', 'title': 'Context item', 'content': 'Details'}]})
        self.assertEqual(response.status_code, 200)
        self.assertIn('Context item', response.json()['html'])
        self.assertNotIn('Documented item', response.json()['html'])
        self.assertEqual([item['name'] for item in response.json()['bindings']], ['items'])

    def test_boolean_literals_do_not_create_form_bindings_or_override_switches(self):
        response = self.post('{% avatar_group overlap=True stacked=False %}{% endavatar_group %}')
        self.assertEqual(response.status_code, 200)
        self.assertIn('usx-avatar-group--overlap', response.json()['html'])
        self.assertNotIn('usx-avatar-group--stacked', response.json()['html'])
        self.assertEqual(response.json()['bindings'], [])

    def test_story_source_uses_multiline_component_props(self):
        html, source = render_story_tree({
            '__usxNode': 'component', 'name': 'avatar',
            'props': {'href': '/profile', 'src': '/person.png', 'alt': 'Person'},
        })
        self.assertTrue(source.startswith('{% load usx_components %}'))
        self.assertIn('{% avatar\n  href="/profile"\n  src="/person.png"\n  alt="Person"\n%}', source)
        self.assertIn('alt="Person"', html)

    def test_unsafe_template_tags_and_large_input_are_rejected(self):
        for source in ('{% include "secrets.txt" %}', '{% load static %}',
                       '{% for item in items %}{{ item }}{% endfor %}'):
            with self.subTest(source=source):
                self.assertEqual(self.post(source).status_code, 400)
        self.assertEqual(self.post('x' * 12001).status_code, 400)
        self.assertEqual(self.post('{{ value }}', {'__class__': 'x'}).status_code, 400)
        self.assertEqual(self.post('{{ value|center:100000000 }}', {'value': 'x'}).status_code, 400)

    def test_workbench_accepts_usx_load_names(self):
        for library in ('usx_components', 'components'):
            with self.subTest(library=library):
                response = self.post(f'{{% load {library} %}}{{% label %}}Example{{% endlabel %}}')
                self.assertEqual(response.status_code, 200)
                self.assertIn('Example', response.json()['html'])

    def test_template_values_are_escaped(self):
        response = self.post('{% button %}{{ label }}{% endbutton %}',
                             {'label': '<script>alert(1)</script>'})
        self.assertEqual(response.status_code, 200)
        self.assertIn('&lt;script&gt;', response.json()['html'])

    def test_if_and_with_bindings_only_show_external_props(self):
        response = self.post('{% with alias=name %}{% if show %}{{ alias }}{% endif %}{% endwith %}',
                             {'name': 'Ada', 'show': True})
        self.assertEqual(response.status_code, 200)
        self.assertEqual([binding['name'] for binding in response.json()['bindings']], ['name', 'show'])
        self.assertIn('Ada', response.json()['html'])
