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
import './slider.js';

/* 5. ワーク詳細パネル */
import './details.js';
