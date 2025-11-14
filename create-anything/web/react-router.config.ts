/**
 * React Router設定ファイル
 * 静的サイト生成（SSG）モードでビルドするための設定
 * SSRを有効にしてプリレンダリングを行うことで、静的HTMLファイルを生成
 */
import type { Config } from '@react-router/dev/config';

export default {
	appDirectory: './src/app',
	ssr: true, // SSRを有効にしてプリレンダリングを実行
	prerender: true, // すべてのルートをプリレンダリングして静的HTMLを生成
} satisfies Config;
