/**
 * Gulp設定ファイル
 * SCSSコンパイル、HTML処理、JavaScriptバンドル、開発サーバーを管理
 */

import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import cleanCSS from 'gulp-clean-css';
import htmlmin from 'gulp-htmlmin';
import { build as esbuild } from 'esbuild';
import browserSync from 'browser-sync';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const srcDir = join(__dirname, 'src');
const distDir = join(__dirname, 'site');

const paths = {
	html: {
		src: join(srcDir, 'index.html'),
		dist: distDir,
	},
	scss: {
		src: join(srcDir, 'assets/scss/**/*.scss'),
		dist: join(distDir, 'css'),
	},
	js: {
		src: join(srcDir, 'assets/js/**/*.js'),
		dist: join(distDir, 'js'),
	},
	assets: {
		src: join(srcDir, 'assets/**/*'),
		dist: join(distDir, 'assets'),
	},
};

/**
 * HTMLファイルをコピー
 */
export function html() {
	return gulp
		.src(paths.html.src)
		.pipe(gulp.dest(paths.html.dist));
}

/**
 * SCSSをコンパイルしてCSSを生成
 */
export function styles() {
	return gulp
		.src(paths.scss.src)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.scss.dist))
		.pipe(browserSync.stream());
}

/**
 * JavaScriptをバンドル
 * 注意: エントリーポイントファイルが存在する場合のみ実行
 */
export async function scripts() {
	// エントリーポイントファイルが存在するかチェック
	const fs = await import('fs');
	const jsFiles = fs.readdirSync(join(srcDir, 'assets/js'), { recursive: true })
		.filter((file) => file.endsWith('.js'))
		.map((file) => join(srcDir, 'assets/js', file));

	if (jsFiles.length === 0) {
		console.log('JavaScriptファイルが見つかりません。スキップします。');
		return Promise.resolve();
	}

	return esbuild({
		entryPoints: jsFiles,
		bundle: true,
		outdir: paths.js.dist,
		format: 'esm',
		sourcemap: true,
		minify: false,
	}).catch(() => process.exit(1));
}

/**
 * アセットファイルをコピー
 */
export function copyAssets() {
	return gulp.src(paths.assets.src).pipe(gulp.dest(paths.assets.dist));
}

/**
 * 開発サーバーを起動
 */
export function serve() {
	browserSync.init({
		server: {
			baseDir: distDir,
		},
		port: 3000,
		open: false,
	});

	gulp.watch(paths.html.src, html).on('change', browserSync.reload);
	gulp.watch(paths.scss.src, styles);
	gulp.watch(paths.js.src, scripts).on('change', browserSync.reload);
	gulp.watch(paths.assets.src, copyAssets).on('change', browserSync.reload);
}

/**
 * 本番用ビルド（minify + 最適化）
 */
export function buildProd() {
	return gulp
		.src(paths.html.src)
		.pipe(
			htmlmin({
				collapseWhitespace: true,
				removeComments: true,
			})
		)
		.pipe(gulp.dest(paths.html.dist));
}

/**
 * 本番用CSSビルド（minify）
 */
export function stylesProd() {
	return gulp
		.src(paths.scss.src)
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(cleanCSS())
		.pipe(gulp.dest(paths.scss.dist));
}

/**
 * 開発タスク
 */
export const dev = gulp.series(
	gulp.parallel(html, styles, scripts, copyAssets),
	serve
);

/**
 * 本番ビルドタスク
 */
export const build = gulp.series(
	gulp.parallel(buildProd, stylesProd, scripts, copyAssets)
);

export default dev;

