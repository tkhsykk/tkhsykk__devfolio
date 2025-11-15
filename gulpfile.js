/**
 * Gulp設定ファイル
 * SCSSコンパイル、HTML処理、JavaScriptバンドル、開発サーバーを管理
 */

import gulp from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import combineMediaQuery from 'postcss-combine-media-query';
import sourcemaps from 'gulp-sourcemaps';
import cleanCSS from 'gulp-clean-css';
import htmlmin from 'gulp-htmlmin';
import { build as esbuild } from 'esbuild';
import browserSync from 'browser-sync';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const sass = gulpSass(dartSass);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * エラーハンドリング設定
 * plumberでエラー時にストリームを継続し、notifyでポップアップ通知
 */
const plumberOptions = {
	errorHandler: notify.onError({
		title: 'Gulp Error',
		message: '<%= error.message %>',
		sound: false,
	}),
};

const srcDir = join(__dirname, 'src');
const distDir = join(__dirname, 'site');

const paths = {
	html: {
		src: join(srcDir, 'index.html'),
		dist: distDir,
	},
	scss: {
		src: join(srcDir, 'assets/scss/style.scss'),
		dist: join(distDir, 'css'),
	},
	js: {
		src: join(srcDir, 'assets/js/**/*.js'),
		dist: join(distDir, 'js'),
	},
	assets: {
		// 画像、フォント、その他のアセットのみ（SCSS/JSは除外）
		src: [
			join(srcDir, 'assets/**/*'),
			`!${join(srcDir, 'assets/scss/**/*')}`,
			`!${join(srcDir, 'assets/js/**/*')}`,
		],
		dist: join(distDir, 'assets'),
	},
};

/**
 * HTMLファイルをコピー
 */
export function html() {
	return gulp
		.src(paths.html.src)
		.pipe(plumber(plumberOptions))
		.pipe(gulp.dest(paths.html.dist));
}

/**
 * SCSSコンパイル（dart-sass版）
 * PostCSSでautoprefixerとメディアクエリ結合を実行
 * cleanCSSでコメントを削除（開発環境でもコメント削除）
 */
export function styles() {
	return gulp
		.src(paths.scss.src)
		.pipe(plumber(plumberOptions))
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(postcss([autoprefixer(), combineMediaQuery()]))
		.pipe(
			cleanCSS({
				level: {
					1: {
						specialComments: 0, // すべてのコメントを削除
					},
				},
			})
		)
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.scss.dist))
		.pipe(browserSync.stream());
}

/**
 * JSバンドル（esbuild）
 */
export async function scripts() {
	const fs = await import('fs');

	// JSファイル探索
	const jsFiles = fs
		.readdirSync(join(srcDir, 'assets/js'), { recursive: true })
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
	}).catch((error) => {
		notify.onError({
			title: 'JavaScript Build Error',
			message: error.message || 'JavaScriptのビルドに失敗しました',
			sound: false,
		})();
		console.error('JavaScriptビルドエラー:', error);
		process.exit(1);
	});
}

/**
 * アセットコピー（画像、フォントなど、SCSS/JS以外）
 * SCSS/JSのソースファイルは最初からコピーしない
 */
export function copyAssets() {
	return gulp
		.src(paths.assets.src, { allowEmpty: true })
		.pipe(plumber(plumberOptions))
		.pipe(gulp.dest(paths.assets.dist));
}

/**
 * BrowserSync（開発サーバー）
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
	gulp.watch(join(srcDir, 'assets/scss/**/*.scss'), styles);
	gulp.watch(paths.js.src, scripts).on('change', browserSync.reload);
	gulp.watch(paths.assets.src, copyAssets).on('change', browserSync.reload);
}

/**
 * HTML minify（本番用）
 */
export function buildProd() {
	return gulp
		.src(paths.html.src)
		.pipe(plumber(plumberOptions))
		.pipe(
			htmlmin({
				collapseWhitespace: true,
				removeComments: true,
			})
		)
		.pipe(gulp.dest(paths.html.dist));
}

/**
 * CSS minify（本番用）
 * PostCSSでautoprefixerとメディアクエリ結合を実行
 * cleanCSSでコメントを削除し、CSSを圧縮
 */
export function stylesProd() {
	return gulp
		.src(paths.scss.src)
		.pipe(plumber(plumberOptions))
		.pipe(sass().on('error', sass.logError))
		.pipe(postcss([autoprefixer(), combineMediaQuery()]))
		.pipe(
			cleanCSS({
				level: {
					1: {
						specialComments: 0, // すべてのコメントを削除
					},
				},
			})
		)
		.pipe(gulp.dest(paths.scss.dist));
}

/**
 * 開発環境
 */
export const dev = gulp.series(
	gulp.parallel(html, styles, scripts, copyAssets),
	serve
);

/**
 * 本番ビルド
 * SCSS/JSはバンドル後のファイルのみがsite/に配置される
 */
export const build = gulp.series(
	gulp.parallel(buildProd, stylesProd, scripts, copyAssets)
);

export default dev;
