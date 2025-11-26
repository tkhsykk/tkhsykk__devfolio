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
		this.activeLightbox = null;
		this.focusTrapElements = [];

		this.handlePrev = this.goToPrev.bind(this);
		this.handleNext = this.goToNext.bind(this);
		this.handleKeydown = this.handleKeydown.bind(this);
		this.handleTouchStart = this.handleTouchStart.bind(this);
		this.handleTouchEnd = this.handleTouchEnd.bind(this);
		this.handleImageLinkClick = this.handleImageLinkClick.bind(this);

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
			// イベント委譲で画像リンクのクリックを処理
			this.track.addEventListener('click', this.handleImageLinkClick);
		}

		// 画像リンクの初期設定
		this.setupImageLinks();
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

		// 元の画像要素をそのまま拡大表示
		this.openLightboxWithImage(img, link);
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
	 * 元の画像をそのまま拡大表示するライトボックスを開く（cloneNode方式）
	 * @param {HTMLImageElement} img - 拡大表示する画像要素
	 * @param {HTMLElement} link - 画像を囲むリンク要素
	 * @private
	 */
	openLightboxWithImage(img, link) {
		// 既存のライトボックスを削除
		if (this.activeLightbox) {
			this.closeLightbox(this.activeLightbox);
			return;
		}

		// フォーカスを保存（閉じた時に戻すため）
		this.previousFocus = document.activeElement;

		// ① trackのtransformを外す
		const track = img.closest('.c-slider__track');
		const prevTransform = track ? track.style.transform : null;
		if (track) {
			track.style.transform = 'none';
		}

		// ② rectを正確に取得（transform無効化後の正しいviewport座標）
		const rect = img.getBoundingClientRect();
		const { left, top, width, height } = rect;
		const sourceRect = {
			left,
			top,
			width,
			height
		};

		// ③ transformを元に戻す
		if (track) {
			track.style.transform = prevTransform;
		}

		// ④ cloneを作成してrectに完全一致させて配置
		const clone = img.cloneNode(true);
		clone.style.position = 'fixed';
		clone.style.left = `${left}px`;
		clone.style.top = `${top}px`;
		clone.style.width = `${width}px`;
		clone.style.height = `${height}px`;
		clone.style.margin = '0';
		clone.style.zIndex = '9999';
		clone.style.transformOrigin = 'top left'; // 必須：object-fit/aspect-ratioの影響を避ける
		clone.style.transform = 'translate(0, 0) scale(1)';
		clone.style.willChange = 'transform';
		clone.setAttribute('aria-hidden', 'true');
		clone.classList.add('lightbox-clone');
		document.body.appendChild(clone);

		// ⑤ append後、強制reflow（必須）
		clone.getBoundingClientRect();

		// ライトボックス要素を作成（overlayは後で表示）
		const lightbox = document.createElement('div');
		lightbox.className = 'c-lightbox';
		lightbox.setAttribute('role', 'dialog');
		lightbox.setAttribute('aria-modal', 'true');
		lightbox.setAttribute('aria-label', '画像拡大表示');

		lightbox.style.cssText = `
			position: fixed !important;
			top: 0 !important;
			left: 0 !important;
			width: 100% !important;
			height: 100% !important;
			z-index: 10000 !important;
			opacity: 0;
			visibility: hidden;
			transition: opacity 0.3s ease, visibility 0.3s ease;
			pointer-events: none;
		`;

		const overlay = document.createElement('div');
		overlay.className = 'c-lightbox__overlay';
		overlay.style.cssText = `
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.9);
			cursor: pointer;
			opacity: 0;
			transition: opacity 0.3s ease;
		`;

		const closeButton = document.createElement('button');
		closeButton.className = 'c-lightbox__close';
		closeButton.setAttribute('aria-label', '閉じる');
		closeButton.style.cssText = `
			position: fixed;
			top: 20px;
			right: 20px;
			width: 48px;
			height: 48px;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: rgba(255, 255, 255, 0.9);
			border: none;
			border-radius: 50%;
			cursor: pointer;
			padding: 0;
			z-index: 10001;
			opacity: 0;
			transition: opacity 0.3s ease, transform 0.2s ease;
		`;
		closeButton.innerHTML = `
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<line x1="18" y1="6" x2="6" y2="18"></line>
				<line x1="6" y1="6" x2="18" y2="18"></line>
			</svg>
		`;

		lightbox.appendChild(overlay);
		lightbox.appendChild(closeButton);

		// bodyに追加（ただしoverlayはまだ非表示）
		if (document.body) {
			document.body.appendChild(lightbox);
		} else {
			document.documentElement.appendChild(lightbox);
		}

		// ⑥ 目標位置（中央の原寸画像）のtransformを計算
		const targetW = window.innerWidth * 0.9;
		const targetH = window.innerHeight * 0.9;
		const targetLeft = (window.innerWidth - targetW) / 2;
		const targetTop = (window.innerHeight - targetH) / 2;

		const scaleX = targetW / width;
		const scaleY = targetH / height;
		const scale = Math.min(scaleX, scaleY); // アスペクト比を維持

		const finalWidth = width * scale;
		const finalHeight = height * scale;
		const finalLeft = (window.innerWidth - finalWidth) / 2;
		const finalTop = (window.innerHeight - finalHeight) / 2;

		const translateX = finalLeft - left;
		const translateY = finalTop - top;

		// ⑦ transformアニメーション開始（transitionを使用）
		clone.style.transition = 'transform 0.3s cubic-bezier(0.33, 0, 0.67, 1)';

		// アニメーション開始（requestAnimationFrameで確実に反映）
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				clone.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
			});
		});

		// ⑧ cloneのアニメ終了後にoverlayを表示（transitionendを使用）
		let overlayShown = false;
		const handleTransitionEnd = () => {
			if (overlayShown) return;
			overlayShown = true;

			// overlayを表示
			requestAnimationFrame(() => {
				lightbox.style.opacity = '1';
				lightbox.style.visibility = 'visible';
				lightbox.style.pointerEvents = 'auto';
				overlay.style.opacity = '1';
				closeButton.style.opacity = '1';
			});

			// 本物のLightbox画像を表示
			this.showModalWithImage(img, lightbox, overlay, closeButton, sourceRect);

			// cloneを削除
			clone.remove();

			// イベントリスナーを削除
			clone.removeEventListener('transitionend', handleTransitionEnd);
		};

		clone.addEventListener('transitionend', handleTransitionEnd, { once: true });

		// 参照を保存（クローンアニメーション用）
		lightbox._clone = clone;
		lightbox._sourceRect = sourceRect;

		// 閉じる処理
		const closeLightbox = () => {
			this.closeLightbox(lightbox, img, sourceRect);
		};

		// イベントリスナー
		closeButton.addEventListener('click', closeLightbox);
		overlay.addEventListener('click', closeLightbox);

		// ESCキーで閉じる
		const handleEscape = (e) => {
			if (e.key === 'Escape') {
				closeLightbox();
				document.removeEventListener('keydown', handleEscape);
			}
		};
		document.addEventListener('keydown', handleEscape);

		// 参照を保存
		lightbox._originalImg = img;
		lightbox._sourceRect = sourceRect;
		lightbox._handleEscape = handleEscape;
		lightbox._previousFocus = this.previousFocus;
		lightbox._clone = clone;

		// アクティブなライトボックスとして保存
		this.activeLightbox = lightbox;

		// フォーカストラップの設定
		this.setupFocusTrap(lightbox);

		// 閉じるボタンにフォーカスを移動
		requestAnimationFrame(() => {
			closeButton.focus();
		});
	}

	/**
	 * フォーカストラップの設定（W3C仕様に基づく包括的な実装）
	 * @param {HTMLElement} lightbox - ライトボックス要素
	 * @private
	 */
	setupFocusTrap(lightbox) {
		// W3C仕様に基づく包括的なフォーカス可能要素セレクタ
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
		`.replace(/\s+/g, ' ').trim();

		lightbox.addEventListener('keydown', (e) => {
			if (e.key !== 'Tab') return;

			// 毎回フォーカス可能な要素を取得（動的UIに対応）
			const focusable = lightbox.querySelectorAll(FOCUSABLE_SELECTOR);
			if (focusable.length === 0) {
				// フォーカス可能な要素がない場合はデフォルト動作を許可
				return;
			}

			const first = focusable[0];
			const last = focusable[focusable.length - 1];

			// Shift + Tab（逆方向）
			if (e.shiftKey) {
				if (document.activeElement === first) {
					e.preventDefault();
					last.focus();
				}
			}
			// Tab（順方向）
			else {
				if (document.activeElement === last) {
					e.preventDefault();
					first.focus();
				}
			}
		});
	}

	/**
	 * ライトボックス内に本物の画像を表示
	 * @param {HTMLImageElement} img - 画像要素
	 * @param {HTMLElement} lightbox - ライトボックス要素
	 * @param {HTMLElement} overlay - オーバーレイ要素
	 * @param {HTMLElement} closeButton - 閉じるボタン
	 * @param {Object} sourceRect - 元の位置とサイズ
	 * @private
	 */
	showModalWithImage(img, lightbox, overlay, closeButton, sourceRect) {
		// 本物の画像をライトボックス内に表示
		const content = document.createElement('div');
		content.className = 'c-lightbox__content';
		content.style.cssText = `
			position: relative;
			max-width: 90vw;
			max-height: 90vh;
			display: flex;
			align-items: center;
			justify-content: center;
			z-index: 1;
		`;

		const displayImg = img.cloneNode(true);
		displayImg.className = 'c-lightbox__image';
		displayImg.style.cssText = `
			max-width: 100%;
			max-height: 90vh;
			width: auto;
			height: auto;
			object-fit: contain;
			border-radius: 4px;
			box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
		`;

		content.appendChild(displayImg);
		lightbox.insertBefore(content, closeButton);

		// 参照を保存
		lightbox._displayImg = displayImg;
		lightbox._content = content;
	}

	/**
	 * ライトボックスを閉じる（ステップ5: 逆再生で戻す）
	 * @param {HTMLElement} lightbox - ライトボックス要素
	 * @param {HTMLImageElement} img - 画像要素
	 * @param {Object} sourceRect - 元の位置とサイズ
	 * @private
	 */
	closeLightbox(lightbox, img = null, sourceRect = null) {
		if (!img) img = lightbox._originalImg;
		if (!sourceRect) sourceRect = lightbox._sourceRect;

		// 表示中の画像を取得
		const displayImg = lightbox._displayImg || lightbox.querySelector('.c-lightbox__image');
		if (!displayImg) {
			// 画像がない場合は通常の閉じる処理
			this.closeLightboxSimple(lightbox);
			return;
		}

		// ステップ5: クローンを作成して逆再生
		const rect = displayImg.getBoundingClientRect();
		const clone = displayImg.cloneNode(true);
		clone.style.position = 'fixed';
		clone.style.left = `${rect.left}px`;
		clone.style.top = `${rect.top}px`;
		clone.style.width = `${rect.width}px`;
		clone.style.height = `${rect.height}px`;
		clone.style.margin = '0';
		clone.style.zIndex = '9999';
		clone.style.transformOrigin = 'left top';
		clone.classList.add('lightbox-clone');
		document.body.appendChild(clone);

		// 表示中の画像を非表示
		if (lightbox._content) {
			lightbox._content.style.opacity = '0';
		}

		// ライトボックスを非表示
		lightbox.style.opacity = '0';
		lightbox.style.visibility = 'hidden';
		lightbox.style.pointerEvents = 'none';
		const overlay = lightbox.querySelector('.c-lightbox__overlay');
		if (overlay) {
			overlay.style.opacity = '0';
		}
		if (lightbox.querySelector('.c-lightbox__close')) {
			lightbox.querySelector('.c-lightbox__close').style.opacity = '0';
		}

		// 逆再生アニメーション
		const targetW = window.innerWidth * 0.9;
		const targetH = window.innerHeight * 0.9;
		const scaleX = targetW / sourceRect.width;
		const scaleY = targetH / sourceRect.height;
		const scale = Math.min(scaleX, scaleY);

		const finalWidth = sourceRect.width * scale;
		const finalHeight = sourceRect.height * scale;
		const finalLeft = (window.innerWidth - finalWidth) / 2;
		const finalTop = (window.innerHeight - finalHeight) / 2;

		const translateX = finalLeft - rect.left;
		const translateY = finalTop - rect.top;
		const reverseTranslateX = sourceRect.left - finalLeft;
		const reverseTranslateY = sourceRect.top - finalTop;
		const reverseScale = 1 / scale;

		const animation = clone.animate([
			{
				transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`
			},
			{
				transform: `translate(${reverseTranslateX}px, ${reverseTranslateY}px) scale(${reverseScale})`
			}
		], {
			duration: 300,
			easing: 'cubic-bezier(0.33, 0, 0.67, 1)'
		});

		// アニメーション完了後にクリーンアップ
		animation.addEventListener('finish', () => {
			clone.remove();
			this.closeLightboxSimple(lightbox);
		});
	}

	/**
	 * ライトボックスのクリーンアップ（シンプル版）
	 * @param {HTMLElement} lightbox - ライトボックス要素
	 * @private
	 */
	closeLightboxSimple(lightbox) {
		// ESCキーのイベントリスナーを削除
		if (lightbox && lightbox._handleEscape) {
			document.removeEventListener('keydown', lightbox._handleEscape);
		}

		// ライトボックスを削除
		if (lightbox && lightbox.parentElement) {
			lightbox.remove();
		}

		// 元のフォーカス位置に戻す
		if (lightbox && lightbox._previousFocus && typeof lightbox._previousFocus.focus === 'function') {
			lightbox._previousFocus.focus();
		}

		// アクティブなライトボックスを解除
		if (this.activeLightbox === lightbox) {
			this.activeLightbox = null;
		}
	}

	/**
	 * ライトボックスを開く（旧実装、後方互換性のため残す）
	 * @param {string} imageUrl - 画像のURL
	 * @param {string} alt - 画像のaltテキスト
	 * @param {Object} sourceRect - 元の画像の位置とサイズ {left, top, width, height}
	 * @private
	 */
	openLightbox(imageUrl, alt, sourceRect = null) {
		// 既存のライトボックスを削除
		const existingLightbox = document.querySelector('.c-lightbox');
		if (existingLightbox) {
			existingLightbox.remove();
		}

		// ライトボックス要素を作成
		const lightbox = document.createElement('div');
		lightbox.className = 'c-lightbox';
		lightbox.setAttribute('role', 'dialog');
		lightbox.setAttribute('aria-modal', 'true');
		lightbox.setAttribute('aria-label', '画像拡大表示');

		// インラインスタイルで確実に固定位置を設定
		lightbox.style.cssText = `
			position: fixed !important;
			top: 0 !important;
			left: 0 !important;
			width: 100% !important;
			height: 100% !important;
			z-index: 10000 !important;
			display: flex !important;
			align-items: center !important;
			justify-content: center !important;
			opacity: 0;
			visibility: hidden;
			transition: opacity 0.3s ease, visibility 0.3s ease;
			pointer-events: none;
		`;

		const overlay = document.createElement('div');
		overlay.className = 'c-lightbox__overlay';
		overlay.style.position = 'absolute';
		overlay.style.top = '0';
		overlay.style.left = '0';
		overlay.style.width = '100%';
		overlay.style.height = '100%';
		overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
		overlay.style.cursor = 'pointer';

		const content = document.createElement('div');
		content.className = 'c-lightbox__content';
		content.style.position = 'relative';
		content.style.maxWidth = '90vw';
		content.style.maxHeight = '90vh';
		content.style.display = 'flex';
		content.style.alignItems = 'center';
		content.style.justifyContent = 'center';
		content.style.zIndex = '1';

		const closeButton = document.createElement('button');
		closeButton.className = 'c-lightbox__close';
		closeButton.setAttribute('aria-label', '閉じる');
		closeButton.innerHTML = `
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<line x1="18" y1="6" x2="6" y2="18"></line>
				<line x1="6" y1="6" x2="18" y2="18"></line>
			</svg>
		`;

		const img = document.createElement('img');
		img.src = imageUrl;
		img.alt = alt;
		img.className = 'c-lightbox__image';
		img.style.maxWidth = '100%';
		img.style.maxHeight = '90vh';
		img.style.width = 'auto';
		img.style.height = 'auto';
		img.style.objectFit = 'contain';
		img.style.borderRadius = '4px';
		img.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.5)';

		content.appendChild(closeButton);
		content.appendChild(img);
		lightbox.appendChild(overlay);
		lightbox.appendChild(content);

		// 画像の読み込みを待ってからアニメーション開始
		img.onload = () => {
			this.animateImageExpand(img, sourceRect);
		};

		// 既に読み込まれている場合
		if (img.complete) {
			requestAnimationFrame(() => {
				this.animateImageExpand(img, sourceRect);
			});
		}

		// bodyの直下に追加（確実に最上位に配置）
		if (document.body) {
			document.body.appendChild(lightbox);
		} else {
			// bodyがまだない場合はdocumentElementに追加
			document.documentElement.appendChild(lightbox);
		}

		// ライトボックスを表示（画像のアニメーションは別途処理）
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				lightbox.classList.add('is-open');
				lightbox.style.opacity = '1';
				lightbox.style.visibility = 'visible';
				lightbox.style.pointerEvents = 'auto';
			});
		});

		// 画像のアニメーション用に参照を保存
		lightbox._lightboxImg = img;
		lightbox._sourceRect = sourceRect;

		// 閉じる処理
		const closeLightbox = () => {
			// 画像を元の位置に戻すアニメーション
			if (lightbox._lightboxImg && lightbox._sourceRect) {
				const img = lightbox._lightboxImg;
				const sourceRect = lightbox._sourceRect;

				const viewportWidth = window.innerWidth;
				const viewportHeight = window.innerHeight;
				const maxWidth = Math.min(viewportWidth * 0.9, img.naturalWidth);
				const maxHeight = Math.min(viewportHeight * 0.9, img.naturalHeight);

				const aspectRatio = img.naturalWidth / img.naturalHeight;
				let finalWidth = maxWidth;
				let finalHeight = maxWidth / aspectRatio;

				if (finalHeight > maxHeight) {
					finalHeight = maxHeight;
					finalWidth = maxHeight * aspectRatio;
				}

				const finalLeft = (viewportWidth - finalWidth) / 2;
				const finalTop = (viewportHeight - finalHeight) / 2;

				// 元の位置へ戻す（中心点基準）
				const scaleX = sourceRect.width / finalWidth;
				const scaleY = sourceRect.height / finalHeight;
				const translateX = sourceRect.left + sourceRect.width / 2 - (finalLeft + finalWidth / 2);
				const translateY = sourceRect.top + sourceRect.height / 2 - (finalTop + finalHeight / 2);

				img.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease';
				img.style.opacity = '0';
				img.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`;
			}

			lightbox.classList.remove('is-open');
			lightbox.style.opacity = '0';
			lightbox.style.visibility = 'hidden';
			lightbox.style.pointerEvents = 'none';
			setTimeout(() => {
				lightbox.remove();
			}, 400);
		};

		// イベントリスナー
		lightbox.querySelector('.c-lightbox__close').addEventListener('click', closeLightbox);
		lightbox.querySelector('.c-lightbox__overlay').addEventListener('click', closeLightbox);

		// ESCキーで閉じる
		const handleEscape = (e) => {
			if (e.key === 'Escape') {
				closeLightbox();
				document.removeEventListener('keydown', handleEscape);
			}
		};
		document.addEventListener('keydown', handleEscape);

		// クリーンアップ
		lightbox.addEventListener('transitionend', () => {
			if (!lightbox.classList.contains('is-open')) {
				document.removeEventListener('keydown', handleEscape);
			}
		}, { once: true });
	}

	/**
	 * 画像の拡大アニメーション
	 * @param {HTMLImageElement} img - アニメーション対象の画像要素
	 * @param {Object} sourceRect - 元の画像の位置とサイズ
	 * @param {Object} originalStyles - 元のスタイル（復元用）
	 * @private
	 */
	animateImageExpand(img, sourceRect, originalStyles = null) {
		if (!sourceRect) {
			// ソース位置がない場合は通常のフェードイン
			img.style.opacity = '1';
			return;
		}

		// 画像の最終的なサイズを計算
		const viewportWidth = window.innerWidth;
		const viewportHeight = window.innerHeight;

		// 画像の実際のサイズを取得（読み込まれていない場合は現在の表示サイズから推定）
		const imgNaturalWidth = img.naturalWidth || img.width || sourceRect.width;
		const imgNaturalHeight = img.naturalHeight || img.height || sourceRect.height;
		const aspectRatio = imgNaturalWidth / imgNaturalHeight;

		const maxWidth = Math.min(viewportWidth * 0.9, imgNaturalWidth);
		const maxHeight = Math.min(viewportHeight * 0.9, imgNaturalHeight);

		let finalWidth = maxWidth;
		let finalHeight = maxWidth / aspectRatio;

		if (finalHeight > maxHeight) {
			finalHeight = maxHeight;
			finalWidth = maxHeight * aspectRatio;
		}

		// 中央位置を計算
		const finalLeft = (viewportWidth - finalWidth) / 2;
		const finalTop = (viewportHeight - finalHeight) / 2;

		// transformのみを使用してアニメーション（パフォーマンス最適化）
		// 元の位置とサイズから最終位置とサイズへの変換を計算
		const sourceCenterX = sourceRect.left + sourceRect.width / 2;
		const sourceCenterY = sourceRect.top + sourceRect.height / 2;
		const finalCenterX = finalLeft + finalWidth / 2;
		const finalCenterY = finalTop + finalHeight / 2;

		// 中心点からの移動距離
		const translateX = finalCenterX - sourceCenterX;
		const translateY = finalCenterY - sourceCenterY;

		// 縮小率を計算（アスペクト比を維持）
		const scaleX = finalWidth / sourceRect.width;
		const scaleY = finalHeight / sourceRect.height;
		const scale = Math.min(scaleX, scaleY);

		// アニメーション開始（transformのみ）
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				img.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease';
				img.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
				img.style.pointerEvents = 'auto';
			});
		});
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

		// スクリーンリーダーにスライド変更を通知
		if (this.liveRegion) {
			const currentSlide = this.slides[this.currentIndex];
			const slideLabel = currentSlide.querySelector('img')?.alt || `スライド${this.currentIndex + 1}`;
			this.liveRegion.textContent = `${slideLabel}、${this.currentIndex + 1}枚目 / 全${this.slides.length}枚`;
		}
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
			this.track.removeEventListener('click', this.handleImageLinkClick);
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
							// モーダルが表示された
							initSlidersInModal(modalElement);
						}
					}
				}

				// 新しく追加されたモーダル要素を監視
				mutation.addedNodes.forEach((node) => {
					if (node instanceof HTMLElement) {
						// 追加されたノード自体がモーダルの場合
						if (node.id?.startsWith('modal-')) {
							modalObserver.observe(node, {
								attributes: true,
								attributeFilter: ['aria-hidden']
							});
							if (node.getAttribute('aria-hidden') !== 'true') {
								initSlidersInModal(node);
							}
						}

						// 追加されたノード内のモーダルを検索
						node.querySelectorAll?.('[id^="modal-"]').forEach((modal) => {
							modalObserver.observe(modal, {
								attributes: true,
								attributeFilter: ['aria-hidden']
							});
							if (modal.getAttribute('aria-hidden') !== 'true') {
								initSlidersInModal(modal);
							}
						});
					}
				});
			});
		});

		// 既存のモーダル要素を監視
		document.querySelectorAll('[id^="modal-"]').forEach((modal) => {
			modalObserver.observe(modal, {
				attributes: true,
				attributeFilter: ['aria-hidden']
			});
		});

		// 動的に追加されるモーダルにも対応
		modalObserver.observe(document.body, {
			childList: true,
			subtree: true
		});
	}
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

