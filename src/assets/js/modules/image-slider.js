const SLIDER_DEFAULTS = {
	trackSelector: '.c-slider__track',
	slideSelector: '.c-slider__slide',
	prevSelector: '[data-slider-prev]',
	nextSelector: '[data-slider-next]',
	paginationSelector: '.c-slider__pagination',
	swipeThreshold: 40
};

const KEYBOARD = {
	prev: ['ArrowLeft', 'Left'],
	next: ['ArrowRight', 'Right']
};

class ImageSlider {
	constructor(element, options = {}) {
		this.root = element;
		this.options = { ...SLIDER_DEFAULTS, ...options };
		this.track = element.querySelector(this.options.trackSelector);
		this.slides = Array.from(element.querySelectorAll(this.options.slideSelector));
		this.prevButton = element.querySelector(this.options.prevSelector);
		this.nextButton = element.querySelector(this.options.nextSelector);
		this.pagination = element.querySelector(this.options.paginationSelector);
		this.paginationButtons = [];

		this.currentIndex = 0;
		this.touchStartX = null;
		this.touchEndX = null;

		this.handlePrev = this.goToPrev.bind(this);
		this.handleNext = this.goToNext.bind(this);
		this.handleKeydown = this.handleKeydown.bind(this);
		this.handleTouchStart = this.handleTouchStart.bind(this);
		this.handleTouchEnd = this.handleTouchEnd.bind(this);

		this.init();
	}

	init() {
		if (!this.track || this.slides.length === 0) {
			return;
		}

		if (!this.root.hasAttribute('tabindex')) {
			this.root.setAttribute('tabindex', '0');
		}
		this.root.setAttribute('role', 'region');
		this.root.setAttribute('aria-roledescription', 'carousel');

		this.bindEvents();

		if (this.slides.length <= 1) {
			this.toggleControls(false);
			this.updateSlides();
			return;
		}

		this.toggleControls(true);
		this.renderPagination();
		this.updateSlides();
	}

	bindEvents() {
		if (this.prevButton) {
			this.prevButton.addEventListener('click', this.handlePrev);
		}

		if (this.nextButton) {
			this.nextButton.addEventListener('click', this.handleNext);
		}

		this.root.addEventListener('keydown', this.handleKeydown);

		if (this.track) {
			this.track.addEventListener('touchstart', this.handleTouchStart, { passive: true });
			this.track.addEventListener('touchend', this.handleTouchEnd, { passive: true });
		}
	}

	renderPagination() {
		if (!this.pagination) {
			return;
		}

		this.pagination.innerHTML = '';
		this.paginationButtons = [];

		const fragment = document.createDocumentFragment();

		this.slides.forEach((_, index) => {
			const button = document.createElement('button');
			button.type = 'button';
			button.className = 'c-slider__pagination-button';
			button.setAttribute('aria-label', `スライド${index + 1}に移動`);
			button.dataset.sliderIndex = String(index);
			button.addEventListener('click', () => this.goToSlide(index));

			this.paginationButtons.push(button);
			fragment.appendChild(button);
		});

		this.pagination.appendChild(fragment);
	}

	updateSlides() {
		const translateX = -this.currentIndex * 100;
		this.track.style.transform = `translateX(${translateX}%)`;

		this.slides.forEach((slide, index) => {
			const isActive = index === this.currentIndex;
			slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
			slide.classList.toggle('is-active', isActive);
		});

		this.updatePagination();
		this.updateControlState();
	}

	goToPrev() {
		if (this.slides.length <= 1) {
			return;
		}

		if (this.currentIndex > 0) {
			this.currentIndex -= 1;
		} else {
			this.currentIndex = this.slides.length - 1;
		}

		this.updateSlides();
	}

	goToNext() {
		if (this.slides.length <= 1) {
			return;
		}

		if (this.currentIndex < this.slides.length - 1) {
			this.currentIndex += 1;
		} else {
			this.currentIndex = 0;
		}

		this.updateSlides();
	}

	goToSlide(index) {
		if (index < 0 || index >= this.slides.length) {
			return;
		}

		this.currentIndex = index;
		this.updateSlides();
	}

	handleKeydown(event) {
		if (KEYBOARD.prev.includes(event.key)) {
			event.preventDefault();
			this.goToPrev();
			return;
		}

		if (KEYBOARD.next.includes(event.key)) {
			event.preventDefault();
			this.goToNext();
		}
	}

