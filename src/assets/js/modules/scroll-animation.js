/**
 * ScrollAnimation
 * スクロール連動アニメーション
 * Intersection Observerを使用して要素の表示を検知し、アニメーションをトリガー
 *
 * 前提HTML例:
 *
 * <section data-scroll-trigger>
 * 	<!-- コンテンツ -->
 * </section>
 *
 * 初期化例:
 * import ScrollAnimation from './scroll-animation.js';
 * const scrollAnimation = new ScrollAnimation();
 */
export default class ScrollAnimation {
	constructor() {
		this.targets = document.querySelectorAll('[data-scroll-trigger]');
// スマホ判定（768px以下）
const isMobile = window.innerWidth < 768;

		this.options = {
			root: null,
			// スマホ時は下方向に余白を持たせて、画面に入る前からトリガーされやすくする
			rootMargin: isMobile ? '0px 0px 100px 0px' : '0px',
				// スマホ時は要素が少しでも見えたらトリガー（0.05 = 5%）
				threshold: isMobile ? 0.05 : 0.2,
		};

		this.init();
	}

	init() {
		if (this.targets.length === 0) return;

		const observer = new IntersectionObserver(this.callback.bind(this), this.options);

		this.targets.forEach(target => {
			observer.observe(target);
		});
	}

	callback(entries, observer) {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('is-visible');
				observer.unobserve(entry.target); // 一度表示したら監視を解除
			}
		});
	}
}
