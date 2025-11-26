/**
 * メインJavaScriptファイル
 *
 * 概要:
 * - ポリフィルの読み込み
 * - MicroModalの初期化
 * - 各機能モジュールの読み込み
 *
 * 主な仕様:
 * - ポリフィルとライブラリの初期化
 * - 各機能モジュールの統合
 */

/* 1. ポリフィル */
import '@oddbird/popover-polyfill';

/* 2. ライブラリ */
import MicroModal from 'micromodal';

/* 3. init */
MicroModal.init({
	disableScroll: true
});

/* 4. スライダー */
import './modules/image-slider.js';

/* 5. ワーク詳細パネル */
import './modules/work-details.js';

/* 6. テーマ切り替え */
import ThemeToggle from './modules/theme-toggle.js';
new ThemeToggle();

/* 7. スクロールアニメーション */
import ScrollAnimation from './modules/scroll-animation.js';
new ScrollAnimation();

/* 8. カスタムカーソル */
import Cursor from './modules/cursor.js';
new Cursor();

/* 9. テキストスクランブル */
import TextScramble from './modules/text-scramble.js';
new TextScramble();