	handleTouchStart(event) {
		this.touchStartX = event.changedTouches[0].clientX;
	}

	handleTouchEnd(event) {
		this.touchEndX = event.changedTouches[0].clientX;
		if (this.touchStartX === null || this.touchEndX === null) {
			return;
		}

		const deltaX = this.touchStartX - this.touchEndX;
		this.touchStartX = null;
		this.touchEndX = null;

		if (Math.abs(deltaX) < this.options.swipeThreshold) {
			return;
		}

		if (deltaX > 0) {
			this.goToNext();
		} else {
			this.goToPrev();
		}
	}

	updatePagination() {
		if (!this.paginationButtons.length) {
			return;
		}

		this.paginationButtons.forEach((button, index) => {
			const isActive = index === this.currentIndex;
			button.classList.toggle('is-active', isActive);
			if (isActive) {
				button.setAttribute('aria-current', 'true');
			} else {
				button.removeAttribute('aria-current');
			}
		});
	}

	updateControlState() {
		const atStart = this.currentIndex === 0;
		const atEnd = this.currentIndex === this.slides.length - 1;
		const multipleSlides = this.slides.length > 1;

		if (this.prevButton) {
			this.prevButton.disabled = !multipleSlides || atStart;
		}

		if (this.nextButton) {
			this.nextButton.disabled = !multipleSlides || atEnd;
		}
	}

	toggleControls(shouldShow) {
		const display = shouldShow ? '' : 'none';
		[this.prevButton, this.nextButton, this.pagination].forEach((element) => {
			if (element) {
				element.style.display = display;
			}
		});
	}

	reset() {
		this.currentIndex = 0;
		this.updateSlides();
	}

	destroy() {
		if (this.prevButton) {
			this.prevButton.removeEventListener('click', this.handlePrev);
		}

		if (this.nextButton) {
			this.nextButton.removeEventListener('click', this.handleNext);
		}

		if (this.track) {
			this.track.removeEventListener('touchstart', this.handleTouchStart);
			this.track.removeEventListener('touchend', this.handleTouchEnd);
		}

		this.root.removeEventListener('keydown', this.handleKeydown);
	}
}

const sliderInstances = new Map();

function ensureSliderInstance(element, options) {
	if (!sliderInstances.has(element)) {
		sliderInstances.set(element, new ImageSlider(element, options));
	}

	return sliderInstances.get(element);
}

function initSliders(root = document) {
	const scope = root instanceof HTMLElement ? root : document;
	scope.querySelectorAll('[data-slider]').forEach((slider) => ensureSliderInstance(slider));
}

let modalPatched = false;

function setupModalSliders(micromodal = typeof window !== 'undefined' ? window.MicroModal : undefined) {
	if (!micromodal || modalPatched) {
		return;
	}

	const originalShow = micromodal.show.bind(micromodal);

	micromodal.show = (modalId, options = {}) => {
		originalShow(modalId, options);

		const modalElement = document.getElementById(modalId);
		if (!modalElement) {
			return;
		}

		modalElement.querySelectorAll('[data-slider]').forEach((slider) => {
			const instance = sliderInstances.get(slider);
			if (instance) {
				instance.reset();
			} else {
				ensureSliderInstance(slider);
			}
		});
	};

	modalPatched = true;
}

let sliderObserver;

function observeDynamicSliders(target = document.body) {
	if (typeof MutationObserver === 'undefined' || !target) {
		return;
	}

	if (sliderObserver) {
		sliderObserver.disconnect();
	}

	sliderObserver = new MutationObserver((mutations) => {
		mutations.forEach((mutation) => {
			mutation.addedNodes.forEach((node) => {
				if (!(node instanceof HTMLElement)) {
					return;
				}

				if (typeof node.matches === 'function' && node.matches('[data-slider]')) {
					ensureSliderInstance(node);
				}

				node.querySelectorAll?.('[data-slider]').forEach((child) => ensureSliderInstance(child));
			});
		});
	});

	sliderObserver.observe(target, {
		childList: true,
		subtree: true
	});
}

function bootstrapSliders() {
	initSliders();
	setupModalSliders();
	observeDynamicSliders();
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', bootstrapSliders);
} else {
	bootstrapSliders();
}

export { ImageSlider, initSliders, sliderInstances, setupModalSliders };

