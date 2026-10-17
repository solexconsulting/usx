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
            'tagProps': [{'value': 'Primary', 'color': 'primary'}],
            'imageProps': [{
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
                props = {'id': 'gallery', 'imageProps': [
                    {'src': '/first.jpg', 'alt': 'First', 'objectFit': 'contain', 'rounded': True, 'maxHeight': '100px'},
                    {'src': '/second.jpg', 'alt': 'Second', 'caption': 'Caption'},
                ]}
                if show_dots is not None:
                    props['showCarouselDots'] = show_dots
                html = render_component('card', props)
                self.assertEqual(RenderedElements(html).attributes('div')['id'], 'gallery')
                self.assertIn('aria-label="1 of 2"', html)
                self.assertEqual(html.count('class="usx-carousel__slide"'), 2)
                self.assertIn('usx-carousel usx-card__carousel', html)
                elements = RenderedElements(html)
                carousel = next(attrs for _, attrs in elements.elements if 'usx-carousel' in attrs.get('class', '').split())
                viewport = next(attrs for _, attrs in elements.elements if 'usx-carousel__viewport' in attrs.get('class', '').split())
                self.assertEqual(carousel['role'], 'group')
                self.assertEqual(carousel['aria-roledescription'], 'carousel')
                self.assertNotIn('role', viewport)
                self.assertEqual('data-show-dots="false"' in html, show_dots is False)
                self.assertNotIn('usx-carousel__dots', html)
                self.assertNotIn('usx-carousel__button', html)
                self.assertNotIn('usx-carousel__status', html)
                self.assertNotIn('aria-hidden="true" inert', html)
                self.assertIn('usx-object-fit-contain', html)
                self.assertIn('usx-image--rounded', html)
                self.assertIn('max-height: 100px', html)
                self.assertInHTML('<figcaption class="usx-image--caption usa-sr-only">Caption</figcaption>', html)

    def test_carousel_base_markup(self):
        html = render_component('carousel', {'slides': [
            {'content': '<a href="/first">First</a>'},
            {'content': '<a href="/second">Second</a>', 'label': 'Second item'},
        ], 'showDots': False})
        self.assertIn('aria-label="Second item"', html)
        self.assertIn('data-show-dots="false"', html)
        self.assertNotIn('usx-carousel__button', html)
        self.assertNotIn('usx-carousel__dots', html)
        self.assertNotIn('aria-hidden="true" inert', html)
        self.assertIn('data-status-class-name="display-none"', render_component('carousel', {
            'slides': [{'content': 'First'}, {'content': 'Second'}],
            'statusClassName': 'display-none',
        }))
        self.assertNotIn('usx-carousel__button--previous', render_component('carousel', {
            'slides': [{'content': 'Only slide'}],
        }))
        self.assertIn('aria-label="Card images"', render_component('card', {
            'imageProps': [{'src': '/first.jpg'}, {'src': '/second.jpg'}],
        }))

    def test_carousel_children_are_slides(self):
        children = ['<strong>First</strong>', '<em>Second</em>']
        props = {'children': children, 'slides': [{'content': 'Ignored slide'}]}
        for html in (
            render_component('carousel', props),
            Template('{% load components %}{% carousel children=children slides=slides %}{% endcarousel %}')
                .render(Context(props)),
        ):
            self.assertEqual(html.count('class="usx-carousel__slide"'), 2)
            self.assertIn('<strong>First</strong>', html)
            self.assertIn('<em>Second</em>', html)
            self.assertNotIn('Ignored slide', html)
            self.assertNotIn('usx-carousel__status', html)

        single = render_component('carousel', {'children': '<strong>Only</strong>'})
        self.assertEqual(single.count('class="usx-carousel__slide"'), 1)
        self.assertNotIn('usx-carousel__button--next', single)

    def test_card_actions(self):
        html = render_component('card', {'buttonProps': [
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
        html = render_component('checkbox-group', {'id': 'choices', 'checkboxProps': []})
        self.assertNotIn('Select one or more options', html)
        self.assertNotIn('<legend', html)
        html = render_component('checkbox-group', {
            'id': 'choices', 'checkboxProps': [], 'legend': 'Choose services',
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

class QuoteAttributionPropsTests(SimpleTestCase):
    def test_attribution_props_in_all_layouts(self):
        for layout in ({}, {"calloutProps": {"orientation": "vertical"}}):
            with self.subTest(layout=layout):
                props = {
                    "primary": "Author",
                    "secondary": "Role",
                    "className": "custom-credit",
                    "avatarProps": {"variant": "initials", "value": "AB"},
                }
                html = render_component("quote", {**layout, "attributionProps": props})
                for text in ("Author", "Role", "custom-credit", "AB"):
                    self.assertIn(text, html)
                props["children"] = "<strong>Custom credit</strong>"
                html = render_component("quote", {**layout, "attributionProps": props})
                self.assertIn("<strong>Custom credit</strong>", html)
                self.assertNotIn("Author", html)


class ChildComponentPropsTests(SimpleTestCase):
    def test_card_forwards_props_for_single_images_and_carousels(self):
        image = {"src": "photo.jpg", "alt": "Photo", "staticBaseUrl": "/custom/",
                 "className": "custom-image", "caption": "Visible caption", "hideCaption": False}
        for images in ([image], [image, {**image, "src": "other.jpg"}]):
            with self.subTest(count=len(images)):
                html = render_component("card", {
                    "imageProps": images,
                    "tagProps": [{"value": "Status", "outline": True, "className": "custom-tag"}],
                    "buttonProps": [{"href": "/go", "children": "Go", "variant": "secondary",
                                     "ghost": True}],
                })
                for text in ("/custom/photo.jpg", "custom-image", "Visible caption",
                             "custom-tag", "usa-button--secondary", "/go", "usx-button--ghost"):
                    self.assertIn(text, html)
                self.assertNotIn("usa-sr-only", html)

    def test_hero_button_props_and_search_precedence(self):
        props = {"buttonProps": {"label": "Action", "variant": "secondary",
                                 "className": "custom-action", "href": "/go"}}
        html = render_component("hero", props)
        for text in ("Action", "usa-button--secondary", "custom-action", "/go"):
            self.assertIn(text, html)
        html = render_component("hero", {**props, "searchProps": {"id": "search"}})
        self.assertNotIn("custom-action", html)

    def test_collection_calendar_defaults_and_override(self):
        for override in ({}, {"underCollection": False}, {"underCollection": True}):
            html = render_component("collection", {"items": [{
                "href": "#", "heading": "Event",
                "calendarDateProps": {"datetime": "2026-10-07", **override},
            }]})
            self.assertIn("OCT", html)
            self.assertEqual("usa-collection__calendar-date" in html,
                             override.get("underCollection", True))

    def test_checkbox_item_props_override_group_defaults(self):
        html = render_component("checkbox-group", {
            "id": "group", "name": "group-name", "tile": True, "small": True,
            "checkboxProps": [
                {"id": "custom-id", "name": "individual", "label": "Choice",
                 "success": "Saved choice", "required": True,
                 "tile": False, "small": False, "className": "custom-checkbox"},
                {"label": "Default choice"},
            ],
        })
        for text in ("custom-id", "individual", "Saved choice", "required",
                     "custom-checkbox", "group-1"):
            self.assertIn(text, html)
        self.assertEqual(html.count("usa-checkbox__input--tile"), 1)
        self.assertEqual(html.count("usx-checkbox--small"), 1)


    def test_card_group_forwards_new_card_props(self):
        html = render_component("card-group", {"cardProps": [{
            "title": "Nested card", "tagProps": [{"value": "Nested tag"}],
            "buttonProps": [{"label": "Nested action", "ghost": True}],
            "imageProps": [{"src": "nested.jpg", "alt": "Nested image", "staticBaseUrl": "/assets/"}],
        }]})
        for text in ("Nested card", "Nested tag", "Nested action", "/assets/nested.jpg", "usx-button--ghost"):
            self.assertIn(text, html)
        self.assertIn('<li', html)


class CalloutQuoteTests(SimpleTestCase):
    def test_paragraph_callout(self):
        html = render_component("callout", {"element": "p", "content": "Supporting information"})
        root = fromstring(html.strip())
        self.assertEqual(root.tag, "p")
        self.assertIn("usx-callout", root.attrib["class"].split())
        self.assertEqual(root.text.strip(), "Supporting information")

    def test_callout_props_and_content_precedence(self):
        plain = render_component("callout", {"content": "Fallback"})
        self.assertIn("Fallback", plain)
        self.assertNotIn("border-", plain)
        html = render_component("callout", {
            "orientation": "vertical", "element": "aside", "strokeColor": "info",
            "backgroundColor": "base-lightest", "textColor": "primary",
            "indent": "md", "dedent": True, "big": True,
            "children": "Preferred", "content": "Ignored",
        })
        for text in ("<aside", "usx-callout--vertical", "border-info", "bg-base-lightest",
                     "text-primary", "usx-callout--indent-md", "usx-callout--dedent",
                     "usx-callout--big", "Preferred"):
            self.assertIn(text, html)
        self.assertNotIn("Ignored", html)
        self.assertNotIn("Ignored", render_component("callout", {"children": "", "content": "Ignored"}))

    def test_content_fallback_in_template_tags(self):
        for name in ("callout", "quote"):
            template = Template("{% load components %}{% " + name + " props=props %}{% end" + name + " %}")
            self.assertIn("Fallback", template.render(Context({"props": {"content": "Fallback"}})))
            self.assertNotIn("Ignored", template.render(Context({"props": {"children": "", "content": "Ignored"}})))
            template = Template("{% load components %}{% " + name + " content='Ignored' %}Preferred{% end" + name + " %}")
            self.assertIn("Preferred", template.render(Context({})))
            self.assertNotIn("Ignored", template.render(Context({})))

    def test_quote_semantics(self):
        html = render_component("quote", {
            "content": "Quoted words", "sourceLinkProps": {"href": "https://example.com/work"},
            "sourceTitle": "Published work", "attributionProps": {"primary": "Author"},
        })
        self.assertIn('<blockquote', html)
        self.assertIn('cite="https://example.com/work"', html)
        self.assertLess(html.index("</blockquote>"), html.index("<figcaption"))
        self.assertInHTML('<a href="https://example.com/work" class="usa-link usx-link">Published work</a>', html)
        self.assertNotIn("<cite>Author", html)


    def test_vertical_quote_marks(self):
        for body in ({"content": "Quoted words"}, {"children": "Quoted words", "content": "Ignored"}):
            vertical = render_component("quote", {**body, "calloutProps": {"orientation": "vertical"}})
            self.assertIn("❝Quoted words❞", vertical)
            self.assertNotIn("usx-quote__icon", vertical)
            self.assertNotIn("Ignored", vertical)
            horizontal = render_component("quote", body)
            self.assertIn("usx-quote__icon", horizontal)
            self.assertNotIn("❝", horizontal)

    def test_quote_layout_ancestry(self):
        class LayoutParser(HTMLParser):
            def __init__(self):
                super().__init__()
                self.stack = []
                self.parents = {}

            def handle_starttag(self, tag, attrs):
                classes = dict(attrs).get("class", "").split()
                for name in ("usx-quote__icon", "usx-quote__content", "usx-quote__attribution"):
                    if name in classes:
                        self.parents[name] = [item for _, values in self.stack for item in values]
                if tag not in ("img", "input", "br", "hr", "meta", "link"):
                    self.stack.append((tag, classes))

            def handle_endtag(self, tag):
                if self.stack and self.stack[-1][0] == tag:
                    self.stack.pop()

        for orientation in ("horizontal", "vertical"):
            html = render_component("quote", {
                "calloutProps": {"orientation": orientation},
                "content": "Words", "attributionProps": {"primary": "Author"},
            })
            parser = LayoutParser()
            parser.feed(html)
            self.assertIn("usx-callout", parser.parents["usx-quote__content"])
            self.assertIn("usx-callout", parser.parents["usx-quote__attribution"])
            if orientation == "horizontal":
                self.assertNotIn("usx-callout", parser.parents["usx-quote__icon"])
            else:
                self.assertNotIn("usx-quote__icon", parser.parents)

    def test_quote_classes_use_their_respective_wrappers(self):
        html = render_component("quote", {
            "className": "outer-class",
            "calloutProps": {"className": "inner-class"},
            "content": "Words",
        })
        divs = [attrs for tag, attrs in RenderedElements(html).elements if tag == "div"]
        for class_name in ("usx-quote", "outer-class"):
            self.assertIn(class_name, divs[0]["class"].split())
        for class_name in ("usx-callout", "inner-class"):
            self.assertIn(class_name, divs[1]["class"].split())


    def test_quote_source_link_props(self):
        html = render_component("quote", {
            "content": "Words", "sourceTitle": "Source title",
            "sourceLinkProps": {"href": "/source", "external": True,
                                "className": "custom-source", "children": "Ignored"},
        })
        for value in ('href="/source"', 'cite="/source"', 'usa-link--external',
                      'custom-source', 'target="_blank"', 'Source title'):
            self.assertIn(value, html)
        self.assertNotIn("Ignored", html)
        self.assertNotIn("usx-quote__source", html)
        plain = render_component("quote", {"content": "Words", "sourceTitle": "Unlinked title"})
        self.assertIn("<cite>Unlinked title</cite>", plain)
        self.assertNotIn("<a", plain)
        empty = render_component("quote", {"sourceTitle": "Title", "sourceLinkProps": {}})
        self.assertIn("<a", empty)
        self.assertNotIn("<cite>", render_component("quote", {"sourceLinkProps": {"href": "/source"}}))


class ToggleTests(SimpleTestCase):
    def test_value_precedence_and_falsy_values(self):
        for value in (0, ""):
            html = render_component("toggle", {
                "id": "choose", "ariaLabel": "Choose", "options": [{"value": item, "label": str(item)} for item in (0, "", "other")],
                "value": value, "defaultValue": "other",
            })
            inputs = [attrs for tag, attrs in RenderedElements(html).elements if tag == "input"]
            checked = [attrs for attrs in inputs if "checked" in attrs]
            self.assertEqual(len(checked), 1)
            self.assertEqual(checked[0]["value"], str(value))

    def test_unique_ids_names_and_icon_labels(self):
        props = {"ariaLabel": "Transport", "variant": "icon", "options": [
            {"value": "bike", "label": "Bike", "icon": "directions_bike"},
            {"value": "bus", "label": "Bus", "icon": "directions_bus", "disabled": True},
        ]}
        first = render_component("toggle", {**props, "id": "transport-one"})
        second = render_component("toggle", {**props, "id": "transport-two"})
        a = [attrs for tag, attrs in RenderedElements(first).elements if tag == "input"]
        b = [attrs for tag, attrs in RenderedElements(second).elements if tag == "input"]
        self.assertNotEqual(a[0]["name"], b[0]["name"])
        self.assertNotEqual(a[0]["id"], b[0]["id"])
        labels = [attrs for tag, attrs in RenderedElements(first).elements if tag == "label"]
        self.assertEqual([label["for"] for label in labels], [item["id"] for item in a])
        self.assertIn('usa-sr-only">Bike</span>', first)
        self.assertIn("disabled", a[1])

    def test_disabled_required_and_template_tag(self):
        html = Template("{% load components %}{% toggle props=props %}{% endtoggle %}").render(Context({
            "props": {"id": "choices", "ariaLabel": "Choices", "options": [{"value": "one", "label": "One"}, {"value": "two", "label": "Two"}],
                      "disabled": True, "required": True},
        }))
        elements = RenderedElements(html).elements
        inputs = [attrs for tag, attrs in elements if tag == "input"]
        self.assertTrue(all("disabled" in attrs and "required" in attrs for attrs in inputs))
        self.assertIn('id="choices"', html)
        self.assertIn('role="radiogroup" aria-label="Choices"', html)
        self.assertIn('class="usx-toggle usa-button-group"', html)
        self.assertNotIn('<fieldset', html)
        self.assertNotIn('<legend', html)


class TreeTests(SimpleTestCase):
    def test_nested_tree_matches_react_component_structure(self):
        html = render_component("tree", {
            "items": [
                {"type": "text", "text": "Applications"},
                {"type": "link", "text": "Check status", "href": "#status"},
                {
                    "type": "details",
                    "summaryProps": {"label": "More services"},
                    "items": [
                        {"type": "link", "text": "Renew", "href": "#renew"},
                        {
                            "type": "details",
                            "summaryProps": {"label": "Benefits"},
                            "items": [{"type": "link", "text": "Eligibility", "href": "#eligibility"}],
                        },
                    ],
                },
                {
                    "type": "details",
                    "summaryProps": {"label": "Help"},
                    "text": "Read the guidance.",
                },
                {"type": "details", "summaryProps": {"label": "Coming soon"}, "items": []},
            ],
        })
        root = fromstring(html.strip())

        self.assertEqual(root.tag, "ul")
        self.assertEqual(root.attrib["class"], "usx-tree usx-tree--raw")
        self.assertEqual(len(root.findall("li")), 5)
        self.assertEqual(root.find("li/span").text, "Applications")
        self.assertEqual(root.find("li/a").attrib["href"], "#status")

        branch = root.findall("li/details")[0]
        self.assertEqual(branch.attrib["class"], "usx-details usx-tree__branch")
        self.assertEqual(branch.find("summary/span").text, "More services")
        nested_tree = branch.find("div/ul")
        self.assertEqual(nested_tree.attrib["class"], "usx-tree usx-tree--raw")
        self.assertEqual(nested_tree.findall("li/details")[0].find("summary/span").text, "Benefits")
        self.assertEqual(nested_tree.find("li/details/div/ul/li/a").attrib["href"], "#eligibility")

        leaf = root.findall("li/details")[1]
        self.assertEqual(leaf.find("div/p").text, "Read the guidance.")
        empty_branch = root.findall("li/details")[2]
        self.assertEqual(len(empty_branch.find("div/ul")), 0)


class PopoverTests(SimpleTestCase):
    def test_panel_markup_matches_react_composition_order(self):
        html = render_component("popover", {
            "id": "services-panel",
            "summaryProps": {
                "label": "Services",
                "className": "usa-button usx-button",
                "ariaLabel": "Services menu",
            },
            "panelHeading": "Services heading",
            "headingLevel": "h3",
            "children": "<p>Additional information</p>",
            "scrollable": True,
            "contentClassName": "font-sans-xs",
            "panelClassName": "font-sans-sm",
            "showClose": True,
            "closeLabel": "Close services",
        })
        root = fromstring(html.strip())
        summary = root.find("summary")
        panel = root.find("div")

        self.assertEqual(root.tag, "details")
        self.assertEqual(root.attrib["class"], "usx-popover")
        self.assertEqual(summary.attrib["class"], "usa-button usx-button")
        self.assertEqual(summary.attrib["aria-label"], "Services menu")
        self.assertEqual("".join(summary.itertext()), "Services")
        self.assertEqual(panel.attrib["id"], "services-panel")
        self.assertEqual(panel.attrib["class"], "usx-popover__panel font-sans-sm")
        self.assertNotIn("role", panel.attrib)
        self.assertNotIn("aria-label", panel.attrib)
        self.assertEqual(panel.find("h3").attrib["class"], "usx-popover__panel-heading")
        self.assertEqual(panel.find("h3").text, "Services heading")
        self.assertEqual(
            panel.find("div").attrib["class"],
            "usx-popover__panel-content usx-popover__scroll font-sans-xs",
        )
        self.assertEqual(panel.find("div/p").text, "Additional information")
        close_button = panel.find("button")
        self.assertEqual(
            close_button.attrib["class"],
            "usa-button usx-button usa-button--unstyled usx-popover__panel-close",
        )
        self.assertEqual(close_button.attrib["data-usx-popover-close"], "services-panel")
        self.assertEqual(close_button.text, "Close services")
        self.assertLess(html.index("<h3"), html.index("usx-popover__panel-content"))
        self.assertLess(html.index("usx-popover__panel-content"), html.index("usx-popover__panel-close"))

    def test_menu_items_render_links_text_and_nested_popovers(self):
        html = render_component("popover", {
            "id": "menu",
            "summaryProps": {"label": "Services"},
            "menuItems": [
                {"type": "link", "href": "#all", "text": "All <services>"},
                {
                    "type": "details",
                    "summaryProps": {"label": "Housing", "className": "custom"},
                    "items": [
                        {"type": "link", "href": "#rent", "text": "Rent help"},
                        {
                            "type": "details",
                            "id": "custom-id",
                            "summaryProps": {"label": "More"},
                            "items": [{"type": "text", "text": "Closed on holidays"}],
                        },
                    ],
                },
            ],
            "children": "<p>After menu</p>",
        })
        root = fromstring(html.strip())
        panel = root.find("div")
        menu = panel.find("ul")

        self.assertEqual(menu.attrib["class"], "usx-popover__menu")
        link = menu.find("li/a")
        self.assertEqual(link.attrib["href"], "#all")
        self.assertEqual(link.attrib["class"], "usa-link usx-link usx-no-visited usx-popover__menu-item")
        self.assertEqual(link.text, "All <services>")

        nested = menu.findall("li")[1].find("details")
        self.assertEqual(nested.attrib["class"], "usx-popover")
        self.assertEqual(nested.attrib["name"], "menu")
        self.assertEqual(nested.attrib["data-side"], "right")
        self.assertEqual(nested.find("summary").attrib["class"], "custom usx-popover__menu-item")
        nested_panel = nested.find("div")
        self.assertEqual(nested_panel.attrib["id"], "menu-1")
        self.assertEqual(nested_panel.find("ul/li/a").attrib["href"], "#rent")

        deepest = nested_panel.find("ul").findall("li")[1].find("details")
        self.assertEqual(deepest.attrib["name"], "menu-1")
        self.assertEqual(deepest.find("summary").attrib["class"], "usx-popover__menu-item")
        self.assertEqual(deepest.find("div").attrib["id"], "custom-id")
        self.assertEqual(deepest.find("div/ul/li/span").text, "Closed on holidays")
        self.assertLess(html.index("usx-popover__menu"), html.index("usx-popover__panel-content"))


class DetailsTests(SimpleTestCase):
    diagnostic_text = (
        'Traceback (most recent call last):\n'
        '  File "/app/records.py", line 42, in save\n'
        'ValueError: A <script> tag & invalid input were rejected.'
    )

    def test_plain_text_details_are_collapsed_and_escaped(self):
        html = render_component("details", {
            "summaryProps": {"label": "Technical details"},
            "text": self.diagnostic_text,
        })
        elements = RenderedElements(html)
        details = elements.attributes("details")
        self.assertEqual(details["class"], "usx-details")
        self.assertNotIn("open", details)
        self.assertIn(
            '<summary class="usx-summary"><span class="usx-summary-text">Technical details</span></summary>',
            html,
        )
        self.assertIn("Traceback (most recent call last):\n", html)
        self.assertIn("&lt;script&gt; tag &amp; invalid input", html)
        self.assertNotIn("<script>", html)
        self.assertNotIn("<code", html)
        self.assertNotIn("<pre", html)
        self.assertEqual(html.count('<p class="usx-details__text">'), 1)

    def test_open_custom_summary_and_empty_details(self):
        html = render_component("details", {
            "text": self.diagnostic_text,
            "summaryProps": {"label": "Exception traceback"},
            "open": True,
            "className": "custom-details",
        })
        details = RenderedElements(html).attributes("details")
        self.assertIn("open", details)
        self.assertIn("custom-details", details["class"].split())
        self.assertIn(">Exception traceback</span></summary>", html)
        empty_html = render_component("details", {
            "summaryProps": {"label": "More information"}, "text": "",
        })
        self.assertIn('<p class="usx-details__text"></p>', empty_html)

    def test_plain_text_is_escaped_even_when_marked_safe_or_autoescape_is_off(self):
        from django.utils.safestring import mark_safe

        text = '</p><script>alert("details")</script> &lt;already escaped&gt;'
        summary = '</summary><script>alert("summary")</script> & details'
        template = Template(
            "{% load components %}"
            "{% details text=text summaryProps=summary_props %}{% enddetails %}"
        )
        for safe in (False, True):
            for autoescape in (False, True):
                with self.subTest(marked_safe=safe, autoescape=autoescape):
                    html = template.render(Context({
                        "text": mark_safe(text) if safe else text,
                        "summary_props": {
                            "label": mark_safe(summary) if safe else summary,
                        },
                    }, autoescape=autoescape))
                    self.assertIn("&lt;/p&gt;&lt;script&gt;", html)
                    self.assertIn("&lt;/summary&gt;&lt;script&gt;", html)
                    self.assertIn("&amp;lt;already escaped&amp;gt;", html)
                    self.assertNotIn("<script>", html)
                    self.assertEqual(html.count("<summary"), 1)
                    self.assertEqual(html.count('<p class="usx-details__text">'), 1)

    def test_diagnostic_report_preserves_whitespace_and_empty_summary_uses_default(self):
        report = "\n\nRequest status: failed\n  Reference: JOB-1204\n\tItems processed: 0\n"
        html = render_component("details", {
            "text": report, "summaryProps": {"label": ""},
        })
        root = fromstring(html.strip())
        self.assertEqual(root.find("summary/span").text, "Details")
        text = root.find("div/p")
        self.assertIsNotNone(text)
        self.assertEqual(len(text), 0)
        self.assertEqual(text.text, report)

    def test_rich_children_replace_plain_text(self):
        html = Template(
            "{% load components %}"
            "{% details summaryProps=summary_props text='Hidden fallback' %}"
            '<ul><li><a href="/guidance">Read the guidance</a></li></ul>'
            "{% enddetails %}"
        ).render(Context({"summary_props": {"label": "Before you apply"}}))
        self.assertIn('<ul><li><a href="/guidance">Read the guidance</a></li></ul>', html)
        self.assertNotIn("Hidden fallback", html)
        self.assertNotIn("usx-details__text", html)

    def test_empty_children_replace_text_and_null_children_use_text(self):
        for children in ("", False, True):
            with self.subTest(children=children):
                empty_html = render_component("details", {
                    "summaryProps": {"label": "More information"},
                    "text": "Hidden fallback",
                    "children": children,
                })
                self.assertNotIn("Hidden fallback", empty_html)
                self.assertNotIn("usx-details__text", empty_html)
                root = fromstring(empty_html.strip())
                self.assertEqual(len(root.find("div")), 0)
                self.assertIsNone(root.find("div").text)
        count_html = render_component("details", {
            "summaryProps": {"label": "Count"}, "children": 0,
        })
        self.assertIn('<div class="usx-details__content">0</div>', count_html)
        fallback_html = render_component("details", {
            "summaryProps": {"label": "More information"},
            "text": "Visible fallback",
            "children": None,
        })
        self.assertIn('<p class="usx-details__text">Visible fallback</p>', fallback_html)

    def test_summary_classes_apply_to_their_respective_elements(self):
        html = render_component("details", {
            "summaryProps": {
                "label": "Help",
                "className": "padding-1",
                "textClassName": "text-bold",
            },
        })
        root = fromstring(html.strip())
        self.assertEqual(root.find("summary").attrib["class"], "usx-summary padding-1")
        self.assertEqual(root.find("summary/span").attrib["class"], "usx-summary-text text-bold")
        self.assertEqual(root.find("summary/span").text, "Help")

    def test_color_utilities_and_independent_decoration_switches(self):
        for no_content_border in (False, True):
            for no_summary_underline in (False, True):
                with self.subTest(borderless=no_content_border, no_underline=no_summary_underline):
                    html = render_component("details", {
                        "summaryProps": {
                            "label": "Supporting information",
                            "markerColor": "primary",
                            "underlineColor": "secondary",
                            "noUnderline": no_summary_underline,
                        },
                        "text": "More information",
                        "contentBorderColor": "accent-cool",
                        "noContentBorder": no_content_border,
                        "className": "margin-top-3",
                        "contentClassName": "font-family-mono",
                    })
                    root = fromstring(html.strip())
                    classes = root.attrib["class"].split()
                    self.assertEqual("usx-details--borderless" in classes, no_content_border)
                    self.assertIn("margin-top-3", classes)
                    summary_classes = root.find("summary").attrib["class"].split()
                    self.assertIn("marker-primary", summary_classes)
                    self.assertEqual(
                        "usx-summary--no-underline" in summary_classes,
                        no_summary_underline,
                    )
                    span_classes = root.find("summary/span").attrib["class"].split()
                    self.assertEqual("border-secondary" in span_classes, not no_summary_underline)
                    content_classes = root.find("div").attrib["class"].split()
                    self.assertIn("font-family-mono", content_classes)
                    self.assertEqual("border-accent-cool" in content_classes, not no_content_border)

    def test_template_tag_can_be_composed_inside_error_page(self):
        html = Template(
            "{% load components %}"
            "{% error_page title='Request failed' %}"
            "{% details summaryProps=summary_props text=diagnostic_text %}{% enddetails %}"
            "{% enderror_page %}"
        ).render(Context({
            "diagnostic_text": self.diagnostic_text,
            "summary_props": {"label": "Technical details"},
        }))
        self.assertIn("usx-error-page", html)
        self.assertIn("usx-details", html)
        self.assertIn("&lt;script&gt; tag &amp; invalid input", html)
        self.assertNotIn("<script>", html)


class ErrorPageTests(SimpleTestCase):
    def test_default_page_semantics_and_composition(self):
        html = render_component("error-page", {})
        elements = RenderedElements(html)
        main = elements.attributes("main")
        self.assertEqual(main["id"], "main-content")
        self.assertNotIn("tabindex", main)
        self.assertEqual(main["aria-labelledby"], "main-content-title")
        self.assertTrue({"usx-page", "usx-error-page"}.issubset(main["class"].split()))
        self.assertIn('id="main-content-title" class="usx-page__title"', html)
        self.assertIn('class="usx-page__content"', html)
        self.assertIn('class="usa-prose usx-prose usx-error-page__body"', html)
        self.assertNotIn("usx-container", html)
        self.assertNotIn("grid-container", html)
        self.assertEqual(html.count("<h1"), 1)
        self.assertIn("We couldn’t complete your request", html)
        self.assertNotIn('role="alert"', html)
        for optional_class in ("usx-error-page__actions", "usx-error-page__support", "usx-error-page__meta", "usx-error-page__cat"):
            self.assertNotIn(optional_class, html)
        self.assertNotIn("https://http.cat/", html)
        self.assertNotIn("usx-details", html)

    def test_full_page_uses_shared_actions_links_and_safe_text(self):
        html = render_component("error-page", {
            "id": "request-error",
            "title": "Request <failed>",
            "description": "The service could not process A & B.",
            "guidance": "Try one of these options.",
            "actions": [
                {"label": "Go home", "href": "/", "variant": "primary"},
                {"label": "External status (opens in a new tab)", "href": "https://status.example.gov", "variant": "outline", "isExternal": True},
            ],
            "supportHeading": "Get help",
            "supportText": "Share the reference ID with support.",
            "supportLinks": [
                {"label": "Email support", "href": "mailto:support@example.gov"},
                {"label": "External help (opens in a new tab)", "href": "https://help.example.gov", "external": True},
            ],
            "errorCode": 500,
            "referenceId": "REF-1234567890-ABCDEFGHIJ",
            "detailsProps": {
                "summary": "Technical details",
                "text": DetailsTests.diagnostic_text,
                "className": "custom-details",
            },
            "children": "<p>Your draft is safe.</p>",
            "className": "custom-error-page",
        })
        for value in (
            'id="request-error"', "custom-error-page", "Request &lt;failed&gt;",
            "A &amp; B", "<p>Your draft is safe.</p>",
            "usa-button-group usx-button-group", "usa-button--primary",
            "usa-button--outline", "usa-link usx-link",
            "request-error-support-heading", "Error code:", "Reference ID:",
            "REF-1234567890-ABCDEFGHIJ", "usx-details",
            "&lt;script&gt; tag &amp; invalid input",
        ):
            self.assertIn(value, html)
        self.assertLess(html.index("Go home"), html.index("External status (opens in a new tab)"))
        self.assertEqual(html.count('target="_blank"'), 2)
        self.assertNotIn("<failed>", html)
        self.assertNotIn("<script>", html)
        self.assertNotIn("https://http.cat/", html)
        details = RenderedElements(html).attributes("details")
        self.assertTrue({
            "usx-error-page__details", "font-family-mono", "font-mono-sm", "custom-details",
        }.issubset(details["class"].split()))

    def test_template_tag_has_the_same_fallbacks(self):
        html = Template("{% load components %}{% error_page %}{% enderror_page %}").render(Context({}))
        self.assertIn('id="main-content"', html)
        self.assertIn("We couldn’t complete your request", html)
        self.assertIn("We’re sorry. Please try again later.", html)

    def test_numeric_zero_error_code_is_rendered(self):
        html = render_component("error-page", {"title": "Request failed", "errorCode": 0, "cats": True})
        self.assertIn('<strong>Error code:</strong>', html)
        self.assertIn('<span class="usx-error-page__meta-value">0</span>', html)
        self.assertNotIn("https://http.cat/", html)

    def test_cats_use_the_error_code_and_safe_alt_text(self):
        for error_code in (404, "503"):
            with self.subTest(error_code=error_code):
                html = render_component("error-page", {
                    "title": "Request failed",
                    "errorCode": error_code,
                    "cats": True,
                })
                self.assertIn('class="usx-image"', html)
                self.assertIn(f'src="https://http.cat/{error_code}"', html)
                self.assertIn(f'alt="Cat illustration for HTTP error {error_code}"', html)

        custom_alt = render_component("error-page", {
            "title": "Request failed",
            "errorCode": 500,
            "cats": True,
            "catAlt": "A waiting cat & a service notice",
        })
        self.assertIn('alt="A waiting cat &amp; a service notice"', custom_alt)

        html = render_component("error-page", {"title": "Request failed", "cats": True})
        self.assertNotIn("https://http.cat/", html)

        for error_code in ("CUSTOM", 200, 505, 999):
            with self.subTest(error_code=error_code):
                html = render_component("error-page", {
                    "title": "Request failed",
                    "errorCode": error_code,
                    "cats": True,
                })
                self.assertIn(f"https://http.cat/{error_code}", html)

    def test_page_supports_focus_and_heading_label_props(self):
        html = render_component("page", {
            "id": "account-page",
            "title": "Account",
            "titleId": "account-title",
            "tabIndex": -1,
            "ariaLabelledby": "custom-label",
            "content": "Page content",
        })
        elements = RenderedElements(html)
        main = elements.attributes("main")
        self.assertEqual(main["tabindex"], "-1")
        self.assertEqual(main["aria-labelledby"], "custom-label")
        self.assertIn('<h1 id="account-title" class="usx-page__title">Account</h1>', html)
