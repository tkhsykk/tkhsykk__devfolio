/**
 * Navigation
 * グローバルナビゲーションの制御（スマホ用ドロワーメニュー）
 */

class Navigation {
	constructor() {
		this.nav = document.querySelector('.p-portfolio__nav');
		this.toggleBtn = document.querySelector('[data-nav-toggle]');
		this.navContent = document.querySelector('[data-nav-content]');
		this.navLinks = document.querySelectorAll('.p-portfolio__nav-link');
		this.body = document.body;
		this.isOpen = false;

		if (!this.toggleBtn || !this.navContent) return;

		this.init();
	}

	init() {
		// トグルボタンのクリックイベント
		this.toggleBtn.addEventListener('click', () => this.toggle());

		// リンククリック時に閉じる
		this.navLinks.forEach(link => {
			link.addEventListener('click', () => {
				if (this.isOpen) {
					this.close();
				}
			});
		});

		// ESCキーで閉じる
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && this.isOpen) {
				this.close();
			}
		});

		// リサイズ時にPCサイズになったら閉じる（スタイル崩れ防止）
		window.addEventListener('resize', () => {
			if (window.innerWidth >= 768 && this.isOpen) {
				this.close();
			}
		});
	}

	toggle() {
		if (this.isOpen) {
			this.close();
		} else {
			this.open();
		}
	}

	open() {
		this.isOpen = true;
		this.toggleBtn.setAttribute('aria-expanded', 'true');
		this.toggleBtn.classList.add('is-active');
		this.navContent.classList.add('is-open');
		this.body.style.overflow = 'hidden'; // 背景固定
	}

	close() {
		this.isOpen = false;
		this.toggleBtn.setAttribute('aria-expanded', 'false');
		this.toggleBtn.classList.remove('is-active');
		this.navContent.classList.remove('is-open');
		this.body.style.overflow = ''; // 背景固定解除
	}
}

export function initNavigation() {
	new Navigation();
}
