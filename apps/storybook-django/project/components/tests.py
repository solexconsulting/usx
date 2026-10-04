from html.parser import HTMLParser
from xml.etree.ElementTree import fromstring

from django.template import Context, Template
from django.test import SimpleTestCase, override_settings

from .core.render import render_component
from .templatetags.components import asset_url, asset_srcset


class RenderedElements(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.elements = []
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        self.elements.append((tag, dict(attrs)))

    def attributes(self, tag):
        return next(attrs for name, attrs in self.elements if name == tag)


class AssetUrlTests(SimpleTestCase):
    @override_settings(STATIC_URL='/global/')
    def test_image_and_branding_asset_resolution(self):
        self.assertEqual(asset_srcset('  small.png 1x, large.png 2x ', '/assets/'), '  /assets/small.png 1x, /assets/large.png 2x ')
        self.assertEqual(asset_srcset('data:image/png;base64,AAAA 1x, large.png 2x', '/assets/'), 'data:image/png;base64,AAAA 1x, /assets/large.png 2x')
        self.assertEqual(asset_srcset('small.png, large.png', '/assets/'), '/assets/small.png, /assets/large.png')
        logo = {'fallback': '/logo.svg', 'sources': [{'srcSet': 'small.svg 1x, large.svg 2x', 'media': '(min-width: 40em)', 'sizes': '50vw'}]}
        for override, base in [(None, '/global/'), ('', '/global/'), ('/', '/'), ('/override/', '/override/')]:
            with self.subTest(override=override):
                for caption in ('', 'Logo'):
                    html = render_component('image', {'src': logo, 'staticBaseUrl': override, 'caption': caption})
                    self.assertIn(f'src="{base}logo.svg"', html)
                    self.assertIn(f'srcset="{base}small.svg 1x, {base}large.svg 2x"', html)
                    self.assertIn('sizes="50vw"', html)
                html = render_component('image', {'src': 'logo.svg', 'srcSet': 'small.svg 1x, large.svg 2x', 'staticBaseUrl': override, 'href': '/destination'})
                self.assertIn('href="/destination"', html)
                self.assertIn(f'srcset="{base}small.svg 1x, {base}large.svg 2x"', html)
                for src in ('https://example.com/logo.svg', 'data:image/png;base64,AAAA'):
                    self.assertIn(f'src="{src}"', render_component('image', {'src': src, 'staticBaseUrl': override}))
                for component in ('header', 'footer'):
                    for branding in ({'logo': logo, 'logoInverse': 'inverse.svg'}, {'symbol': 'symbol.svg', 'symbolInverse': 'inverse.svg'}):
                        html = render_component(component, {'branding': branding, 'staticBaseUrl': override})
                        filename = 'logo.svg' if 'logo' in branding else 'symbol.svg'
                        self.assertIn(f'src="{base}{filename}"', html)
                        self.assertIn(f'src="{base}inverse.svg"', html)
                        self.assertNotIn('staticBaseUrl=', html)
                for variant in ('big', 'medium'):
                    html = render_component('footer', {'variant': variant, 'staticBaseUrl': override, 'socialLinks': [{'icon': 'social.svg', 'href': '/social', 'alt': 'Social'}]})
                    self.assertIn(f'src="{base}social.svg"', html)
                    self.assertIn('href="/social"', html)

    @override_settings(STATIC_URL='/global/')
    def test_component_asset_bases(self):
        fixtures = [
            ('banner', {}, ['img/us_flag_small.png', 'img/icon-dot-gov.svg', 'img/icon-https.svg', 'img/sprite.svg#lock']),
            ('icon', {'name': 'check'}, ['img/sprite.svg#check']),
            ('icon', {'name': 'spinner', 'source': 'usx'}, ['img/usx-sprite.svg#spinner']),
            ('spinner', {}, ['img/usx-sprite.svg#spinner']),
            ('alert', {'onDismiss': 'dismiss()'}, ['img/sprite.svg#close']),
            ('code', {'copyText': 'test'}, ['img/sprite.svg#content_copy', 'img/sprite.svg#check']),
            ('copy-to-clipboard', {'copyText': 'test'}, ['img/sprite.svg#content_copy', 'img/sprite.svg#check']),
        ]
        for component, props, paths in fixtures:
            for base, prefix in [(None, '/global/'), ('', '/global/'), ('/', '/'), ('/override///', '/override/')]:
                with self.subTest(component=component, base=base):
                    supplied = props if base is None else {**props, 'staticBaseUrl': base}
                    html = render_component(component, supplied)
                    for path in paths:
                        self.assertIn(f'="{prefix}{path}"', html)

    @override_settings(STATIC_URL='/global/')
    def test_custom_paths_and_legacy_sprite_override(self):
        self.assertEqual(asset_url('/img/sprite.svg#check', '/override///'), '/override/img/sprite.svg#check')
        self.assertEqual(asset_url('///img/sprite.svg#check', '/override///'), '/override/img/sprite.svg#check')
        self.assertEqual(asset_url('//img/sprite.svg#check'), '/global/img/sprite.svg#check')
        self.assertEqual(asset_url('/img/sprite.svg#check'), '/global/img/sprite.svg#check')
        self.assertEqual(asset_url('https://example.com/flag.png', '/override'), 'https://example.com/flag.png')
        html = render_component('banner', {'flagSrc': '/flags/agency.png', 'staticBaseUrl': '/override'})
        self.assertIn('src="/override/flags/agency.png"', html)
        html = render_component('icon', {'name': 'check', 'staticUrlPrefix': '#local-', 'staticBaseUrl': '/override'})
        self.assertIn('href="#local-check"', html)

    @override_settings(STATIC_URL='/', MEDIA_URL='/media/')
    def test_default_root(self):
        self.assertEqual(asset_url('/img/sprite.svg#check'), '/img/sprite.svg#check')


class ReactParityTests(SimpleTestCase):
    def test_spinner_renders_shared_svg_icon(self):
        for props, size_class in [({}, 'usa-icon--size-3'), ({'size': 1}, 'usx-icon--size-1'), ({'size': 6}, 'usa-icon--size-6')]:
            with self.subTest(props=props):
                html = render_component('spinner', {
                    'staticBaseUrl': '/assets/', 'color': 'primary',
                    'label': 'Loading', 'screenReaderLabel': 'Please wait',
                    **props,
                })
                root = fromstring(html)
                self.assertEqual(root.attrib['role'], 'status')
                svg = root.find('svg')
                self.assertIsNotNone(svg)
                self.assertTrue({'usa-icon', size_class, 'text-primary'}.issubset(svg.attrib['class'].split()))
                self.assertEqual(svg.attrib['aria-hidden'], 'true')
                self.assertEqual(svg.find('use').attrib['href'], '/assets/img/usx-sprite.svg#spinner')
                self.assertIsNone(root.find('use'))
                self.assertIn('Loading', html)
                self.assertIn('Please wait', html)

    def test_copy_to_clipboard_composed_button(self):
        for extra_props in ({}, {'className': 'custom-copy', 'tooltipProps': {'label': 'Copy text', 'copiedTooltip': 'Done', 'position': 'left', 'className': 'custom-tooltip', 'bodyClassName': 'custom-body'}}):
            with self.subTest(props=extra_props):
                html = render_component('copy-to-clipboard', {
                    'copyText': 'Agency\'s "copy"\n<tag>',
                    'label': 'Copy',
                    'staticBaseUrl': '/assets/',
                    **extra_props,
                })
                elements = RenderedElements(html)
                button = elements.attributes('button')
                self.assertTrue({'usa-button', 'usx-button', 'usx-button--ghost', 'usx-copy'}.issubset(button['class'].split()))
                self.assertEqual('custom-copy' in button['class'].split(), bool(extra_props))
                self.assertEqual(button['type'], 'button')
                self.assertEqual(button['onclick'], r"navigator.clipboard.writeText('Agency\u0027s \u0022copy\u0022\u000A\u003Ctag\u003E')")
                self.assertEqual([attrs['href'] for tag, attrs in elements.elements if tag == 'use'], [
                    '/assets/img/sprite.svg#content_copy', '/assets/img/sprite.svg#check',
                ])
                self.assertInHTML('<span class="margin-left-1">Copy</span>', html)
                self.assertEqual(sum(attrs.get('role') == 'tooltip' for _, attrs in elements.elements), 1 if extra_props else 0)
                if extra_props:
                    self.assertInHTML('<span class="usx-copy__tooltip--copy">Copy text</span>', html)
                    self.assertInHTML('<span class="usx-copy__tooltip--copied">Done</span>', html)
                    self.assertIn('usx-tooltip custom-tooltip', html)
                    self.assertIn('usa-tooltip__body--left custom-body', html)
                self.assertNotIn('{%', html)
                self.assertNotIn('{{', html)

        copied_only = render_component('copy-to-clipboard', {'copyText': 'Example', 'tooltipProps': {'bodyClassName': 'custom-body'}})
        self.assertIn('usa-tooltip__body--top custom-body', copied_only)
        self.assertInHTML('<span class="usx-copy__tooltip--copied">Copied</span>', copied_only)
        empty_copied = render_component('copy-to-clipboard', {'copyText': 'Example', 'tooltipProps': {'label': 'Copy', 'copiedTooltip': ''}})
        self.assertInHTML('<span class="usx-copy__tooltip--copied"></span>', empty_copied)

    def test_clipboard_tooltip_fragment_and_prop_forwarding(self):
        tooltip_props = {'position': 'bottom', 'className': 'custom-wrapper', 'bodyClassName': 'custom-body', 'label': 'Replaced', 'children': 'Replaced'}
        html = Template('''{% load components %}
            {% fragment as richLabel %}<strong>{{ text }}</strong>{% endfragment %}
            {% tooltip props=tooltipProps label=richLabel %}<button>Trigger</button>{% endtooltip %}
        ''').render(Context({'tooltipProps': tooltip_props, 'text': '<Copy>'}))
        self.assertIn('usx-tooltip custom-wrapper', html)
        self.assertIn('usa-tooltip__body--bottom custom-body', html)
        self.assertInHTML('<strong>&lt;Copy&gt;</strong>', html)
        self.assertInHTML('<button>Trigger</button>', html)
        self.assertNotIn('Replaced', html)
        self.assertEqual(tooltip_props['label'], 'Replaced')

        rich_label = Template('{% load components %}{% fragment as label %}<strong>{{ text }}</strong>{% endfragment %}{{ label }}').render(Context({'text': '<Copy>'}))
        html = render_component('copy-to-clipboard', {'copyText': 'Example', 'tooltipProps': {**tooltip_props, 'label': rich_label}})
        self.assertInHTML('<span class="usx-copy__tooltip--copy"><strong>&lt;Copy&gt;</strong></span>', html)
        self.assertIn('usa-tooltip__body--bottom custom-body', html)
        self.assertNotIn('Replaced', html)

    def test_clipboard_tooltip_has_no_template_whitespace(self):
        for label in ('Copy', 'First line\nSecond line'):
            with self.subTest(label=label):
                root = fromstring(render_component('copy-to-clipboard', {
                    'copyText': 'Example',
                    'tooltipProps': {'label': label, 'copiedTooltip': 'Copied'},
                }))
                tooltip = next(element for element in root.iter('span') if element.get('role') == 'tooltip')
                self.assertIsNone(tooltip.text)
                self.assertEqual([child.get('class') for child in tooltip], [
                    'usx-copy__tooltip--copy', 'usx-copy__tooltip--copied',
                ])
                self.assertEqual([child.text for child in tooltip], [label, 'Copied'])
                self.assertTrue(all(child.tail is None for child in tooltip))

    def test_code_uses_copy_to_clipboard(self):
        html = render_component('code', {
            'lines': [{'code': 'example'}],
            'copyText': "Agency's example",
            'staticBaseUrl': '/assets/',
        })
        elements = RenderedElements(html)
        button = elements.attributes('button')
        self.assertIn('usx-copy', button['class'].split())
        self.assertIn('usa-tooltip__body--left', html)
        self.assertInHTML('<span class="usx-copy__tooltip--copy">Copy</span>', html)
        self.assertInHTML('<span class="usx-copy__tooltip--copied">Copied</span>', html)
        self.assertEqual(button['onclick'], r"navigator.clipboard.writeText('Agency\u0027s example')")
        self.assertEqual([attrs['href'] for tag, attrs in elements.elements if tag == 'use'], [
            '/assets/img/sprite.svg#content_copy', '/assets/img/sprite.svg#check',
        ])
        self.assertNotIn('{%', html)
        without_copy = RenderedElements(render_component('code', {'lines': []}))
        self.assertFalse(any(tag == 'button' for tag, _ in without_copy.elements))

    def test_code_literal_markup_and_trusted_html(self):
        source = '  <Page title="Account & settings">&lt;Section&gt;</Page>'
        for props in ({}, {'allowHtml': False}):
            with self.subTest(props=props):
                html = render_component('code', {'lines': [{'code': source, 'prefix': '1'}], **props})
                self.assertIn('<code>  &lt;Page title=&quot;Account &amp; settings&quot;&gt;&amp;lt;Section&amp;gt;&lt;/Page&gt;</code>', html)
                self.assertFalse(any(tag in ('page', 'section') for tag, _ in RenderedElements(html).elements))
        html = render_component('code', {
            'lines': [{'code': 'This <em>line</em> has <strong>HTML fragments</strong>'}],
            'allowHtml': True,
        })
        self.assertInHTML('<code>This <em>line</em> has <strong>HTML fragments</strong></code>', html)

    def test_layout_sidebar_combinations(self):
        for left, right in (('', ''), ('Left', ''), ('', 'Right'), ('Left', 'Right')):
            for expanded in (False, True):
                with self.subTest(left=left, right=right, expanded=expanded):
                    html = render_component('layout', {
                        'variant': 'grid', 'content': 'Main content',
                        'leftSidebar': left, 'rightSidebar': right,
                        'expandLeftSidebar': expanded, 'expandRightSidebar': expanded,
                        'expandable': True,
                    })
                    elements = RenderedElements(html)
                    sidebars = [attrs for tag, attrs in elements.elements if tag == 'aside']
                    self.assertEqual(len(sidebars), bool(left) + bool(right))
                    for sidebar in sidebars:
                        self.assertEqual('usx-layout__sidebar--expanded' in sidebar['class'].split(), expanded)
                    button = elements.attributes('button')
                    self.assertEqual(button['aria-expanded'], 'false')
                    self.assertEqual(button['aria-label'], 'Expand')
                    self.assertIn('usx-layout__content', elements.attributes('main')['class'])

    def test_footer_responsive_branding(self):
        for variant in ('big', 'medium', 'slim'):
            for branding_url in ('/', ''):
                with self.subTest(variant=variant, branding_url=branding_url):
                    html = render_component('footer', {
                        'variant': variant,
                        'brandingUrl': branding_url,
                        'branding': {
                            'title': 'Agency Name',
                            'logo': {
                                'fallback': '/symbol.svg',
                                'sources': [{'media': '(min-width: 40em)', 'srcSet': '/linear.svg'}],
                            },
                            'logoInverse': {
                                'fallback': '/white-symbol.png',
                                'sources': [{'media': '(min-width: 40em)', 'srcSet': '/white-linear.png'}],
                            },
                        },
                    })
                    elements = RenderedElements(html)
                    sources = [attrs for name, attrs in elements.elements if name == 'source']
                    self.assertEqual([source['srcset'] for source in sources], ['/linear.svg', '/white-linear.png'])
                    self.assertTrue(all(source['media'] == '(min-width: 40em)' for source in sources))
                    images = [attrs for name, attrs in elements.elements if name == 'img']
                    self.assertEqual([image['src'] for image in images], ['/symbol.svg', '/white-symbol.png'])
                    self.assertTrue(all(image['alt'] == 'Agency Name' for image in images))
                    self.assertIn('usx-logo__variant--inverse', html)
                    self.assertIn('class="usx-image usx-logo__image"', html)

    def test_card_root_and_children(self):
        html = render_component('card', {
            'tag': 'li', 'className': 'grid-col-6', 'headerFirst': True,
            'flag': True, 'mediaRight': True, 'title': 'Ignored title',
            'children': 'Custom content',
        })
        elements = RenderedElements(html)
        self.assertEqual(elements.attributes('li')['class'].split(), [
            'usa-card', 'usx-card', 'usa-card--header-first', 'usa-card--flag',
            'usa-card--media-right', 'grid-col-6',
        ])
        self.assertInHTML('<div class="usa-card__container">Custom content</div>', html)
        self.assertNotIn('Ignored title', html)
        self.assertInHTML('<div class="usa-card__container">Card</div>', render_component('card', {}))

    def test_card_single_image(self):
        html = render_component('card', {
            'title': 'Card title', 'description': 'Description',
            'tags': [{'value': 'Primary', 'color': 'primary'}],
            'images': [{
                'src': '/image.jpg', 'alt': 'Image', 'caption': 'Image caption',
                'objectFit': 'contain', 'maxWidth': '200px',
            }],
            'mediaInset': True, 'mediaExdent': True,
        })
        elements = RenderedElements(html)
        self.assertIn('usa-card__img', elements.attributes('figure')['class'].split())
        self.assertIn('usx-object-fit-contain', elements.attributes('figure')['class'].split())
        self.assertIn('max-width: 200px', elements.attributes('figure')['style'])
        self.assertInHTML('<figcaption class="usx-image--caption usa-sr-only" aria-hidden="true">Image caption</figcaption>', html)
        self.assertIn('usa-card__media usa-card__media--inset usa-card__media--exdent', html)
        self.assertIn('usx-tag-group', html)
        self.assertInHTML('<h4 class="usa-card__heading">Card title</h4>', html)
        self.assertInHTML('<p>Description</p>', html)

    def test_card_carousel_dots(self):
        for show_dots in (None, False, True):
            with self.subTest(show_dots=show_dots):
                props = {'id': 'gallery', 'images': [
                    {'src': '/first.jpg', 'alt': 'First', 'objectFit': 'contain', 'rounded': True, 'maxHeight': '100px'},
                    {'src': '/second.jpg', 'alt': 'Second', 'caption': 'Caption'},
                ]}
                if show_dots is not None:
                    props['showCarouselDots'] = show_dots
                html = render_component('card', props)
                self.assertEqual(RenderedElements(html).attributes('div')['id'], 'gallery')
                self.assertIn('id="gallery-carousel-slide-1"', html)
                if show_dots is not False:
                    self.assertIn('href="#gallery-carousel-slide-1"', html)
                self.assertIn('usx-carousel usx-card__carousel', html)
                elements = RenderedElements(html)
                carousel = next(attrs for _, attrs in elements.elements if 'usx-carousel' in attrs.get('class', '').split())
                viewport = next(attrs for _, attrs in elements.elements if 'usx-carousel__viewport' in attrs.get('class', '').split())
                self.assertEqual(carousel['role'], 'region')
                self.assertEqual(carousel['aria-roledescription'], 'carousel')
                self.assertNotIn('role', viewport)
                self.assertEqual('usx-carousel__dots' in html, show_dots is not False)
                self.assertIn('usx-object-fit-contain', html)
                self.assertIn('usx-image--rounded', html)
                self.assertIn('max-height: 100px', html)
                self.assertInHTML('<figcaption class="usx-image--caption usa-sr-only" aria-hidden="true">Caption</figcaption>', html)

    def test_card_actions(self):
        html = render_component('card', {'actions': [
            {'children': 'Learn more', 'variant': 'primary'},
            {'children': 'View details', 'variant': 'secondary'},
        ]})
        elements = RenderedElements(html)
        self.assertEqual(elements.attributes('ul')['class'].split(), [
            'usa-button-group', 'usx-button-group', 'flex-wrap',
        ])
        buttons = [attrs for name, attrs in elements.elements if name == 'button']
        self.assertEqual(len(buttons), 2)
        self.assertTrue(all(button['type'] == 'button' for button in buttons))
        self.assertIn('usa-button--primary', buttons[0]['class'].split())
        self.assertIn('usa-button--secondary', buttons[1]['class'].split())
        self.assertIn('Learn more', html)
        self.assertIn('View details', html)

    def test_image_caption_visibility(self):
        for hidden in (False, True):
            with self.subTest(hidden=hidden):
                html = render_component('image', {
                    'src': '/image.jpg', 'caption': 'Caption', 'hideCaption': hidden,
                })
                caption = RenderedElements(html).attributes('figcaption')
                self.assertEqual(caption['aria-hidden'], 'true' if hidden else 'false')
                self.assertEqual('usa-sr-only' in caption['class'].split(), hidden)

    def test_accordion_class_targets(self):
        html = render_component('accordion', {
            'id': 'details',
            'items': [{'id': 'first', 'title': 'Title', 'content': 'Content'}],
            'className': 'root-only',
            'headingClassName': 'heading-only',
            'contentClassName': 'content-only',
        })
        elements = RenderedElements(html)
        self.assertIn('root-only', elements.attributes('div')['class'].split())
        self.assertEqual(html.count('root-only'), 1)
        self.assertEqual(elements.attributes('h3')['class'].split(), [
            'usa-accordion__heading', 'heading-only',
        ])
        self.assertIn('usa-accordion__content usa-prose content-only', html)

    def test_button_default_variant(self):
        for href in (None, '/destination'):
            for variant in (None, '', 'secondary'):
                with self.subTest(href=href, variant=variant):
                    props = {'label': 'Continue'}
                    if href:
                        props['href'] = href
                    if variant is not None:
                        props['variant'] = variant
                    elements = RenderedElements(render_component('button', props))
                    classes = elements.attributes('a' if href else 'button')['class'].split()
                    self.assertIn(f'usa-button--{variant or "primary"}', classes)

    def test_button_group_item_classes(self):
        html = render_component('button-group', {
            'buttonProps': [{
                'label': 'Continue',
                'itemClassName': 'item-only',
                'className': 'button-only',
            }],
        })
        elements = RenderedElements(html)
        self.assertEqual(elements.attributes('li')['class'].split(), [
            'usa-button-group__item', 'item-only',
        ])
        self.assertIn('button-only', elements.attributes('button')['class'].split())
        self.assertNotIn('item-only', elements.attributes('button')['class'].split())
        self.assertIn('usa-button--primary', elements.attributes('button')['class'].split())

    def test_checkbox_group_has_no_default_legend(self):
        html = render_component('checkbox-group', {'id': 'choices', 'options': []})
        self.assertNotIn('Select one or more options', html)
        self.assertNotIn('<legend', html)
        html = render_component('checkbox-group', {
            'id': 'choices', 'options': [], 'legend': 'Choose services',
        })
        self.assertIn('Choose services', html)

    def test_required_spacing(self):
        for children in ('Email', ''):
            with self.subTest(children=children):
                html = render_component('required', {'children': children})
                self.assertIn(f'</abbr> {children}', html)

    def test_spinner_defaults(self):
        html = render_component('spinner', {})
        elements = RenderedElements(html)
        wrapper = elements.attributes('span')
        self.assertEqual(wrapper['class'], 'usx-spinner')
        self.assertEqual(wrapper['role'], 'status')
        self.assertEqual(wrapper['aria-live'], 'polite')
        self.assertNotIn('tabindex', wrapper)
        self.assertEqual(elements.attributes('svg')['class'].split(), [
            'usa-icon', 'usa-icon--size-3',
        ])
        self.assertNotIn('Loading...', html)
        self.assertNotIn('usa-sr-only', html)
        self.assertNotIn('usa-label', html)

    def test_spinner_labels_and_sizes(self):
        for size in (1, 2, 3, 4, 5):
            with self.subTest(size=size):
                html = render_component('spinner', {
                    'size': size,
                    'color': 'primary',
                    'label': 'Saving',
                    'screenReaderLabel': 'Saving your changes',
                    'className': 'margin-top-2',
                })
                elements = RenderedElements(html)
                self.assertEqual(elements.attributes('span')['class'], 'usx-spinner margin-top-2')
                classes = elements.attributes('svg')['class'].split()
                self.assertIn('usx-spinner--size-1' if size == 1 else f'usa-icon--size-{size}', classes)
                self.assertIn('text-primary', classes)
                self.assertNotIn('usx-spinner', classes)
                self.assertInHTML('<span class="usa-sr-only">Saving your changes</span>', html)
                self.assertInHTML('<span class="usa-label usx-label">Saving</span>', html)

    def test_spinner_block_tag(self):
        html = Template(
            '{% load components %}'
            '{% spinner label="Saving" screenReaderLabel="Please wait" %}{% endspinner %}'
        ).render(Context())
        self.assertInHTML('<span class="usa-label usx-label">Saving</span>', html)
        self.assertInHTML('<span class="usa-sr-only">Please wait</span>', html)

    def test_loading_button_uses_unlabelled_spinner(self):
        html = render_component('button', {'label': 'Saving', 'loading': True})
        elements = RenderedElements(html)
        self.assertEqual(elements.attributes('span')['class'], 'usx-spinner')
        self.assertIn('usa-icon--size-2', elements.attributes('svg')['class'].split())
        self.assertNotIn('usa-label', html)
        self.assertNotIn('usa-sr-only', html)