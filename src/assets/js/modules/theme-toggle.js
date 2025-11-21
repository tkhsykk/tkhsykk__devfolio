/**
 * テーマ切り替えモジュール
 * ライト/ダークモードの切り替えを管理
 */

export default class ThemeToggle {
	constructor() {
		this.STORAGE_KEY = 'theme';
		this.DARK_THEME_VALUE = 'dark';
		this.LIGHT_THEME_VALUE = 'light';
		
		this.init();
	}

	init() {
		this.applyInitialTheme();
		this.createToggle();
	}

	/**
	 * 初期テーマの適用
	 * 1. LocalStorage
	 * 2. OS設定 (prefers-color-scheme)
	 */
	applyInitialTheme() {
		const savedTheme = localStorage.getItem(this.STORAGE_KEY);
		
		if (savedTheme) {
			document.documentElement.setAttribute('data-theme', savedTheme);
		} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			document.documentElement.setAttribute('data-theme', this.DARK_THEME_VALUE);
		}
	}

	/**
	 * トグルボタンの生成とイベント設定
	 */
	createToggle() {
		// ナビゲーション内にトグルボタンを追加
		const navInner = document.querySelector('.p-portfolio__nav-inner');
		if (!navInner) return;

		const button = document.createElement('button');
		button.className = 'c-theme-toggle';
		button.setAttribute('aria-label', 'テーマ切り替え');
		button.innerHTML = `
			<svg class="c-theme-toggle__icon c-theme-toggle__icon--sun" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
			<svg class="c-theme-toggle__icon c-theme-toggle__icon--moon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
		`;

		button.addEventListener('click', () => this.toggleTheme());
		
		// ロゴの横あたりに追加
		navInner.appendChild(button);
	}

	/**
	 * テーマの切り替え処理
	 */
	toggleTheme() {
		const currentTheme = document.documentElement.getAttribute('data-theme');
		const newTheme = currentTheme === this.DARK_THEME_VALUE ? this.LIGHT_THEME_VALUE : this.DARK_THEME_VALUE;

		document.documentElement.setAttribute('data-theme', newTheme);
		localStorage.setItem(this.STORAGE_KEY, newTheme);
	}
}
