from html.parser import HTMLParser

from django.template import Context, Template
from django.test import SimpleTestCase

from .core.render import render_component


class RenderedElements(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.elements = []
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        self.elements.append((tag, dict(attrs)))

    def attributes(self, tag):
        return next(attrs for name, attrs in self.elements if name == tag)


class ReactParityTests(SimpleTestCase):
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