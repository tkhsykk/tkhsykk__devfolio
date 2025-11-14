/**
 * Vite設定ファイル
 * React Router v7とViteの統合設定
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactRouter } from "@react-router/dev/vite";

export default defineConfig({
	plugins: [
		react(),
		reactRouter(),
	],
});
