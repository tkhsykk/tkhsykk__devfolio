/**
 * WorkDetails
 * ワーク詳細パネルの制御
 * カードクリックで詳細ブロックを表示する機能
 *
  * 概要:
 * - ワークカードをクリックすると、クリックしたカードの次の行の開始位置に詳細ブロックを表示
 * - 詳細ブロックはグリッドアイテムとして挿入され、全幅表示
 * - 同じカードを再度クリックすると詳細ブロックを閉じる（トグル）
 *
 * 主な仕様:
 * - グリッドの列数を動的に取得（getComputedStyleでgrid-template-columnsを解析）
 * - クリックしたカードの行番号を計算し、次の行の開始位置に詳細ブロックを挿入
 * - 詳細ブロックは`<li>`要素として作成し、グリッドアイテムとして自然に配置
 * - `grid-column: 1 / -1`で全幅表示
 * - アクセシビリティ対応（aria-expanded属性の管理）
 * - キーボード操作対応（ESCキー）
 *
 * 制限事項:
 * - 詳細情報は各カードから抽出する
 *
 * 前提HTML例:
 *
 * <ul class="p-portfolio__work-list l-grid l-grid--cols-3" data-work-list>
 * 	<li class="p-portfolio__work-card" data-work-card data-work-meta="..." data-work-tags='["..."]' data-work-description="..." data-work-images='["..."]'>
 * 		<article>
 * 			<button class="p-portfolio__work-image p-portfolio__work-trigger" data-work-trigger>
 * 				<img src="..." alt="..." />
 * 			</button>
 * 			<div class="p-portfolio__work-content">
 * 				<h3 class="p-portfolio__work-title">...</h3>
 * 			</div>
 * 		</article>
 * 	</li>
 * </ul>
 *
 * 初期化例:
 * import { initWorkDetails } from './work-details.js';
 * initWorkDetails();
 */

/**
 * ワーク詳細パネルの制御クラス
 * @class WorkDetails
 */
class WorkDetails {
	/**
	 * @constructor
	 */
	constructor() {
		this.worksSection = document.querySelector('[data-work]');
		this.workList = document.querySelector('[data-work-list]');
		this.workCards = document.querySelectorAll('[data-work-card]');
		this.currentCard = null;
		this.detailsBlock = null;
		this.workData = [];

		if (!this.worksSection || !this.workList) {
			return;
		}

		this.init();
	}

	/**
	 * 初期化
	 * @private
	 */
	init() {
		// 各カードからデータを抽出
		this.extractWorkData();

		// 各カードにクリックイベントを設定
		this.workCards.forEach((card, index) => {
			const trigger = card.querySelector('[data-work-trigger]');
			if (trigger) {
				trigger.addEventListener('click', (e) => {
					e.preventDefault();
					e.stopPropagation();
					this.toggleDetails(index, card);
				});
			}
		});

		// ESCキーで閉じる
		this.escapeHandler = (e) => {
			if (e.key === 'Escape' && this.currentCard !== null) {
				// Lightboxが開いている場合は、work-detailsは閉じない
				const lightbox = document.getElementById('js-lightbox');
				if (lightbox && lightbox.classList.contains('is-open')) {
					return;
				}
				this.close();
			}
		};
		document.addEventListener('keydown', this.escapeHandler);
	}

	/**
	 * 各カードからデータを抽出
	 * @private
	 */
	extractWorkData() {
		this.workCards.forEach((card) => {
			const img = card.querySelector('[data-work-trigger] img');
			const title = card.querySelector('.p-portfolio__work-title');

			if (img && title) {
		const meta = card.dataset.workMeta || '';
		const tagsJson = card.dataset.workTags || '[]';
		const tags = JSON.parse(tagsJson);
		const description = card.dataset.workDescription || '';
		const linkJson = card.dataset.workLink || '{}';
		const link = JSON.parse(linkJson);
		const imagesJson = card.dataset.workImages || '[]';
		let images = JSON.parse(imagesJson);

		// 画像データを正規化（文字列配列の場合はオブジェクト配列に変換）
		if (images.length > 0 && typeof images[0] === 'string') {
			images = images.map((src) => ({ src, hasLink: false }));
		}

		this.workData.push({
			image: img.src,
			alt: img.alt,
			title: title.textContent,
			meta,
			tags,
			description,
			link,
			images: images.length > 0 ? images : [{ src: img.src, hasLink: false }]
		});
			}
		});
	}

