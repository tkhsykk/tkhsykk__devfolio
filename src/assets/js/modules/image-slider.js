/**
 * ImageLightbox
 * スライダー内の画像 → 画面中央のライトボックス表示を
 * cloneNode + transform だけで tween するコンポーネント
 *
 * 前提HTML例:
 *
 * <div class="c-lightbox" id="js-lightbox" hidden aria-hidden="true">
 * 	<div class="c-lightbox__backdrop" data-lightbox-backdrop>
 * 		<div class="c-lightbox__dialog" role="dialog" aria-modal="true" aria-label="画像の拡大表示">
 * 			<button type="button" class="c-lightbox__close" data-lightbox-close>閉じる</button>
 * 			<img class="c-lightbox__img" data-lightbox-image src="" alt="">
 * 		</div>
 * 	</div>
 * </div>
 *
 * 初期化例:
 * const lightbox = new ImageLightbox({
 * 	modal: document.getElementById('js-lightbox'),
 * 	dialog: document.querySelector('#js-lightbox .c-lightbox__dialog'),
 * 	modalImage: document.querySelector('[data-lightbox-image]'),
 * 	backdrop: document.querySelector('[data-lightbox-backdrop]'),
 * 	closeButton: document.querySelector('[data-lightbox-close]'),
 * 	// スライダーの track 要素（translateX を一時無効化するため）
 * 	getTrackForImage: (img) => img.closest('.c-slider__track')
 * });
 *
 * // スライダー側のクリックから呼び出す:
 * sliderRoot.addEventListener('click', (e) => {
 * 	const img = e.target.closest('img');
 * 	if (!img) return;
 * 	e.preventDefault();
 * 	lightbox.openFromImage(img);
 * });
 */
class ImageLightbox {
	constructor(options) {
		// 既存のHTML構造があるか確認
		let modal = options?.modal || document.getElementById('js-lightbox');

		// HTML構造が存在しない場合は動的に作成
		if (!modal) {
			modal = this._createModalStructure();
		}

		this.modal = modal;
		this.dialog = options?.dialog || modal.querySelector('.c-lightbox__dialog') || modal;
		this.modalImage = options?.modalImage || modal.querySelector('[data-lightbox-image]') || modal.querySelector('.c-lightbox__img');
		this.backdrop = options?.backdrop || modal.querySelector('[data-lightbox-backdrop]') || modal.querySelector('.c-lightbox__backdrop') || modal;
		this.closeButton = options?.closeButton || modal.querySelector('[data-lightbox-close]') || modal.querySelector('.c-lightbox__close');
		this.getTrackForImage = options?.getTrackForImage || null;

		this.isOpen = false;
		this.currentClone = null;
		this.sourceRect = null;
		this.targetRect = null;
		this.lastActiveElement = null;
		this.scrollY = 0;
		this.originalScrollBehavior = '';

		this._onKeyDown = this._onKeyDown.bind(this);
		this._onBackdropClick = this._onBackdropClick.bind(this);

		this._initEvents();
	}

	/**
	 * モーダル構造を動的に作成
	 * @private
	 */
	_createModalStructure() {
		const modal = document.createElement('div');
		modal.className = 'c-lightbox';
		modal.id = 'js-lightbox';
		modal.setAttribute('hidden', '');
		modal.setAttribute('aria-hidden', 'true');

		const backdrop = document.createElement('div');
		backdrop.className = 'c-lightbox__backdrop';
		backdrop.setAttribute('data-lightbox-backdrop', '');

		const dialog = document.createElement('div');
		dialog.className = 'c-lightbox__dialog';
		dialog.setAttribute('role', 'dialog');
		dialog.setAttribute('aria-modal', 'true');
		dialog.setAttribute('aria-label', '画像の拡大表示');

		const closeButton = document.createElement('button');
		closeButton.type = 'button';
		closeButton.className = 'c-lightbox__close';
		closeButton.setAttribute('data-lightbox-close', '');
		closeButton.setAttribute('aria-label', '閉じる');
		closeButton.innerHTML = `
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<line x1="18" y1="6" x2="6" y2="18"></line>
				<line x1="6" y1="6" x2="18" y2="18"></line>
			</svg>
		`;

		const img = document.createElement('img');
		img.className = 'c-lightbox__img';
		img.setAttribute('data-lightbox-image', '');

		dialog.appendChild(closeButton);
		dialog.appendChild(img);
		backdrop.appendChild(dialog);
		modal.appendChild(backdrop);

		document.body.appendChild(modal);

		return modal;
	}

