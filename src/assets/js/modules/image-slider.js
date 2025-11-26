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

		e.preventDefault();
		e.stopPropagation();
		e.stopImmediatePropagation();

		// 元の画像要素をそのまま拡大表示
		this.openLightboxWithImage(img, link);

		return false;
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
	 * 元の画像をそのまま拡大表示するライトボックスを開く
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

		// 元の画像の位置とサイズ、親要素を保存
		const rect = img.getBoundingClientRect();
		const sourceRect = {
			left: rect.left,
			top: rect.top,
			width: rect.width,
			height: rect.height
		};
		const originalParent = img.parentElement;
		const originalNextSibling = img.nextSibling;
		const originalStyles = {
			position: img.style.position,
			left: img.style.left,
			top: img.style.top,
			width: img.style.width,
			height: img.style.height,
			transform: img.style.transform,
			transformOrigin: img.style.transformOrigin,
			transition: img.style.transition,
			zIndex: img.style.zIndex,
			opacity: img.style.opacity
		};

		// ライトボックス要素を作成
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

		// bodyに追加
		if (document.body) {
			document.body.appendChild(lightbox);
		} else {
			document.documentElement.appendChild(lightbox);
		}

		// 画像を元の親から一時的に削除して、bodyに直接追加（アニメーション用）
		if (img.parentElement) {
			img.parentElement.removeChild(img);
		}
		document.body.appendChild(img);

		// 画像のalt属性を保持（アクセシビリティ）
		if (!img.hasAttribute('alt')) {
			img.setAttribute('alt', '拡大表示中の画像');
		}

		// 画像を元の位置に設定（アニメーション開始位置）
		img.style.position = 'fixed';
		img.style.left = `${sourceRect.left}px`;
		img.style.top = `${sourceRect.top}px`;
		img.style.width = `${sourceRect.width}px`;
		img.style.height = `${sourceRect.height}px`;
		img.style.transform = 'none';
		img.style.transformOrigin = 'center center';
		img.style.zIndex = '10001';
		img.style.transition = 'none';
		img.style.opacity = '1';
		img.style.pointerEvents = 'none';

		// リサイズ時の位置再計算ハンドラー
		const handleResize = () => {
			if (img && sourceRect) {
				this.animateImageExpand(img, sourceRect, originalStyles);
			}
		};
		window.addEventListener('resize', handleResize);
		lightbox._handleResize = handleResize;

		// ライトボックスを表示
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				lightbox.style.opacity = '1';
				lightbox.style.visibility = 'visible';
				lightbox.style.pointerEvents = 'auto';
				overlay.style.opacity = '1';
				closeButton.style.opacity = '1';

				// 画像を拡大アニメーション
				this.animateImageExpand(img, sourceRect, originalStyles);
			});
		});

		// 閉じる処理
		const closeLightbox = () => {
			this.closeLightbox(lightbox, img, originalParent, originalNextSibling, sourceRect, originalStyles);
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
		lightbox._originalParent = originalParent;
		lightbox._originalNextSibling = originalNextSibling;
		lightbox._sourceRect = sourceRect;
		lightbox._originalStyles = originalStyles;
		lightbox._handleEscape = handleEscape;
		lightbox._previousFocus = this.previousFocus;

		// アクティブなライトボックスとして保存
		this.activeLightbox = lightbox;

		// フォーカストラップの設定
		this.setupFocusTrap(lightbox, closeButton);

		// 閉じるボタンにフォーカスを移動
		requestAnimationFrame(() => {
			closeButton.focus();
		});
	}

	/**
	 * フォーカストラップの設定
	 * @param {HTMLElement} lightbox - ライトボックス要素
	 * @param {HTMLElement} closeButton - 閉じるボタン
	 * @private
	 */
	setupFocusTrap(lightbox, closeButton) {
		const handleTabKey = (e) => {
			if (e.key !== 'Tab') return;

			// フォーカス可能な要素を取得
			const focusableElements = lightbox.querySelectorAll(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
			);
			const firstElement = focusableElements[0];
			const lastElement = focusableElements[focusableElements.length - 1];

			if (e.shiftKey) {
				// Shift + Tab
				if (document.activeElement === firstElement || document.activeElement === closeButton) {
					e.preventDefault();
					lastElement?.focus();
				}
			} else {
				// Tab
				if (document.activeElement === lastElement) {
					e.preventDefault();
					firstElement?.focus();
				}
			}
		};

		lightbox.addEventListener('keydown', handleTabKey);
		lightbox._handleTabKey = handleTabKey;
	}

	/**
	 * ライトボックスを閉じる
	 * @param {HTMLElement} lightbox - ライトボックス要素
	 * @param {HTMLImageElement} img - 画像要素
	 * @param {HTMLElement} originalParent - 元の親要素
	 * @param {Node} originalNextSibling - 元の次の兄弟要素
	 * @param {Object} sourceRect - 元の位置とサイズ
	 * @param {Object} originalStyles - 元のスタイル
	 * @private
	 */
	closeLightbox(lightbox, img = null, originalParent = null, originalNextSibling = null, sourceRect = null, originalStyles = null) {
		if (!img) img = lightbox._originalImg;
		if (!originalParent) originalParent = lightbox._originalParent;
		if (!originalNextSibling) originalNextSibling = lightbox._originalNextSibling;
		if (!sourceRect) sourceRect = lightbox._sourceRect;
		if (!originalStyles) originalStyles = lightbox._originalStyles;

		// 画像を元の位置に戻すアニメーション（transformを使用して滑らかに）
		if (img && sourceRect) {
			const rect = img.getBoundingClientRect();
			const currentWidth = rect.width;
			const currentHeight = rect.height;
			const currentLeft = rect.left + currentWidth / 2; // 中心点
			const currentTop = rect.top + currentHeight / 2;

			// 元の画像の中心点
			const sourceCenterX = sourceRect.left + sourceRect.width / 2;
			const sourceCenterY = sourceRect.top + sourceRect.height / 2;

			// 中心点からの移動距離
			const translateX = sourceCenterX - currentLeft;
			const translateY = sourceCenterY - currentTop;

			// 縮小率を計算（アスペクト比を維持）
			const scaleX = sourceRect.width / currentWidth;
			const scaleY = sourceRect.height / currentHeight;
			// アスペクト比を維持するため、より小さい方の縮小率を使用
			const scale = Math.min(scaleX, scaleY);

			// transformを使用して滑らかにアニメーション
			// フェードアウトと同時に、元の位置へ移動しながら縮小
			img.style.transition = 'opacity 0.3s ease-out, transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
			img.style.transformOrigin = 'center center';
			img.style.opacity = '0';
			img.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
		}

		// ライトボックスを非表示
		if (lightbox) {
			lightbox.style.opacity = '0';
			lightbox.style.visibility = 'hidden';
			lightbox.style.pointerEvents = 'none';
			if (lightbox.querySelector('.c-lightbox__overlay')) {
				lightbox.querySelector('.c-lightbox__overlay').style.opacity = '0';
			}
			if (lightbox.querySelector('.c-lightbox__close')) {
				lightbox.querySelector('.c-lightbox__close').style.opacity = '0';
			}
		}

		// アニメーション完了後に画像を元の位置に戻す
		setTimeout(() => {
			if (img && originalParent) {
				// 画像をbodyから削除
				if (img.parentElement === document.body) {
					document.body.removeChild(img);
				}

				// 元のスタイルを復元
				Object.keys(originalStyles).forEach(key => {
					if (originalStyles[key]) {
						img.style[key] = originalStyles[key];
					} else {
						img.style.removeProperty(key);
					}
				});

				// 元の親要素に戻す
				if (originalParent && originalParent.parentElement) {
					if (originalNextSibling && originalNextSibling.parentElement === originalParent) {
						originalParent.insertBefore(img, originalNextSibling);
					} else {
						originalParent.appendChild(img);
					}
				}
			}

			// ライトボックスを削除
			if (lightbox && lightbox.parentElement) {
				lightbox.remove();
			}

			// ESCキーのイベントリスナーを削除
			if (lightbox && lightbox._handleEscape) {
				document.removeEventListener('keydown', lightbox._handleEscape);
			}

			// フォーカストラップのイベントリスナーを削除
			if (lightbox && lightbox._handleTabKey) {
				lightbox.removeEventListener('keydown', lightbox._handleTabKey);
			}

			// リサイズイベントリスナーを削除
			if (lightbox && lightbox._handleResize) {
				window.removeEventListener('resize', lightbox._handleResize);
			}

			// 元のフォーカス位置に戻す
			if (lightbox && lightbox._previousFocus && typeof lightbox._previousFocus.focus === 'function') {
				lightbox._previousFocus.focus();
			}

			// アクティブなライトボックスを解除
			if (this.activeLightbox === lightbox) {
				this.activeLightbox = null;
			}
		}, 350); // transformアニメーションに合わせて調整
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

		// 現在の位置から最終位置への変換を計算
		const scaleX = finalWidth / sourceRect.width;
		const scaleY = finalHeight / sourceRect.height;
		const translateX = finalLeft - sourceRect.left;
		const translateY = finalTop - sourceRect.top;

		// アニメーション開始
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				img.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), width 0.4s cubic-bezier(0.4, 0, 0.2, 1), height 0.4s cubic-bezier(0.4, 0, 0.2, 1), left 0.4s cubic-bezier(0.4, 0, 0.2, 1), top 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
				img.style.left = `${finalLeft}px`;
				img.style.top = `${finalTop}px`;
				img.style.width = `${finalWidth}px`;
				img.style.height = `${finalHeight}px`;
				img.style.transform = 'none';
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