	/**
	 * 詳細ブロックをトグル
	 * @param {number} index - ワークのインデックス
	 * @param {HTMLElement} card - クリックされたカード要素
	 * @private
	 */
	async toggleDetails(index, card) {
		// 同じカードが既に開いている場合は閉じる
		if (this.currentCard === card && this.detailsBlock) {
			await this.close();
			return;
		}

		// 既存の詳細ブロックを削除（transition完了を待つ）
		await this.removeDetailsBlock();

		// 新しい詳細ブロックを挿入
		this.insertDetailsBlock(index, card);
	}

	/**
	 * グリッドの列数を取得
	 * @returns {number} 列数
	 * @private
	 */
	getGridColumnCount() {
		const computedStyle = window.getComputedStyle(this.workList);
		const gridTemplateColumns = computedStyle.gridTemplateColumns;

		// repeat()の値を抽出
		const repeatMatch = gridTemplateColumns.match(/repeat\((\d+)/);
		if (repeatMatch) {
			return parseInt(repeatMatch[1], 10);
		}

		// フォールバック：ビューポート幅からブレークポイントを判定
		const viewportWidth = window.innerWidth;
		if (viewportWidth >= 1024) {
			return 3; // lg以上
		} else if (viewportWidth >= 768) {
			return 2; // md以上
		}
		return 1; // それ以下
	}

	/**
	 * 行番号を計算
	 * @param {number} cardIndex - カードのインデックス
	 * @param {number} columnCount - グリッドの列数
	 * @returns {number} 行番号（0始まり）
	 * @private
	 */
	getRowNumber(cardIndex, columnCount) {
		return Math.floor(cardIndex / columnCount);
	}

	/**
	 * 次の行の開始位置（カードのインデックス）を取得
	 * @param {number} rowNumber - 現在の行番号
	 * @param {number} columnCount - グリッドの列数
	 * @returns {number} 次の行の開始位置のカードインデックス
	 * @private
	 */
	getNextRowStartCardIndex(rowNumber, columnCount) {
		const nextRowStart = (rowNumber + 1) * columnCount;
		const totalCards = this.workCards.length;

		// 最後の行を超える場合は、最後のカードの位置を返す
		return nextRowStart >= totalCards ? totalCards - 1 : nextRowStart;
	}

	/**
	 * 詳細ブロック要素を作成
	 * @param {string} detailsHTML - 詳細ブロックのHTML
	 * @returns {HTMLElement} 詳細ブロック要素
	 * @private
	 */
	createDetailsElement(detailsHTML) {
		// <li>要素として作成（グリッドアイテムとして挿入）
		const detailsElement = document.createElement('li');
		detailsElement.className = 'p-portfolio__work-details-block';
		detailsElement.setAttribute('data-work-details-block', '');
		detailsElement.innerHTML = detailsHTML;

		return detailsElement;
	}

	/**
	 * 現在の行の最後のカードを取得
	 * @param {number} cardIndex - クリックされたカードのインデックス
	 * @returns {HTMLElement} 現在の行の最後のカード要素
	 * @private
	 */
	getCurrentRowLastCard(cardIndex) {
		const columnCount = this.getGridColumnCount();
		const rowNumber = this.getRowNumber(cardIndex, columnCount);

		// 現在の行の最後のカードのインデックスを計算
		const currentRowLastIndex = (rowNumber + 1) * columnCount - 1;
		const totalCards = this.workCards.length;

		// 最後の行を超える場合は、最後のカードを返す
		const lastCardIndex = currentRowLastIndex >= totalCards ? totalCards - 1 : currentRowLastIndex;

		return this.workCards[lastCardIndex];
	}

	/**
	 * 詳細ブロックを挿入
	 * @param {number} index - ワークのインデックス
	 * @param {HTMLElement} card - クリックされたカード要素
	 * @private
	 */
	insertDetailsBlock(index, card) {
		const work = this.workData[index];
		if (!work) {
			return;
		}

		// 詳細ブロックのHTMLを生成
		const detailsHTML = this.createDetailsHTML(work, index);

		// 詳細ブロック要素を作成（<li>要素として）
		const detailsElement = this.createDetailsElement(detailsHTML);

		// 現在の行の最後のカードを取得
		const currentRowLastCard = this.getCurrentRowLastCard(index);

		// 現在の行の最後のカードの次に挿入（次の行の開始位置の前に挿入）
		currentRowLastCard.insertAdjacentElement('afterend', detailsElement);

		this.currentCard = card;
		this.detailsBlock = detailsElement;

		// 親のli.p-portfolio__work-cardにis-openクラスを付与
		card.classList.add('is-open');

		// 高さを0から実際の高さまでtransition
		this.openDetailsBlock(detailsElement);

		// イベントリスナーとスライダーの初期化
		this.setupDetailsBlockEvents(detailsElement, work, index);
	}

	/**
	 * 詳細ブロックのイベントリスナーとスライダーを設定
	 * @param {HTMLElement} detailsElement - 詳細ブロック要素
	 * @param {Object} work - ワークデータ
	 * @param {number} index - ワークのインデックス
	 * @private
	 */
	setupDetailsBlockEvents(detailsElement, work, index) {
		// 閉じるボタンのイベント
		const closeButton = detailsElement.querySelector('[data-work-close]');
		if (closeButton) {
			closeButton.addEventListener('click', () => {
				this.close();
			});
		}

		// スライダーの初期化（複数画像がある場合）
		if (work.images.length > 1) {
			this.initSlider(detailsElement);
		}

		// スクロール位置を調整（一時的に無効化）
		// this.scrollToDetails(detailsElement);
	}


	/**
	 * 詳細ブロックのHTMLを生成
	 * @param {Object} work - ワークデータ
	 * @param {number} index - ワークのインデックス
	 * @returns {string} HTML文字列
	 * @private
	 */
	createDetailsHTML(work, index) {
		const sliderHTML = work.images.length > 1 ? `
			<div class="c-slider" data-slider="work-details-${index}">
				<div class="c-slider__viewport">
					<div class="c-slider__track">
						${work.images.map((imgData, imgIndex) => {
							// 画像データを正規化（文字列の場合はオブジェクトに変換）
							const imgObj = typeof imgData === 'string'
								? { src: imgData, hasLink: false }
								: imgData;
							// 原寸大のURLを生成（パラメータを削除）
							const fullSizeUrl = imgObj.src.split('?')[0];
							return `
							<div class="c-slider__slide">
								${imgObj.hasLink ? `<a href="${fullSizeUrl}">` : ''}
									<img src="${imgObj.src}" alt="${work.alt} - 画像${imgIndex + 1}" />
								${imgObj.hasLink ? '</a>' : ''}
							</div>
						`;
						}).join('')}
					</div>
				</div>
				<button class="c-slider__button c-slider__button--prev" aria-label="前の画像" data-slider-prev>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<polyline points="15 18 9 12 15 6"></polyline>
					</svg>
				</button>
				<button class="c-slider__button c-slider__button--next" aria-label="次の画像" data-slider-next>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<polyline points="9 18 15 12 9 6"></polyline>
					</svg>
				</button>
				<div class="c-slider__pagination" aria-label="スライダーのページネーション"></div>
			</div>
		` : `
			<div class="p-portfolio__work-details-image">
				${(() => {
					const firstImg = work.images[0];
					const imgObj = typeof firstImg === 'string'
						? { src: firstImg, hasLink: false }
						: firstImg;
					const fullSizeUrl = imgObj.src.split('?')[0];
					return imgObj.hasLink
						? `<a href="${fullSizeUrl}"><img src="${imgObj.src}" alt="${work.alt}" /></a>`
						: `<img src="${imgObj.src}" alt="${work.alt}" />`;
				})()}
			</div>
		`;

		return `
			<div class="p-portfolio__work-details-content">
				<button class="p-portfolio__work-close" data-work-close aria-label="詳細を閉じる">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<line x1="18" y1="6" x2="6" y2="18"></line>
						<line x1="6" y1="6" x2="18" y2="18"></line>
					</svg>
				</button>
				<div class="p-portfolio__work-details-inner">
					<div class="p-portfolio__work-details-grid">
						${sliderHTML}
						<div class="p-portfolio__work-details-text">
							<h2 class="p-portfolio__work-details-title">${work.title}</h2>
							<hr class="p-portfolio__work-details-divider" />
							${work.meta ? `<p class="p-portfolio__work-details-meta">${work.meta}</p>` : ''}
							${work.tags.length > 0 ? `
								<div class="p-portfolio__work-details-tags">
									${work.tags.map(tag => `<span class="c-badge c-badge--small">${tag}</span>`).join('')}
								</div>
							` : ''}
							${work.description ? `<p class="p-portfolio__work-details-description">${work.description}</p>` : ''}
							${
								work.link && work.link.url ? `
								<a href="${work.link.url}" class="p-portfolio__work-details-link" target="_blank" rel="noopener noreferrer">
									${work.link.text}
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
										<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
										<polyline points="15 3 21 3 21 9"></polyline>
										<line x1="10" y1="14" x2="21" y2="3"></line>
									</svg>
								</a>
							` : ''
							}
						</div>
					</div>
				</div>
			</div>
		`;
	}

	/**
	 * スライダーを初期化
	 * @param {HTMLElement} container - コンテナ要素
	 * @private
	 */
	initSlider(container) {
		const sliderElement = container.querySelector('[data-slider]');
		if (!sliderElement) return;

		import('./image-slider.js').then(({ ImageSlider, sliderInstances }) => {
			setTimeout(() => {
				if (!sliderInstances.has(sliderElement)) {
					const instance = new ImageSlider(sliderElement);
					sliderInstances.set(sliderElement, instance);
				}
			}, 0);
		});
	}

	/**
	 * 詳細ブロックまでスクロール
	 * @param {HTMLElement} element - 詳細ブロック要素
	 * @private
	 */
	scrollToDetails(element) {
		const rect = element.getBoundingClientRect();
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		const targetY = scrollTop + rect.top - 20; // 上部に20pxの余白

		window.scrollTo({
			top: targetY,
			behavior: 'smooth'
		});
	}

	/**
	 * 詳細ブロックを開く（高さのtransition）
	 * @param {HTMLElement} detailsElement - 詳細ブロック要素
	 * @private
	 */
	openDetailsBlock(detailsElement) {
		// 一旦高さを0に設定（初期状態）
		detailsElement.style.height = '0px';

		// DOMの再計算を待つため、複数のフレームを待つ
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				// 一時的に高さをautoにして実際の高さを取得
				detailsElement.style.height = 'auto';
				const targetHeight = detailsElement.scrollHeight;
				detailsElement.style.height = '0px';

				// 次のフレームでtransition開始
				requestAnimationFrame(() => {
					detailsElement.style.height = `${targetHeight}px`;
				});
			});
		});
	}

	/**
	 * 詳細ブロックを閉じる（高さのtransition）
	 * @param {HTMLElement} detailsElement - 詳細ブロック要素
	 * @private
	 */
	closeDetailsBlock(detailsElement) {
		return new Promise((resolve) => {
			// 現在の高さを取得
			const currentHeight = detailsElement.scrollHeight;
			detailsElement.style.height = `${currentHeight}px`;

			// 次のフレームで高さを0に
			requestAnimationFrame(() => {
				detailsElement.style.height = '0px';

				// transition完了を待つ
				const handleTransitionEnd = () => {
					detailsElement.removeEventListener('transitionend', handleTransitionEnd);
					resolve();
				};
				detailsElement.addEventListener('transitionend', handleTransitionEnd);
			});
		});
	}

	/**
	 * 既存の詳細ブロックを削除
	 * @private
	 */
	async removeDetailsBlock() {
		if (this.detailsBlock) {
			// 高さを0に戻してから削除
			await this.closeDetailsBlock(this.detailsBlock);
			this.detailsBlock.remove();
			this.detailsBlock = null;
		}

		// 親のli.p-portfolio__work-cardからis-openクラスを削除
		if (this.currentCard) {
			this.currentCard.classList.remove('is-open');
		}

		this.currentCard = null;
	}

	/**
	 * 閉じる
	 * @public
	 */
	async close() {
		await this.removeDetailsBlock();
	}

	/**
	 * クリーンアップ
	 * @public
	 */
	destroy() {
		this.close();
		document.removeEventListener('keydown', this.escapeHandler);
	}
}

/**
 * ワーク詳細パネルの初期化
 * @description ページ内のワークセクションを初期化
 */
function initWorkDetails() {
	const workList = document.querySelector('[data-work-list]');
	if (!workList) {
		return;
	}

	new WorkDetails();
}

// 初期化
function init() {
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initWorkDetails);
	} else {
		setTimeout(initWorkDetails, 0);
	}
}

init();

// エクスポート
export { WorkDetails, initWorkDetails };