	_initEvents() {
		if (this.backdrop) {
			this.backdrop.addEventListener('click', this._onBackdropClick);
		}
		if (this.closeButton) {
			this.closeButton.addEventListener('click', () => this.close());
		}
	}

	_onBackdropClick(e) {
		// ダイアログ外（バックドロップ）のクリックで閉じる
		if (e.target === this.backdrop) {
			this.close();
		}
	}

	_onKeyDown(e) {
		if (!this.isOpen) return;

		if (e.key === 'Escape') {
			e.preventDefault();
			e.stopPropagation(); // Lightboxが開いている時は、他のESCキーハンドラーに伝播させない
			this.close();
			return;
		}

		if (e.key === 'Tab') {
			this._trapFocus(e);
		}
	}

	_trapFocus(e) {
		const FOCUSABLE_SELECTOR = `
			a[href],
			area[href],
			input:not([disabled]),
			select:not([disabled]),
			textarea:not([disabled]),
			button:not([disabled]),
			iframe,
			object,
			embed,
			[tabindex]:not([tabindex="-1"]),
			[contenteditable]
		`;

		const focusable = Array.from(this.dialog.querySelectorAll(FOCUSABLE_SELECTOR))
			.filter((el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true');

		if (focusable.length === 0) {
			e.preventDefault();
			this.dialog.focus();
			return;
		}

		const first = focusable[0];
		const last = focusable[focusable.length - 1];
		const current = document.activeElement;

		if (e.shiftKey) {
			// Shift+Tab
			if (current === first || !this.dialog.contains(current)) {
				e.preventDefault();
				last.focus();
			}
		} else {
			// Tab
			if (current === last || !this.dialog.contains(current)) {
				e.preventDefault();
				first.focus();
			}
		}
	}

	/**
	 * img 要素からライトボックスを開く
	 * @param {HTMLImageElement} img
	 */
	openFromImage(img) {
		if (this.isOpen || !img) return;

		this.isOpen = true;
		this.lastActiveElement = document.activeElement;

		const rect = img.getBoundingClientRect();

		this.sourceRect = {
			left: rect.left,
			top: rect.top,
			width: rect.width,
			height: rect.height
		};

		// 目標位置（画面中央・最大 90%）を計算
		this.targetRect = this._computeTargetRect(img, this.sourceRect);

		// モーダル側の画像をセット
		const src = img.currentSrc || img.src;
		this.modalImage.src = src;
		if (img.hasAttribute('alt')) {
			this.modalImage.alt = img.alt;
		} else {
			this.modalImage.removeAttribute('alt');
		}

		// modalImage の初期状態を "即座に透明" に固定する（CSSに依存させない）
		this.modalImage.style.opacity = '0';
		this.modalImage.style.transition = 'none';

		// tween 用 clone を作成（閉じる時の真逆のロジック）
		const clone = img.cloneNode();
		clone.removeAttribute('id');
		clone.setAttribute('aria-hidden', 'true');

		const { left: sLeft, top: sTop, width: sWidth, height: sHeight } = this.sourceRect;
		const { left: tLeft, top: tTop, width: tWidth, height: tHeight } = this.targetRect;

		// 閉じる時と同じ構造：position は元の位置（sourceRect）
		clone.style.position = 'fixed';
		clone.style.left = sLeft + 'px';
		clone.style.top = sTop + 'px';
		clone.style.width = sWidth + 'px';
		clone.style.height = sHeight + 'px';
		clone.style.margin = '0';
		clone.style.zIndex = '2000';
		clone.style.transformOrigin = 'top left';
		clone.style.transform = 'translate3d(0, 0, 0) scale(1)'; // 初期状態：元の位置
		clone.style.willChange = 'transform, opacity';
		clone.style.transition = 'transform .2s cubic-bezier(.33,0,.67,1), opacity .2s cubic-bezier(.2, 0, .2, 1)';

		document.body.appendChild(clone);
		this.currentClone = clone;

		// 現在の scroll-behavior を退避し、強制的に auto に
		this.originalScrollBehavior = document.documentElement.style.scrollBehavior;
		document.documentElement.style.scrollBehavior = 'auto';

		// bodyスクロールをロック
		this.scrollY = window.scrollY || window.pageYOffset || 0;
		document.body.style.position = 'fixed';
		document.body.style.top = `-${this.scrollY}px`;
		document.body.style.left = '0';
		document.body.style.right = '0';
		document.body.style.width = '100%';

		// モーダルを表示準備
		this.modal.removeAttribute('hidden');
		this.modal.setAttribute('aria-hidden', 'false');
		this.modal.classList.add('is-opening');
		if (this.backdrop) {
			this.backdrop.style.opacity = '1';
		}

		document.addEventListener('keydown', this._onKeyDown, { passive: false });

		// 閉じる時と同じ計算式
		const scaleX = tWidth / sWidth;
		const scaleY = tHeight / sHeight;
		const translateX = tLeft - sLeft;
		const translateY = tTop - sTop;

		const onOpened = () => {
			clone.removeEventListener('transitionend', onOpened);

			// modalImage を clone と完全に同じ位置・サイズに合わせる（targetRect にピクセルぴったり）
			// ★ CSS に任せず、targetRect に固定し続ける（リセットしない）
			this.modalImage.style.position = 'fixed';
			this.modalImage.style.left = tLeft + 'px';
			this.modalImage.style.top = tTop + 'px';
			this.modalImage.style.width = tWidth + 'px';
			this.modalImage.style.height = tHeight + 'px';
			this.modalImage.style.margin = '0';
			this.modalImage.style.transform = 'none';
			this.modalImage.style.zIndex = '999';

			// clone 削除前に modalImage を表示状態にしておく（瞬時）
			this.modalImage.style.opacity = '1';

			// clone 削除（modalImage が先に表示されてから削除）を1フレーム後にずらす
			requestAnimationFrame(() => {
				if (this.currentClone) {
					this.currentClone.remove();
					this.currentClone = null;
				}
			});

			// モーダル本体を正式に open 状態へ
			this.modal.classList.remove('is-opening');
			this.modal.classList.add('is-open');

			// フォーカス移動
			if (this.closeButton) {
				this.closeButton.focus();
			} else {
				this.dialog.setAttribute('tabindex', '-1');
				this.dialog.focus();
			}
		};

		clone.addEventListener('transitionend', onOpened);

		// transform を目標地点（中央）へ：閉じる時の真逆
		// レイアウト確定を1回だけ挟み、次フレームでtransformを適用
		clone.getBoundingClientRect();
		requestAnimationFrame(() => {
			clone.style.transform = 'translate3d(' + translateX + 'px,' + translateY + 'px,0) scale(' + scaleX + ',' + scaleY + ')';
		});
	}

	/**
	 * 画面中央に収まるような targetRect を計算
	 */
	_computeTargetRect(img, sourceRect) {
		const viewportW = window.innerWidth;
		const viewportH = window.innerHeight;
		// PCでの過大スケールを抑えるため、絶対値でも上限を設ける
		const MAX_W = 1400;
		const MAX_H = 900;
		const maxW = Math.min(viewportW * 0.85, MAX_W);
		const maxH = Math.min(viewportH * 0.85, MAX_H);

		let naturalW = img.naturalWidth;
		let naturalH = img.naturalHeight;

		if (!naturalW || !naturalH) {
			// naturalSize が取れない場合は sourceRect ベース
			naturalW = sourceRect.width;
			naturalH = sourceRect.height;
		}

		const ratio = naturalW / naturalH;
		let targetW = maxW;
		let targetH = targetW / ratio;

		if (targetH > maxH) {
			targetH = maxH;
			targetW = targetH * ratio;
		}

		const left = (viewportW - targetW) / 2;
		const top = (viewportH - targetH) / 2;

		return {
			left,
			top,
			width: targetW,
			height: targetH
		};
	}

	/**
	 * ライトボックスを閉じる（元の位置へ tween 戻し）
	 */
	close() {
		if (!this.isOpen) return;

		this.isOpen = false;

		// すでに clone が生きていれば一旦消す
		if (this.currentClone) {
			this.currentClone.remove();
			this.currentClone = null;
		}

		// modalImage の実際の位置を取得（開く時に position: fixed で配置しているため）
		const currentRect = this.modalImage.getBoundingClientRect();
		const { left: tLeft, top: tTop, width: tWidth, height: tHeight } = currentRect;
		const { left: sLeft, top: sTop, width: sWidth, height: sHeight } = this.sourceRect;

		const clone = this.modalImage.cloneNode();
		clone.removeAttribute('id');
		clone.setAttribute('aria-hidden', 'true');

		clone.style.position = 'fixed';
		clone.style.left = tLeft + 'px';
		clone.style.top = tTop + 'px';
		clone.style.width = tWidth + 'px';
		clone.style.height = tHeight + 'px';
		clone.style.margin = '0';
		clone.style.zIndex = '2000';
		clone.style.transformOrigin = 'top left';
		clone.style.transform = 'translate3d(0, 0, 0) scale(1)'; // 初期状態：現在の位置

		clone.style.willChange = 'transform, opacity';
		clone.style.transition = 'transform .2s cubic-bezier(.33,0,.67,1), opacity .2s cubic-bezier(.2, 0, .2, 1)';

		document.body.appendChild(clone);
		this.currentClone = clone;

		this.backdrop.style.opacity = '0';

		// モーダル本体はフェードアウト扱いにして閉じる
		this.modal.classList.remove('is-open');
		this.modal.classList.add('is-closing');
		this.modal.setAttribute('aria-hidden', 'true');

		// キーボードイベント解除
		document.removeEventListener('keydown', this._onKeyDown);

		const scaleX = sWidth / tWidth;
		const scaleY = sHeight / tHeight;
		const translateX = sLeft - tLeft;
		const translateY = sTop - tTop;

		const onClosed = () => {
			clone.removeEventListener('transitionend', onClosed);

			// tween clone 削除
			if (this.currentClone) {
				this.currentClone.remove();
				this.currentClone = null;
			}

			// モーダル本体を完全に隠す
			this.modal.classList.remove('is-closing');
			this.modal.setAttribute('hidden', '');
			this.modal.setAttribute('aria-hidden', 'true');

			// フォーカスを元の要素に戻す
			if (this.lastActiveElement && typeof this.lastActiveElement.focus === 'function') {
				this.lastActiveElement.focus();
			}

			// bodyスクロールを復元
			document.body.style.position = '';
			document.body.style.top = '';
			document.body.style.left = '';
			document.body.style.right = '';
			document.body.style.width = '';
			window.scrollTo(0, this.scrollY || 0);

			// 次のフレームで scroll-behavior を元に戻す
			requestAnimationFrame(() => {
				document.documentElement.style.scrollBehavior = this.originalScrollBehavior;
			});
		};

		clone.addEventListener('transitionend', onClosed);

		// transform を元の sourceRect へ戻す
		// rAFを2回噛ませて初期レイアウト確定後に移動させる
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				clone.style.transform = 'translate3d(' + translateX + 'px,' + translateY + 'px,0) scale(' + scaleX + ',' + scaleY + ')';
			});
		});
	}
}

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
	// 共有のImageLightboxインスタンス（全スライダーで共有）
	static sharedLightbox = null;

	constructor(element, options = {}) {
		this.root = element;
		this.options = { ...SLIDER_DEFAULTS, ...options };
		this.track = element.querySelector(this.options.trackSelector);
		this.slides = Array.from(element.querySelectorAll(this.options.slideSelector));
		this.slideCount = this.slides.length;
		this.prevButton = element.querySelector(this.options.prevSelector);
		this.nextButton = element.querySelector(this.options.nextSelector);
		this.pagination = element.querySelector(this.options.paginationSelector);
		this.paginationButtons = [];

		this.currentIndex = 0;
		this.touchStartX = null;
		this.touchEndX = null;
		this.focusTrapElements = [];

		// 共有のImageLightboxインスタンスを初期化（初回のみ）
		if (!ImageSlider.sharedLightbox) {
			ImageSlider.sharedLightbox = new ImageLightbox({
				getTrackForImage: (img) => img.closest('.c-slider__track')
			});
		}

		this.handlePrev = this.goToPrev.bind(this);
		this.handleNext = this.goToNext.bind(this);
		this.handleKeydown = this.handleKeydown.bind(this);
		this.handleTouchStart = this.handleTouchStart.bind(this);
		this.handleTouchEnd = this.handleTouchEnd.bind(this);
		this.handleImageLinkClick = this.handleImageLinkClick.bind(this);

		this.init();
	}

	init() {
		if (!this.track || this.slideCount === 0) {
			return;
		}

		if (!this.root.hasAttribute('tabindex')) {
			this.root.setAttribute('tabindex', '0');
		}
		this.root.setAttribute('role', 'region');
		this.root.setAttribute('aria-roledescription', 'carousel');

		// aria-liveでスライド変更を通知
		if (!this.root.querySelector('[aria-live]')) {
			const liveRegion = document.createElement('div');
			liveRegion.setAttribute('aria-live', 'polite');
			liveRegion.setAttribute('aria-atomic', 'true');
			liveRegion.className = 'sr-only';
			liveRegion.style.cssText = 'position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border-width: 0;';
			this.root.appendChild(liveRegion);
			this.liveRegion = liveRegion;
		}

		this.bindEvents();

		if (this.slideCount <= 1) {
			this.toggleControls(false);
			this.updateSlides();
			return;
		}

		this.toggleControls(true);
		this.renderPagination();
		this.updateSlides();
	}

	bindEvents() {
		if (this.slideCount > 1 && this.prevButton) {
			this.prevButton.addEventListener('click', this.handlePrev);
		}

		if (this.slideCount > 1 && this.nextButton) {
			this.nextButton.addEventListener('click', this.handleNext);
		}

		if (this.slideCount > 1) {
			this.root.addEventListener('keydown', this.handleKeydown);
		}

		if (this.track) {
			if (this.slideCount > 1) {
				this.track.addEventListener('touchstart', this.handleTouchStart, { passive: true });
				this.track.addEventListener('touchend', this.handleTouchEnd, { passive: true });
			}
			// イベント委譲で画像リンクのクリックを処理
			this.track.addEventListener('click', this.handleImageLinkClick);
		}

		// 画像リンクの初期設定
		this.setupImageLinks();
		// GPUレイヤーの事前ウォームアップ（PC hover時のみ効く）
		this.prewarmImages();
	}

	/**
	 * 画像リンクのクリックイベントハンドラー（イベント委譲）
	 * @param {Event} e - クリックイベント
	 * @private
	 */
	handleImageLinkClick(e) {
		const link = e.target.closest('a');
		if (!link) return;

		const slide = link.closest('.c-slider__slide');
		if (!slide || !this.slides.includes(slide)) return;

		const img = link.querySelector('img');
		if (!img) return;

		// リンクのデフォルト動作のみ防止（他のイベントハンドラーには影響しない）
		e.preventDefault();

		// ImageLightboxを使用して拡大表示
		ImageSlider.sharedLightbox.openFromImage(img);
	}

	/**
	 * スライド内の画像リンクを設定
	 * @description 画像が`<a>`タグで囲まれている場合、カーソルスタイルを設定
	 * @private
	 */
	setupImageLinks() {
		this.slides.forEach((slide) => {
			const link = slide.querySelector('a');
			const img = slide.querySelector('img');

			if (link && img) {
				// カーソルをポインターに変更（視覚的なフィードバック）
				link.style.cursor = 'zoom-in';
			}
		});
	}

	/**
	 * 画像のGPUレイヤー化を事前に促す
	 * @private
	 */
	prewarmImages() {
		this.slides.forEach((slide) => {
			const img = slide.querySelector('img');
			if (!img) return;
			const handler = () => {
				img.style.willChange = 'transform';
				img.removeEventListener('pointerenter', handler);
			};
			img.addEventListener('pointerenter', handler, { once: true });
		});
	}

	// openLightboxWithImage, setupFocusTrap, showModalWithImage, closeLightbox, closeLightboxSimple, openLightbox, animateImageExpand は
	// ImageLightboxクラスに統合されたため削除されました

	/**
	 * ページネーションをレンダリング
	 * @private
	 */
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
		const len = this.slideCount;
		const translateX = -this.currentIndex * 100;

		if (this.track) {
			this.track.style.transform = `translateX(${translateX}%)`;
		}

		this.slides.forEach((slide, index) => {
			const isActive = index === this.currentIndex;
			slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
			slide.classList.toggle('is-active', isActive);

			if (isActive) {
				this.loadSlideMedia(slide);
			}
		});

		this.updatePagination();
		this.updateControlState();

		// スクリーンリーダーにスライド変更を通知
		if (this.liveRegion) {
			const currentSlide = this.slides[this.currentIndex];
			const slideLabel = currentSlide.querySelector('img')?.alt || `スライド${this.currentIndex + 1}`;
			this.liveRegion.textContent = `${slideLabel}、${this.currentIndex + 1}枚目 / 全${len}枚`;
		}
	}

	loadSlideMedia(slide) {
		if (!slide) return;

		const picture = slide.querySelector('picture');

		if (picture && !picture.dataset.loaded) {
			const source = picture.querySelector('source[data-srcset]');
			const img = picture.querySelector('img[data-src]');

			if (source) {
				source.srcset = source.dataset.srcset;
			}

			if (img) {
				img.src = img.dataset.src;
			}

			picture.dataset.loaded = 'true';
			return;
		}
	}

	goToPrev() {
		if (this.slideCount <= 1) {
			return;
		}

		if (this.currentIndex > 0) {
			this.currentIndex -= 1;
		} else {
			this.currentIndex = this.slideCount - 1;
		}
		this.updateSlides();
	}

	goToNext() {
		if (this.slideCount <= 1) {
			return;
		}

		if (this.currentIndex < this.slideCount - 1) {
			this.currentIndex += 1;
		} else {
			this.currentIndex = 0;
		}
		this.updateSlides();
	}

	goToSlide(index) {
		if (index < 0 || index >= this.slideCount) {
			return;
		}
		this.currentIndex = index;
		this.updateSlides();
	}

	updatePagination() {
		if (!this.pagination || this.paginationButtons.length === 0) {
			return;
		}

		this.paginationButtons.forEach((button, index) => {
			const isActive = index === this.currentIndex;
			button.classList.toggle('is-active', isActive);
			button.setAttribute('aria-current', isActive ? 'true' : 'false');
		});
	}

	updateControlState() {
		if (this.prevButton) {
			const disabled = this.slideCount <= 1;
			this.prevButton.disabled = disabled;
			this.prevButton.setAttribute('aria-disabled', String(disabled));
		}
		if (this.nextButton) {
			const disabled = this.slideCount <= 1;
			this.nextButton.disabled = disabled;
			this.nextButton.setAttribute('aria-disabled', String(disabled));
		}
	}

	toggleControls(show) {
		if (this.prevButton) {
			this.prevButton.style.display = show ? '' : 'none';
		}
		if (this.nextButton) {
			this.nextButton.style.display = show ? '' : 'none';
		}
		if (this.pagination) {
			this.pagination.style.display = show ? '' : 'none';
		}
	}

	handleKeydown(e) {
		if (this.slideCount <= 1) {
			return;
		}

		if (KEYBOARD.prev.includes(e.key)) {
			e.preventDefault();
			this.goToPrev();
		} else if (KEYBOARD.next.includes(e.key)) {
			e.preventDefault();
			this.goToNext();
		}
	}

	handleTouchStart(e) {
		this.touchStartX = e.touches[0].clientX;
	}

	handleTouchEnd(e) {
		if (this.touchStartX === null) {
			return;
		}

		this.touchEndX = e.changedTouches[0].clientX;
		const diff = this.touchStartX - this.touchEndX;

		if (Math.abs(diff) > this.options.swipeThreshold) {
			if (diff > 0) {
				this.goToNext();
			} else {
				this.goToPrev();
			}
		}

		this.touchStartX = null;
		this.touchEndX = null;
	}

	/**
	 * スライダーを最初のスライドにリセット
	 * @public
	 */
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
		this.root.removeEventListener('keydown', this.handleKeydown);
		if (this.track) {
			this.track.removeEventListener('touchstart', this.handleTouchStart);
			this.track.removeEventListener('touchend', this.handleTouchEnd);
			this.track.removeEventListener('click', this.handleImageLinkClick);
		}
		this.paginationButtons.forEach((button) => {
			button.removeEventListener('click', () => this.goToSlide(parseInt(button.dataset.sliderIndex)));
		});
	}
}

