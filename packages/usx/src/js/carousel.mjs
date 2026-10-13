const CAROUSEL = '.usx-carousel';
const TRACK = '.usx-carousel__track';
const SLIDE = '.usx-carousel__slide';
const DOT = '.usx-carousel__dot';
const PREVIOUS = '.usx-carousel__button--previous';
const NEXT = '.usx-carousel__button--next';
const listening = new WeakSet();
const scrollTargets = new WeakMap();
const scrollPositions = new WeakMap();
const dotAnimations = new WeakMap();

function carousels(root) {
  return [...(root.matches?.(CAROUSEL) ? [root] : []), ...root.querySelectorAll(CAROUSEL)];
}

function getTrack(carousel) {
  return carousel.querySelector(':scope > .usx-carousel__viewport > .usx-carousel__track');
}

function getDots(carousel) {
  return [...carousel.querySelectorAll(':scope > .usx-carousel__dots > .usx-carousel__dot')];
}

function isEnhanced(carousel) {
  return carousel.querySelector(':scope > .usx-carousel__dots > .usx-carousel__active-dot') !== null;
}

function slides(carousel) {
  return [...getTrack(carousel).children].filter((child) => child.matches(SLIDE));
}

function current(carousel) {
  return Math.max(
    0,
    getDots(carousel).findIndex((dot) => dot.getAttribute('aria-current') === 'true')
  );
}

function update(carousel, index) {
  const items = slides(carousel);
  if (items.length < 2) return;
  const selected = (index + items.length) % items.length;
  const previous = current(carousel);
  items.forEach((slide, position) => {
    if (position === selected) {
      slide.removeAttribute('aria-hidden');
      slide.removeAttribute('inert');
    } else {
      slide.setAttribute('aria-hidden', 'true');
      slide.setAttribute('inert', '');
    }
  });
  const dots = getDots(carousel);
  const controls = dots[0].parentElement;
  const firstVisible = Math.max(0, Math.min(selected - 3, dots.length - 7));
  dots.forEach((dot, position) => {
    if (position === selected) dot.setAttribute('aria-current', 'true');
    else dot.removeAttribute('aria-current');
    dot.hidden = false;
    const visible = position >= firstVisible && position < firstVisible + 7;
    dot.tabIndex = visible ? 0 : -1;
    if (visible) {
      dot.removeAttribute('aria-hidden');
      dot.removeAttribute('inert');
    } else {
      dot.setAttribute('aria-hidden', 'true');
      dot.setAttribute('inert', '');
    }
    if (dots.length >= 7 && (position === firstVisible || position === firstVisible + 6)) {
      dot.setAttribute('data-edge', '');
    } else {
      dot.removeAttribute('data-edge');
    }
  });
  let marker = controls.querySelector('.usx-carousel__active-dot');
  if (!marker) {
    marker = document.createElement('span');
    marker.className = 'usx-carousel__active-dot';
    marker.setAttribute('aria-hidden', 'true');
    controls.append(marker);
  }
  dotAnimations.get(carousel)?.cancel();
  const size = marker.offsetWidth;
  const left = (dot) => dot.offsetLeft + (dot.offsetWidth - size) / 2;
  const from = left(dots[previous]);
  const to = left(dots[selected]);
  marker.style.left = `${to}px`;
  if (
    Math.abs(selected - previous) === 1 &&
    !matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    dotAnimations.set(
      carousel,
      marker.animate(
        [
          { left: `${from}px`, width: `${size}px` },
          { left: `${Math.min(from, to)}px`, width: `${Math.abs(to - from) + size}px` },
          { left: `${to}px`, width: `${size}px` },
        ],
        { duration: 360, easing: 'ease-in-out' }
      )
    );
  }
  controls.style.setProperty('--carousel-dot-start', firstVisible);
  const status = carousel.querySelector(':scope > .usx-carousel__viewport > .usx-carousel__status');
  status.dataset.status = `${selected + 1}/${items.length}`;
}

