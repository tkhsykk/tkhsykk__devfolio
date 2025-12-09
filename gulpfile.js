/**
 * Gulp設定ファイル
 * SCSSコンパイル、HTML処理、JavaScriptバンドル、開発サーバーを管理
 */

import 'dotenv/config';
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
import { readFileSync, readdirSync, statSync, copyFileSync, mkdirSync, existsSync } from 'fs';
import Papa from 'papaparse';

const sass = gulpSass(dartSass);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * エラーハンドリング設定
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

/**
 * CSVファイルのパスを取得
 * 環境変数 PORTFOLIO_CSV_PATH が設定されている場合はそれを使用
 * それ以外の場合はデフォルトの private/portfolio.csv を使用
 */
const csvPath = process.env.PORTFOLIO_CSV_PATH || join(__dirname, 'private', 'portfolio.csv');
const imagesSrcDir = join(__dirname, 'private', 'images');
const imagesDistDir = join(distDir, 'images');

const paths = {
	ejs: {
		src: join(srcDir, 'index.ejs'),
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
 * セクション名とキーのマッピング
 */
const SECTION_MAP = {
	'Works': 'works',
	'Tech Notes': 'notes',
	'About': 'about',
	'Contact': 'contact',
};

/**
 * 画像ファイルの拡張子リスト
 */
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];

/**
 * 画像ファイルかどうかを判定
 * @param {string} fileName - ファイル名
 * @returns {boolean}
 */
function isImageFile(fileName) {
	if (!fileName) return false;
	return IMAGE_EXTENSIONS.some(ext => fileName.toLowerCase().endsWith(ext));
}

/**
 * 画像パスを処理（:linkサフィックス対応）
 * @param {string|Array} value - 画像ファイル名または配列
 * @param {string} selector - CSSセレクタ
 * @returns {string|Array|Object} 処理後の値
 */
function processImagePath(value, selector) {
	const isSliderSelector = selector === '.p-portfolio__work-details-content .c-slider__slide';
	const processSingleValue = (v) => {
		if (!v) return v;

		// :linkサフィックスの処理
		const hasLink = v.endsWith(':link');
		const fileName = hasLink ? v.replace(/:link$/, '') : v;

		// 画像ファイル名の場合
		if (isImageFile(fileName)) {
			const imagePath = `./images/${fileName}`;
			// スライダーセレクタの場合はオブジェクト形式で返す
			if (isSliderSelector) {
				return { src: imagePath, hasLink: hasLink };
			}
			return imagePath;
		}

		// スライダーセレクタで画像以外の場合はオブジェクト形式
		if (isSliderSelector) {
			return { src: fileName, hasLink: hasLink };
		}
		return fileName;
	};

	if (Array.isArray(value)) {
		return value.map(processSingleValue);
	}
	return processSingleValue(value);
}

/**
 * CSVファイルを読み込んでJSONに変換
 * @returns {Object} セクション別にグループ化されたデータ
 */
function loadCsvData() {
	try {
		// ファイルの存在確認
		if (!existsSync(csvPath)) {
			throw new Error(`ENOENT: no such file or directory, open ${csvPath}`);
		}

		const csvContent = readFileSync(csvPath, 'utf8');
		const parsed = Papa.parse(csvContent, {
			header: false,
			skipEmptyLines: true,
			delimiter: ',', // カンマを明示的に指定
			quoteChar: '"', // ダブルクォートでフィールドを囲む
			escapeChar: '"', // エスケープ文字
		});

		const rows = parsed.data.slice(1); // 1行目（説明行）をスキップ

		const result = {
			works: [],
			notes: [],
			about: [],
			contact: [],
		};

		let currentSection = null;
		let currentItemId = null;
		let currentItemData = {};

		/**
		 * 現在のアイテムを保存
		 */
		const saveCurrentItem = () => {
			if (currentItemId && currentItemData && Object.keys(currentItemData).length > 0 && currentSection) {
				const sectionKey = SECTION_MAP[currentSection];
				if (sectionKey && result[sectionKey]) {
					result[sectionKey].push({
						id: currentItemId,
						data: currentItemData,
					});
				}
			}
		};

		for (const row of rows) {
			const [sectionCol, itemIdCol, selectorCol, valueCol] = row.map(col => col !== undefined && col !== null ? String(col).trim() : '');

			// セクション見出し（A列のみ値がある）
			if (sectionCol && !itemIdCol && !selectorCol) {
				saveCurrentItem();
				currentSection = sectionCol;
				currentItemId = null;
				currentItemData = {};
				continue;
			}

			// アイテムID（B列のみ値がある）
			if (!sectionCol && itemIdCol && !selectorCol) {
				saveCurrentItem();
				currentItemId = itemIdCol;
				currentItemData = {};
				continue;
			}

			// セレクタと値（C列とD列に値がある）
			if (!sectionCol && !itemIdCol && selectorCol) {
				const selector = selectorCol;
				let value = valueCol || '';

				// `<br>|`で区切られた値を配列に変換（改行タグを含む）
				if (typeof value === 'string' && value.includes('<br>|')) {
					value = value.split('<br>|').map((v) => v.trim()).filter((v) => v);
				}
				// 通常のパイプ区切りの値を配列に変換（画像ファイルなど）
				else if (typeof value === 'string' && value.includes('|')) {
					value = value.split('|').map((v) => v.trim()).filter((v) => v);
				}

				// 画像パスの処理
				if (typeof value === 'string' && isImageFile(value)) {
					value = processImagePath(value, selector);
				} else if (Array.isArray(value) && value.some(v => typeof v === 'string' && isImageFile(v))) {
					value = processImagePath(value, selector);
				}

				currentItemData[selector] = value;
			}
		}

		saveCurrentItem(); // 最後のアイテムを保存

		return result;
	} catch (error) {
		if (error.code === 'ENOENT' || error.message.includes('ENOENT')) {
			console.error(`\n❌ CSVファイルが見つかりません: ${csvPath}`);
		} else {
			console.error('CSV読み込みエラー:', error);
		}
		return { works: [], notes: [], about: [], contact: [] };
	}
}

/**
 * EJSテンプレートをコンパイルしてHTMLを生成
 * @param {boolean} minify - HTMLをminifyするか
 * @returns {Stream}
 */
function compileEjs(minify = false) {
	const csvData = loadCsvData();
	let stream = gulp
		.src(paths.ejs.src)
		.pipe(plumber(plumberOptions))
		.pipe(ejs({ portfolio: csvData }, {}))
		.pipe(rename({ extname: '.html' }));

	if (minify) {
		stream = stream.pipe(
			htmlmin({
				collapseWhitespace: true,
				removeComments: true,
			})
		);
	}

	return stream.pipe(gulp.dest(paths.ejs.dist));
}

/**
 * SCSSをコンパイル
 * @param {boolean} useSourcemaps - ソースマップを使用するか
 * @returns {Stream}
 */
function compileScss(useSourcemaps = true) {
	let stream = gulp.src(paths.scss.src).pipe(plumber(plumberOptions));

	// ソースマップを初期化（最初に呼ぶ必要がある）
	if (useSourcemaps) {
		stream = stream.pipe(sourcemaps.init());
	}

	// SCSSコンパイル
	stream = stream.pipe(sass().on('error', sass.logError));

	// PostCSS処理
	stream = stream.pipe(postcss([autoprefixer(), combineMediaQuery()]));

	// 開発環境では minify をスキップ（ソースマップを壊さないため）
	if (!useSourcemaps) {
		stream = stream.pipe(
			cleanCSS({
				level: {
					1: {
						specialComments: 0,
					},
				},
			})
		);
	}

	// ソースマップを書き込み
	if (useSourcemaps) {
		stream = stream.pipe(sourcemaps.write('.'));
	}

	stream = stream.pipe(gulp.dest(paths.scss.dist));

	if (useSourcemaps) {
		stream = stream.pipe(browserSync.stream());
	}

	return stream;
}

/**
 * EJSテンプレートをコンパイル（開発用）
 */
export function html() {
	return compileEjs(false);
}

/**
 * SCSSをコンパイル（開発用）
 */
export function styles() {
	return compileScss(true);
}

/**
 * JSバンドル（esbuild）
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
 * 画像ファイルをコピー
 */
export function copyImages(done) {
	try {
		if (!existsSync(imagesDistDir)) {
			mkdirSync(imagesDistDir, { recursive: true });
		}

		const files = readdirSync(imagesSrcDir);

		for (const file of files) {
			const filePath = join(imagesSrcDir, file);
			const stat = statSync(filePath);

			if (stat.isFile()) {
				const ext = file.toLowerCase().substring(file.lastIndexOf('.'));
				if (IMAGE_EXTENSIONS.includes(ext)) {
					const destPath = join(imagesDistDir, file);
					copyFileSync(filePath, destPath);
				}
			}
		}

		done();
	} catch (error) {
		console.error('画像コピーエラー:', error);
		done(error);
	}
}

/**
 * EJSファイル変更時の処理（開発用）
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
	gulp.watch(csvPath, htmlWatch);
	gulp.watch(join(srcDir, 'assets/scss/**/*.scss'), styles);
	gulp.watch(paths.js.src, scripts).on('change', browserSync.reload);
	gulp.watch(join(imagesSrcDir, '**/*.{png,jpg,jpeg,gif,webp}'), copyImages).on('change', browserSync.reload);
}

/**
 * EJSテンプレートをコンパイル（本番用）
 */
export function buildProd() {
	return compileEjs(true);
}

/**
 * SCSSをコンパイル（本番用）
 */
export function stylesProd() {
	return compileScss(false);
}

/**
 * 開発環境
 */
export const dev = gulp.series(
	gulp.parallel(html, styles, scripts, copyImages),
	serve
);

/**
 * 本番ビルド
 */
export const build = gulp.series(
	gulp.parallel(buildProd, stylesProd, scripts, copyImages)
);

export default dev;