// エクスポート（setupModalSlidersとinitSlidersも含む）

const sliderInstances = new Map();

function ensureSliderInstance(element, options = {}) {
	if (!sliderInstances.has(element)) {
		sliderInstances.set(element, new ImageSlider(element, options));
	}
	return sliderInstances.get(element);
}

function initSliders(root = document) {
	const scope = root instanceof HTMLElement ? root : document;
	scope.querySelectorAll('[data-slider]').forEach((slider) => ensureSliderInstance(slider));
}

let modalObserver = null;

/**
 * MicroModalの表示を監視してスライダーを初期化（安全な実装）
 * MicroModalのメソッドを直接上書きせず、MutationObserverで監視
 * @param {Object} micromodal - MicroModalインスタンス（使用しないが互換性のため残す）
 */
function setupModalSliders(micromodal = typeof window !== 'undefined' ? window.MicroModal : undefined) {
	if (modalObserver) {
		return; // 既に初期化済み
	}

	/**
	 * モーダル内のスライダーを初期化
	 * @param {HTMLElement} modalElement - モーダル要素
	 */
	const initSlidersInModal = (modalElement) => {
		if (!modalElement) {
			return;
		}

		requestAnimationFrame(() => {
			modalElement.querySelectorAll('[data-slider]').forEach((slider) => {
				const instance = sliderInstances.get(slider);
				if (instance) {
					instance.reset();
				} else {
					ensureSliderInstance(slider);
				}
			});
		});
	};

	// MutationObserverでモーダルの表示を監視（MicroModalの実装に依存しない）
	if (typeof MutationObserver !== 'undefined') {
		modalObserver = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				// aria-hidden属性の変更を監視
				if (mutation.type === 'attributes' && mutation.attributeName === 'aria-hidden') {
					const modalElement = mutation.target;
					if (modalElement instanceof HTMLElement && modalElement.id?.startsWith('modal-')) {
						const isHidden = modalElement.getAttribute('aria-hidden') === 'true';
						if (!isHidden) {
							// モーダルが開いた時
							initSlidersInModal(modalElement);
						}
					}
				}
			});
		});

		// 既存のモーダル要素を監視対象に追加
		document.querySelectorAll('[id^="modal-"]').forEach((modal) => {
			modalObserver.observe(modal, {
				attributes: true,
				attributeFilter: ['aria-hidden']
			});
		});
	}
}

function bootstrapSliders() {
	initSliders();
	if (typeof window !== 'undefined' && window.MicroModal) {
		setupModalSliders(window.MicroModal);
	}
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', bootstrapSliders);
} else {
	bootstrapSliders();
}

export { ImageSlider, ImageLightbox, initSliders, sliderInstances, setupModalSliders };
