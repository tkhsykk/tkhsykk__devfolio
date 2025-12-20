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
import { dirname, join, isAbsolute } from 'path';
import { readFileSync, readdirSync, statSync, copyFileSync, mkdirSync, existsSync } from 'fs';
import Papa from 'papaparse';
import dotenv from 'dotenv';

const sass = gulpSass(dartSass);
dotenv.config();

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
const csvPathEnv = process.env.PORTFOLIO_CSV_PATH;
const csvPath = csvPathEnv
	? (isAbsolute(csvPathEnv) ? csvPathEnv : join(__dirname, csvPathEnv))
	: join(__dirname, 'private', 'sample.csv');

// CSVファイルのディレクトリパスを取得し、そこからimagesフォルダのパスを生成
const csvDir = csvPathEnv
	? (isAbsolute(csvPathEnv) ? dirname(csvPathEnv) : join(__dirname, dirname(csvPathEnv)))
	: join(__dirname, 'private');
const imagesSrcDir = join(csvDir, 'images');
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
const LINK_SELECTOR = '.p-portfolio__work-details-link';
const DEFAULT_LINK_TEXT = 'サイトを見る';
const LINK_SUFFIX = ':link';

/**
 * 画像ファイルかどうかを判定
 * @param {string} fileName - ファイル名
 * @returns {boolean}
 */
function isImageFile(fileName) {
	if (!fileName) return false;
	const normalized = stripLinkSuffix(String(fileName)).trim().toLowerCase();
	return IMAGE_EXTENSIONS.some(ext => normalized.endsWith(ext));
}

/**
 * :linkサフィックスを除去
 * @param {string} fileName
 * @returns {string}
 */
function stripLinkSuffix(fileName = '') {
	const value = String(fileName);
	return value.endsWith(LINK_SUFFIX) ? value.slice(0, -LINK_SUFFIX.length) : value;
}

/**
 * 画像パスを ./images/ 配下に解決（既存パスは尊重）
 * @param {string} fileName
 * @returns {string}
 */
function resolveImagePath(fileName) {
	const normalized = stripLinkSuffix(String(fileName)).trim();

	if (/^(https?:)?\/\//i.test(normalized)) {
		return normalized;
	}
	if (normalized.startsWith('./images/')) {
		return normalized;
	}
	if (normalized.startsWith('/images/')) {
		return `.${normalized}`;
	}
	if (normalized.startsWith('images/')) {
		return `./${normalized}`;
	}

	return `./images/${normalized}`;
}

/**
 * 画像パスを処理（:linkサフィックス対応）
 * @param {string|Array} value - 画像ファイル名または配列
 * @param {string} selector - CSSセレクタ
 * @returns {string|Array|Object} 処理後の値
 */
function processImagePath(value, selector) {
	const processSingleValue = (v) => {
		if (!v) return v;

		if (typeof v === 'object' && !Array.isArray(v) && v.src) {
			return { src: resolveImagePath(v.src), hasLink: Boolean(v.hasLink) };
		}

		// :linkサフィックスの処理
		const raw = String(v).trim();
		const hasLink = raw.endsWith(LINK_SUFFIX);
		const fileName = stripLinkSuffix(raw);

		// 画像ファイル名の場合
		if (isImageFile(raw)) {
			return { src: resolveImagePath(fileName), hasLink };
		}

		// 画像以外の場合はそのままのファイル名を使用
		return { src: fileName, hasLink };
	};

	if (Array.isArray(value)) {
		return value.map(processSingleValue);
	}
	return processSingleValue(value);
}

/**
 * サイトリンク用の値を正規化
 * @param {string|Array|Object} value - CSVから取得した生値
 * @returns {{url: string, text: string}} 正規化したリンクオブジェクト
 */
function normalizeLinkValue(value) {
	if (!value) {
		return { url: '', text: DEFAULT_LINK_TEXT };
	}

	// すでにオブジェクトならそのまま利用
	if (typeof value === 'object' && !Array.isArray(value)) {
		return {
			url: (value.url || '').trim(),
			text: (value.text || value.label || DEFAULT_LINK_TEXT).trim(),
		};
	}

	// 文字列や配列を共通処理に寄せる
	const parts = Array.isArray(value)
		? value
		: String(value).split('|');

	return {
		url: (parts[0] || '').trim(),
		text: (parts[1] || DEFAULT_LINK_TEXT).trim(),
	};
}

