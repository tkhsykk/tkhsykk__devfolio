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
import ejs from 'gulp-ejs';
import rename from 'gulp-rename';
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
	ejs: {
		src: join(srcDir, 'index.ejs'),
		dist: distDir,
	},
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
};

/**
 * EJSテンプレートをコンパイルしてHTMLを生成
 */
export function html() {
	return gulp
		.src(paths.ejs.src)
		.pipe(plumber(plumberOptions))
		.pipe(ejs({}, {}))
		.pipe(rename({ extname: '.html' }))
		.pipe(gulp.dest(paths.ejs.dist));
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
 * main.jsをエントリーポイントとして、すべてのJSを1つのファイルにバンドル
 */
export async function scripts() {
	const mainJsPath = join(srcDir, 'assets/js/main.js');

	return esbuild({
		entryPoints: [mainJsPath],
		bundle: true,
		outfile: join(paths.js.dist, 'main.js'),
		format: 'esm',
		sourcemap: true,
		minify: true,
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
 * EJSファイル変更時の処理（開発用）
 * htmlタスクを実行してからBrowserSyncをリロード
 */
function htmlWatch(done) {
	const stream = html();
	stream.on('end', () => {
		browserSync.reload();
		done();
	});
	stream.on('error', done);
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

	gulp.watch(join(srcDir, '**/*.ejs'), htmlWatch);
	gulp.watch(join(srcDir, 'assets/scss/**/*.scss'), styles);
	gulp.watch(paths.js.src, scripts).on('change', browserSync.reload);
}

/**
 * EJSテンプレートをコンパイルしてHTMLを生成（本番用）
 * minifyも同時に実行
 */
export function buildProd() {
	return gulp
		.src(paths.ejs.src)
		.pipe(plumber(plumberOptions))
		.pipe(ejs({}, {}))
		.pipe(rename({ extname: '.html' }))
		.pipe(
			htmlmin({
				collapseWhitespace: true,
				removeComments: true,
			})
		)
		.pipe(gulp.dest(paths.ejs.dist));
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
	gulp.parallel(html, styles, scripts),
	serve
);

/**
 * 本番ビルド
 * SCSS/JSはバンドル後のファイルのみがsite/に配置される
 */
export const build = gulp.series(
	gulp.parallel(buildProd, stylesProd, scripts)
);

export default dev;
