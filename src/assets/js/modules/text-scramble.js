/**
 * テキストスクランブルエフェクト
 * ランダムな文字遷移アニメーション
 */
class TextScramble {
	constructor(el) {
		this.el = el;
		this.chars = '!<>-_\\/[]{}—=+*^?#________';
		this.update = this.update.bind(this);
	}

	setText(newText) {
		const oldText = this.el.innerText;
		const length = Math.max(oldText.length, newText.length);
		const promise = new Promise((resolve) => (this.resolve = resolve));
		this.queue = [];
		for (let i = 0; i < length; i++) {
			const from = oldText[i] || '';
			const to = newText[i] || '';
			const start = Math.floor(Math.random() * 30);
			const end = start + Math.floor(Math.random() * 30);
			this.queue.push({
				from,
				to,
				start,
				end
			});
		}
		cancelAnimationFrame(this.frameRequest);
		this.frame = 0;
		this.update();
		return promise;
	}

	update() {
		let output = '';
		let complete = 0;
		for (let i = 0, n = this.queue.length; i < n; i++) {
			let {
				from,
				to,
				start,
				end,
				char
			} = this.queue[i];
			if (this.frame >= end) {
				complete++;
				output += to;
			} else if (this.frame >= start) {
				if (!char || Math.random() < 0.28) {
					char = this.randomChar();
					this.queue[i].char = char;
				}
				output += `<span class="dud">${char}</span>`;
			} else {
				output += from;
			}
		}
		this.el.innerHTML = output;
		if (complete === this.queue.length) {
			this.resolve();
		} else {
			this.frameRequest = requestAnimationFrame(this.update);
			this.frame++;
		}
	}

	randomChar() {
		return this.chars[Math.floor(Math.random() * this.chars.length)];
	}
}

export default class TextScrambleController {
	constructor() {
		this.targets = document.querySelectorAll('.js-text-scramble');
		this.init();
	}

	init() {
		if (this.targets.length === 0) return;

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const el = entry.target;
					const text = el.getAttribute('data-text') || el.innerText;
					const htmlReplace = el.getAttribute('data-html-replace'); // HTML置換パターン
					const scramble = new TextScramble(el);

					// 一度空にしてからアニメーション開始
					// el.innerText = '';
					// 既存のテキストから遷移させるため、空にはしない

					scramble.setText(text).then(() => {
						// スクランブル完了後にHTML置換を実行
						if (htmlReplace) {
							try {
								const replaceMap = JSON.parse(htmlReplace);
								let html = el.innerHTML;
								Object.keys(replaceMap).forEach((key) => {
									const regex = new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
									html = html.replace(regex, replaceMap[key]);
								});
								el.innerHTML = html;
							} catch (e) {
								console.warn('Failed to parse data-html-replace:', e);
							}
						}
					});
					observer.unobserve(el);
				}
			});
		}, {
			threshold: 0.5
		});

		this.targets.forEach((target) => {
			// 元のテキストを保持
			if (!target.getAttribute('data-text')) {
				target.setAttribute('data-text', target.innerText);
			}
			observer.observe(target);
		});
	}
}