function addControls(carousel, count) {
  const doc = carousel.ownerDocument;
  const viewport = carousel.querySelector(':scope > .usx-carousel__viewport');
  const status = doc.createElement('span');
  status.className = carousel.dataset.statusClassName
    ? `usx-carousel__status ${carousel.dataset.statusClassName}`
    : 'usx-carousel__status';
  status.setAttribute('aria-hidden', 'true');

  const button = (direction, label) => {
    const element = doc.createElement('button');
    element.type = 'button';
    element.className = `usx-carousel__button usx-carousel__button--${direction}`;
    element.setAttribute('aria-label', label);
    return element;
  };

  const dots = doc.createElement('div');
  dots.className = carousel.dataset.showDots === 'false'
    ? 'usx-carousel__dots usx-carousel__dots--hidden'
    : 'usx-carousel__dots';
  dots.setAttribute('role', 'group');
  dots.setAttribute('aria-label', 'Choose a slide');
  for (let index = 0; index < count; index += 1) {
    const dot = doc.createElement('button');
    dot.type = 'button';
    dot.className = 'usx-carousel__dot';
    dot.setAttribute('aria-label', `Show slide ${index + 1} of ${count}`);
    dots.append(dot);
  }

  viewport.prepend(status, button('previous', 'Previous slide'));
  viewport.append(button('next', 'Next slide'));
  carousel.append(dots);
}

function select(carousel, index) {
  const track = getTrack(carousel);
  update(carousel, index);
  const target = current(carousel);
  const position = track.scrollLeft / track.clientWidth;
  if (Math.abs(target - position) > 0.01) {
    scrollTargets.set(track, { index: target, last: position });
  } else {
    scrollTargets.delete(track);
  }
  track.scrollTo({
    left: target * track.clientWidth,
    behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
  });
}

function click(event) {
  const button = event.target.closest(`${DOT}, ${PREVIOUS}, ${NEXT}`);
  const carousel = button?.closest(CAROUSEL);
  if (!carousel || !this.contains(carousel) || !isEnhanced(carousel)) return;
  if (button.matches(DOT)) {
    select(carousel, getDots(carousel).indexOf(button));
  } else {
    select(carousel, current(carousel) + (button.matches(NEXT) ? 1 : -1));
  }
}

function keydown(event) {
  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
  if (event.altKey || event.ctrlKey || event.metaKey) return;
  const carousel = event.target.closest(CAROUSEL);
  if (!carousel || !this.contains(carousel) || !isEnhanced(carousel)) return;
  const track = getTrack(carousel);
  if (event.target !== track && !event.target.matches(`${DOT}, ${PREVIOUS}, ${NEXT}`)) return;
  event.preventDefault();
  select(carousel, current(carousel) + (event.key === 'ArrowRight' ? 1 : -1));
  if (event.target.matches(DOT)) {
    getDots(carousel)[current(carousel)].focus({ preventScroll: true });
  }
}

function scroll(event) {
  const track = event.target;
  if (!track.matches?.(TRACK)) return;
  const carousel = track.closest(CAROUSEL);
  if (!carousel || !this.contains(carousel) || !isEnhanced(carousel) || track !== getTrack(carousel)) return;
  const position = track.scrollLeft / track.clientWidth;
  const last = scrollPositions.get(track) ?? current(carousel);
  scrollPositions.set(track, position);
  const target = scrollTargets.get(track);
  if (target) {
    const reversed = (position - target.last) * (target.index - target.last) < -0.0001;
    target.last = position;
    if (Math.abs(position - target.index) < 0.01 || reversed) scrollTargets.delete(track);
    else return;
  }
  if (position === last) return;
  const threshold = 0.05;
  const next = position > last ? Math.ceil(position - threshold) : Math.floor(position + threshold);
  const index = Math.max(0, Math.min(getDots(carousel).length - 1, next));
  if (index !== current(carousel)) update(carousel, index);
}

const carousel = {
  init(root = document.body) {
    carousels(root).forEach((element) => {
      if (element.dataset.enhanced) return;
      const track = getTrack(element);
      if (!track) return;
      const count = slides(element).length;
      if (count < 2) return;
      addControls(element, count);
      update(element, 0);
      track.scrollLeft = 0;
      element.dataset.enhanced = 'true';
    });
  },
  on(root = document.body) {
    carousel.init(root);
    if (listening.has(root)) return;
    root.addEventListener('click', click);
    root.addEventListener('keydown', keydown);
    root.addEventListener('scroll', scroll, true);
    listening.add(root);
  },
  off(root = document.body) {
    root.removeEventListener('click', click);
    root.removeEventListener('keydown', keydown);
    root.removeEventListener('scroll', scroll, true);
    listening.delete(root);
  },
};

export default carousel;
