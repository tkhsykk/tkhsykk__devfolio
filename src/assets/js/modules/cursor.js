/**
 * カスタムカーソル
 * マウスストーカーの実装
 */
export default class Cursor {
	constructor() {
		this.cursor = null;
		this.pos = { x: 0, y: 0 };
		this.mouse = { x: 0, y: 0 };
		this.speed = 0.1; // 追従速度
		
		this.init();
	}

	init() {
		// カーソル要素の生成
		this.cursor = document.createElement('div');
		this.cursor.className = 'c-cursor';
		document.body.appendChild(this.cursor);

		// イベントリスナー
		document.addEventListener('mousemove', this.onMouseMove.bind(this));
		
		// ホバー対象の監視
		const hoverTargets = document.querySelectorAll('a, button, [data-cursor-hover]');
		hoverTargets.forEach(target => {
			target.addEventListener('mouseenter', () => this.cursor.classList.add('is-hover'));
			target.addEventListener('mouseleave', () => this.cursor.classList.remove('is-hover'));
		});

		// アニメーションループ
		this.animate();
	}

	onMouseMove(e) {
		this.mouse.x = e.clientX;
		this.mouse.y = e.clientY;
		
		// 初期表示用（最初は非表示にしておき、マウスが動いたら表示するなど）
		if (!this.cursor.classList.contains('is-active')) {
			this.cursor.classList.add('is-active');
		}
	}

	animate() {
		// 線形補間による追従
		this.pos.x += (this.mouse.x - this.pos.x) * this.speed;
		this.pos.y += (this.mouse.y - this.pos.y) * this.speed;

		this.cursor.style.transform = `translate3d(${this.pos.x}px, ${this.pos.y}px, 0)`;

		requestAnimationFrame(this.animate.bind(this));
	}
}