/**
 * CSVファイルを読み込んでJSONに変換
 * @returns {Object} セクション別にグループ化されたデータ
 */
function loadCsvData() {
	try {
		console.log('📄 CSVファイルを読み込み中:', csvPath);
		const csvContent = readFileSync(csvPath, 'utf8');
		const parsed = Papa.parse(csvContent, {
			header: false,
			skipEmptyLines: true,
			delimiter: ',', // カンマを明示的に指定
			quoteChar: '"', // ダブルクォートでフィールドを囲む
			escapeChar: '"', // エスケープ文字
		});

		if (parsed.errors && parsed.errors.length > 0) {
			console.error('❌ CSVパースエラーが検出されたためビルドを中断します:');
			parsed.errors.forEach((error, index) => {
				console.error(
					`  ${index + 1}. row=${error.row ?? 'unknown'} col=${error.column ?? 'unknown'} message=${error.message ?? '不明なエラー'}`
				);
			});
			throw new Error('CSVのパースに失敗しました。エラー内容を確認してください。');
		}

		const rows = parsed.data.slice(1); // 1行目（説明行）をスキップ
		console.log(`✅ CSVファイル読み込み成功: ${rows.length}行を処理`);

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

				// 画像用：| 区切りは必ず配列化
				if (typeof value === 'string' && value.includes('|')) {
					value = value.split('|').map(v => v.trim()).filter(Boolean);
				}

				// ワーク詳細リンクは専用の正規化を実施
				if (selector === LINK_SELECTOR) {
					currentItemData[selector] = normalizeLinkValue(value);
					continue;
				}

				// 物理改行`<br>`に変換
				if (typeof value === 'string') {
					value = value.replace(/\r?\n/g, '<br>');
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

		// デバッグログ: セクションごとのアイテム数を出力
		console.log('\n📊 CSVデータ解析結果:');
		for (const [sectionName, sectionKey] of Object.entries(SECTION_MAP)) {
			const items = result[sectionKey];
			console.log(`  ${sectionName}: ${items.length}件のアイテム`);
			items.forEach(item => {
				const selectorCount = Object.keys(item.data).length;
				console.log(`    - ${item.id}: ${selectorCount}個のセレクタ`);
			});
		}

		return result;
	} catch (error) {
		console.error('❌ CSV読み込みエラー:', error);
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

	// デバッグログ: EJSテンプレートへのデータ渡し確認
	console.log('\n📝 EJSテンプレートをコンパイル中...');
	const totalItems = csvData.works.length + csvData.notes.length + csvData.about.length + csvData.contact.length;
	console.log(`   CSVデータをEJSテンプレートに渡します（合計${totalItems}アイテム）`);

	let stream = gulp
		.src(paths.ejs.src)
		.pipe(plumber(plumberOptions))
		.pipe(ejs({ portfolio: csvData }, {}))
		.pipe(rename({ extname: '.html' }));

	if (minify) {
		stream = stream.pipe(
			htmlmin({
				collapseWhitespace: false, // 改行を保持するためにfalseに設定
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
	let stream = gulp
		.src(paths.scss.src)
		.pipe(plumber(plumberOptions));

	if (useSourcemaps) {
		stream = stream.pipe(sourcemaps.init());
	}

	stream = stream
		.pipe(sass().on('error', sass.logError))
		.pipe(postcss([autoprefixer(), combineMediaQuery()]))
		.pipe(
			cleanCSS({
				level: {
					1: {
						specialComments: 0,
					},
				},
			})
		);

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
		if (!existsSync(imagesSrcDir)) {
			console.warn(
				'⚠ imagesSrcDir が存在しないため画像コピーをスキップ:',
				imagesSrcDir
			);
			done();
			return;
		}

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
					copyFileSync(filePath, join(imagesDistDir, file));
				}
			}
		}

		done();
	} catch (error) {
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
	gulp.watch(csvPath, gulp.series(copyImages, htmlWatch));
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
	gulp.parallel(buildProd, stylesProd, scripts, copyImages),
	(done) => {
		console.log('\n✅ ビルド完了！');
		console.log(`📁 出力先: ${distDir}`);
		const csvData = loadCsvData();
		const totalItems = csvData.works.length + csvData.notes.length + csvData.about.length + csvData.contact.length;
		console.log(`📊 CSVデータ出力確認: ${totalItems}アイテムがHTMLに反映されています`);
		done();
	}
);

export default dev;
