/**
 * スクロール連動アニメーション
 * Intersection Observerを使用して要素の表示を検知
 */
export default class ScrollAnimation {
	constructor() {
		this.targets = document.querySelectorAll('.js-scroll-trigger');
		this.options = {
			root: null,
			rootMargin: '0px',
			threshold: 0.2,
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
