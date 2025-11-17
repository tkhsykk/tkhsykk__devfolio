/**
 * ワーク詳細パネルの制御
 * @description カードクリックで詳細ブロックを表示する機能
 *
 * 概要:
 * - ワークカードをクリックすると、クリックしたカードの次の行の開始位置に詳細ブロックを表示
 * - 詳細ブロックは幅100vwで全幅表示
 * - 同じカードを再度クリックすると詳細ブロックを閉じる（トグル）
 *
 * 主な仕様:
 * - グリッドの列数を動的に取得（getComputedStyleでgrid-template-columnsを解析）
 * - クリックしたカードの行番号を計算し、次の行の開始位置に詳細ブロックを配置
 * - 詳細ブロックの高さを事前に取得してから表示
 * - レスポンシブ対応（リサイズ時に列数を再取得して位置を再計算）
 * - アクセシビリティ対応（aria-expanded属性の管理）
 * - キーボード操作対応（ESCキー）
 *
 * 制限事項:
 * - 詳細情報は各カードから抽出する
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
		this.worksSection = document.querySelector('.p-portfolio__works');
		this.workList = document.querySelector('.p-portfolio__work-list');
		this.workCards = document.querySelectorAll('.p-portfolio__work-card');
		this.currentCard = null;
		this.detailsBlock = null;
		this.workData = [];
		this.scrollHandler = null;
		this.resizeHandler = null;
		this.detailsHeight = null;
		this.nextRowStartCard = null;

		console.log('WorkDetails: コンストラクタ実行', {
			worksSection: !!this.worksSection,
			workList: !!this.workList,
			workCardsCount: this.workCards.length
		});

		if (!this.worksSection || !this.workList) {
			console.error('WorkDetails: 必要な要素が見つかりません', {
				worksSection: !!this.worksSection,
				workList: !!this.workList
			});
			return;
		}

		this.init();
	}

	/**
	 * 初期化
	 * @private
	 */
	init() {
		console.log('WorkDetails: 初期化開始', {
			worksSection: !!this.worksSection,
			workList: !!this.workList,
			workCardsCount: this.workCards.length
		});

		// 各カードからデータを抽出
		this.extractWorkData();
		console.log('WorkDetails: データ抽出完了', { workDataCount: this.workData.length });

		// 各カードにクリックイベントを設定
		this.workCards.forEach((card, index) => {
			const trigger = card.querySelector('.p-portfolio__work-trigger');
			if (trigger) {
				trigger.addEventListener('click', (e) => {
					e.preventDefault();
					e.stopPropagation();
					console.log('WorkDetails: カードがクリックされました', { index, card });
					this.toggleDetails(index, card);
				});
			} else {
				console.warn('WorkDetails: トリガーが見つかりません', { index, card });
			}
		});

		// ESCキーで閉じる
		this.escapeHandler = (e) => {
			if (e.key === 'Escape' && this.currentCard !== null) {
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
			const img = card.querySelector('.p-portfolio__work-trigger img');
			const title = card.querySelector('.p-portfolio__work-title');

			if (img && title) {
				const meta = card.dataset.workMeta || '';
				const tagsJson = card.dataset.workTags || '[]';
				const tags = JSON.parse(tagsJson);
				const summary = card.dataset.workSummary || '';
				const description = card.dataset.workDescription || '';
				const imagesJson = card.dataset.workImages || '[]';
				const images = JSON.parse(imagesJson);

				this.workData.push({
					image: img.src,
					alt: img.alt,
					title: title.textContent,
					meta,
					tags,
					summary,
					description,
					images: images.length > 0 ? images : [img.src]
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
	toggleDetails(index, card) {
		console.log('WorkDetails: toggleDetails呼び出し', { index, card, currentCard: this.currentCard });

		// 同じカードが既に開いている場合は閉じる
		if (this.currentCard === card && this.detailsBlock) {
			console.log('WorkDetails: 既に開いているので閉じます');
			this.close();
			return;
		}

		// 既存の詳細ブロックを削除
		this.removeDetailsBlock();

		// 新しい詳細ブロックを挿入
		console.log('WorkDetails: 詳細ブロックを挿入します');
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
	 * 詳細ブロック要素を作成して高さを取得
	 * @param {string} detailsHTML - 詳細ブロックのHTML
	 * @returns {{element: HTMLElement, height: number}} 詳細ブロック要素と高さ
	 * @private
	 */
	createDetailsElementWithHeight(detailsHTML) {
		const detailsElement = document.createElement('div');
		detailsElement.className = 'p-portfolio__work-details-block';
		detailsElement.innerHTML = detailsHTML;

		// 一時的に非表示でDOMに追加して高さを取得
		detailsElement.style.visibility = 'hidden';
		detailsElement.style.position = 'absolute';
		detailsElement.style.top = '-9999px';
		this.worksSection.appendChild(detailsElement);

		const height = detailsElement.offsetHeight;

		// 非表示を解除
		detailsElement.style.visibility = '';
		detailsElement.style.position = '';
		detailsElement.style.top = '';

		return { element: detailsElement, height };
	}

	/**
	 * 次の行の開始位置のカードを取得
	 * @param {number} cardIndex - クリックされたカードのインデックス
	 * @returns {HTMLElement} 次の行の開始位置のカード要素
	 * @private
	 */
	getNextRowStartCard(cardIndex) {
		const columnCount = this.getGridColumnCount();
		const rowNumber = this.getRowNumber(cardIndex, columnCount);
		const nextRowStartIndex = this.getNextRowStartCardIndex(rowNumber, columnCount);

		return this.workCards[nextRowStartIndex] || this.workCards[this.workCards.length - 1];
	}

	/**
	 * 詳細ブロックを挿入
	 * @param {number} index - ワークのインデックス
	 * @param {HTMLElement} card - クリックされたカード要素
	 * @private
	 */
	insertDetailsBlock(index, card) {
		console.log('WorkDetails: insertDetailsBlock開始', { index, workDataLength: this.workData.length });

		const work = this.workData[index];
		if (!work) {
			console.error('WorkDetails: ワークデータが見つかりません', { index });
			return;
		}

		console.log('WorkDetails: ワークデータ取得完了', { work });

		// 詳細ブロックのHTMLを生成
		const detailsHTML = this.createDetailsHTML(work, index);
		console.log('WorkDetails: HTML生成完了');

		// 詳細ブロック要素を作成して高さを取得
		const { element: detailsElement, height: detailsHeight } = this.createDetailsElementWithHeight(detailsHTML);
		console.log('WorkDetails: 詳細ブロック要素作成完了', { height: detailsHeight });

		// 次の行の開始位置のカードを取得
		const nextRowStartCard = this.getNextRowStartCard(index);
		console.log('WorkDetails: 次の行の開始位置のカード取得完了', { nextRowStartCard });

		// 位置を計算して設定
		this.positionDetailsBlock(detailsElement, nextRowStartCard, detailsHeight);
		console.log('WorkDetails: 位置設定完了');

		this.currentCard = card;
		this.detailsBlock = detailsElement;
		this.detailsHeight = detailsHeight;

		// イベントリスナーとスライダーの初期化
		this.setupDetailsBlockEvents(detailsElement, work, index);
		console.log('WorkDetails: イベント設定完了');
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
		const closeButton = detailsElement.querySelector('.p-portfolio__work-close');
		if (closeButton) {
			closeButton.addEventListener('click', () => {
				this.close();
			});
		}

		// スライダーの初期化（複数画像がある場合）
		if (work.images.length > 1) {
			this.initSlider(detailsElement);
		}

		// スクロール位置を調整
		this.scrollToDetails(detailsElement);
	}

	/**
	 * 詳細ブロックの位置を計算して設定
	 * @param {HTMLElement} detailsElement - 詳細ブロック要素
	 * @param {HTMLElement} nextRowStartCard - 次の行の開始位置のカード要素
	 * @param {number} detailsHeight - 詳細ブロックの高さ
	 * @private
	 */
	positionDetailsBlock(detailsElement, nextRowStartCard, detailsHeight) {
		this.nextRowStartCard = nextRowStartCard;
		this.detailsHeight = detailsHeight;
		this.updatePosition(detailsElement, nextRowStartCard);

		// スクロールとリサイズ時に位置を再計算
		this.scrollHandler = () => {
			if (this.detailsBlock && this.nextRowStartCard) {
				this.updatePosition(this.detailsBlock, this.nextRowStartCard);
			}
		};

		this.resizeHandler = () => {
			if (this.detailsBlock && this.currentCard) {
				// リサイズ時は列数を再取得して位置を再計算
				const columnCount = this.getGridColumnCount();
				const cardIndex = Array.from(this.workCards).indexOf(this.currentCard);
				const rowNumber = this.getRowNumber(cardIndex, columnCount);
				const nextRowStartIndex = this.getNextRowStartCardIndex(rowNumber, columnCount);
				const nextRowStartCard = this.workCards[nextRowStartIndex] || this.workCards[this.workCards.length - 1];

				this.nextRowStartCard = nextRowStartCard;
				this.updatePosition(this.detailsBlock, nextRowStartCard);
			}
		};

		window.addEventListener('scroll', this.scrollHandler, { passive: true });
		window.addEventListener('resize', this.resizeHandler, { passive: true });
	}

	/**
	 * 詳細ブロックの位置を更新
	 * @param {HTMLElement} detailsElement - 詳細ブロック要素
	 * @param {HTMLElement} nextRowStartCard - 次の行の開始位置のカード要素
	 * @private
	 */
	updatePosition(detailsElement, nextRowStartCard) {
		const cardRect = nextRowStartCard.getBoundingClientRect();
		const worksSectionRect = this.worksSection.getBoundingClientRect();

		// 次の行の開始位置のカードの下に詳細ブロックを配置
		// worksSectionがposition: relativeなので、worksSectionからの相対位置を計算
		const top = cardRect.bottom - worksSectionRect.top + 24; // 24pxはgap分

		detailsElement.style.top = `${top}px`;
		console.log('WorkDetails: 位置更新', { top, cardBottom: cardRect.bottom, sectionTop: worksSectionRect.top });
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
						${work.images.map((imgSrc, imgIndex) => `
							<div class="c-slider__slide">
								<img src="${imgSrc}" alt="${work.alt} - 画像${imgIndex + 1}" />
							</div>
						`).join('')}
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
				<img src="${work.images[0]}" alt="${work.alt}" />
			</div>
		`;

		return `
			<div class="p-portfolio__work-details-content">
				<button class="p-portfolio__work-close" aria-label="詳細を閉じる">
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
							${work.summary ? `<p class="p-portfolio__work-details-summary">${work.summary}</p>` : ''}
							${work.description ? `<p class="p-portfolio__work-details-description">${work.description}</p>` : ''}
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

		import('./slider.js').then(({ ImageSlider, sliderInstances }) => {
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
		// 詳細ブロックの位置を取得（worksSectionからの相対位置 + worksSectionの絶対位置）
		const worksSectionRect = this.worksSection.getBoundingClientRect();
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		const elementRect = element.getBoundingClientRect();

		// worksSectionの上端からの相対位置 + スクロール位置 - 余白
		const targetY = scrollTop + worksSectionRect.top + parseFloat(element.style.top) - 20;

		console.log('WorkDetails: スクロール位置計算', {
			scrollTop,
			sectionTop: worksSectionRect.top,
			elementTop: element.style.top,
			targetY
		});

		window.scrollTo({
			top: targetY,
			behavior: 'smooth'
		});
	}

	/**
	 * 既存の詳細ブロックを削除
	 * @private
	 */
	removeDetailsBlock() {
		if (this.detailsBlock) {
			this.detailsBlock.remove();
			this.detailsBlock = null;
		}
		this.currentCard = null;
		this.nextRowStartCard = null;
		this.detailsHeight = null;
		this.removeEventListeners();
	}

	/**
	 * 閉じる
	 * @public
	 */
	close() {
		this.removeDetailsBlock();
	}

	/**
	 * イベントリスナーを削除
	 * @private
	 */
	removeEventListeners() {
		if (this.scrollHandler) {
			window.removeEventListener('scroll', this.scrollHandler);
			this.scrollHandler = null;
		}
		if (this.resizeHandler) {
			window.removeEventListener('resize', this.resizeHandler);
			this.resizeHandler = null;
		}
	}

	/**
	 * クリーンアップ
	 * @public
	 */
	destroy() {
		this.close();
		this.removeEventListeners();
		document.removeEventListener('keydown', this.escapeHandler);
	}
}

/**
 * ワーク詳細パネルの初期化
 * @description ページ内のワークセクションを初期化
 */
function initWorkDetails() {
	console.log('WorkDetails: initWorkDetails呼び出し');
	const workList = document.querySelector('.p-portfolio__work-list');
	if (!workList) {
		console.error('WorkDetails: workListが見つかりません');
		return;
	}

	console.log('WorkDetails: WorkDetailsインスタンスを作成します');
	new WorkDetails();
}

// 初期化
function init() {
	console.log('WorkDetails: init関数実行', { readyState: document.readyState });
	if (document.readyState === 'loading') {
		console.log('WorkDetails: DOMContentLoadedを待機します');
		document.addEventListener('DOMContentLoaded', initWorkDetails);
	} else {
		console.log('WorkDetails: 即座に初期化します');
		setTimeout(initWorkDetails, 0);
	}
}

init();

// エクスポート
export { WorkDetails, initWorkDetails };
