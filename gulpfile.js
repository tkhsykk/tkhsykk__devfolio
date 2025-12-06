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
import { readFileSync, readdirSync, statSync, copyFileSync, mkdirSync } from 'fs';
import { existsSync } from 'fs';
import Papa from 'papaparse';

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
const csvPath = join(__dirname, 'private', 'portfolio.csv');
const imagesSrcDir = join(__dirname, 'private', 'images');
const imagesDistDir = join(distDir, 'images');

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
 * CSVファイルを読み込んでJSONに変換
 * @returns {Object} セクション別にグループ化されたデータ
 */
function loadCsvData() {
	try {
		const csvContent = readFileSync(csvPath, 'utf8');
		const parsed = Papa.parse(csvContent, {
			header: false,
			skipEmptyLines: true,
		});

		// 1行目（説明行）をスキップ
		const rows = parsed.data.slice(1);

		const result = {
			works: [],
			notes: [],
		};

		let currentSection = null;
		let currentItemId = null;
		let currentItemData = {};

		for (const row of rows) {
			const [sectionCol, itemIdCol, selectorCol, valueCol] = row;

			// セクション見出し（A列のみ値がある）
			if (sectionCol && !itemIdCol && !selectorCol) {
				// セクションが変わる前に、前のアイテムを保存
				if (currentItemId && currentItemData && Object.keys(currentItemData).length > 0) {
					if (currentSection === 'Works') {
						result.works.push({
							id: currentItemId,
							data: currentItemData,
						});
					} else if (currentSection === 'Tech Notes') {
						result.notes.push({
							id: currentItemId,
							data: currentItemData,
						});
					}
				}

				// 新しいセクションを設定
				currentSection = sectionCol.trim();
				currentItemId = null;
				currentItemData = {};
				continue;
			}

			// アイテムID（B列のみ値がある）
			if (!sectionCol && itemIdCol && !selectorCol) {
				// 前のアイテムを保存（セレクタがあれば保存）
				if (currentItemId && currentItemData && Object.keys(currentItemData).length > 0) {
					if (currentSection === 'Works') {
						result.works.push({
							id: currentItemId,
							data: currentItemData,
						});
					} else if (currentSection === 'Tech Notes') {
						result.notes.push({
							id: currentItemId,
							data: currentItemData,
						});
					}
				}

				// 新しいアイテムを開始
				currentItemId = itemIdCol.trim();
				currentItemData = {};
				continue;
			}

			// セレクタと値（C列とD列に値がある、値が空でもセレクタがあれば保存）
			if (!sectionCol && !itemIdCol && selectorCol && selectorCol.trim()) {
				const selector = selectorCol.trim();
				let value = valueCol !== undefined ? valueCol.trim() : '';

				// パイプ区切りの値を配列に変換
				if (value.includes('|')) {
					value = value.split('|').map((v) => v.trim()).filter((v) => v);
				}

				// 画像スライダーのセレクタの場合、:linkサフィックスを処理
				if (selector === '.p-portfolio__work-details-content .c-slider__slide') {
					if (Array.isArray(value)) {
						value = value.map((v) => {
							// :linkサフィックスを検出
							const hasLink = v.endsWith(':link');
							const fileName = hasLink ? v.replace(/:link$/, '') : v;

							// 画像ファイル名の場合、パスを付与してオブジェクトに変換
							if (fileName && /\.(png|jpg|jpeg|gif|webp)$/i.test(fileName)) {
								return {
									src: `./images/${fileName}`,
									hasLink: hasLink,
								};
							}
							return { src: fileName, hasLink: hasLink };
						});
					} else if (value) {
						// 単一値の場合も同様に処理
						const hasLink = value.endsWith(':link');
						const fileName = hasLink ? value.replace(/:link$/, '') : value;
						if (/\.(png|jpg|jpeg|gif|webp)$/i.test(fileName)) {
							value = {
								src: `./images/${fileName}`,
								hasLink: hasLink,
							};
						} else {
							value = { src: fileName, hasLink: hasLink };
						}
					}
				} else {
					// 画像パスの変換（ファイル名のみの場合、./images/を付与）
					if (Array.isArray(value)) {
						value = value.map((v) => {
							if (v && /\.(png|jpg|jpeg|gif|webp)$/i.test(v)) {
								return `./images/${v}`;
							}
							return v;
						});
					} else if (value && /\.(png|jpg|jpeg|gif|webp)$/i.test(value)) {
						value = `./images/${value}`;
					}
				}

				currentItemData[selector] = value;
			}
		}

		// 最後のアイテムを保存（セレクタがあれば保存）
		if (currentItemId && currentItemData && Object.keys(currentItemData).length > 0) {
			if (currentSection === 'Works') {
				result.works.push({
					id: currentItemId,
					data: currentItemData,
				});
			} else if (currentSection === 'Tech Notes') {
				result.notes.push({
					id: currentItemId,
					data: currentItemData,
				});
			}
		}

		// デバッグ用ログ（開発時のみ）
		if (process.env.NODE_ENV !== 'production') {
			console.log('CSVパース結果:', {
				worksCount: result.works.length,
				notesCount: result.notes.length,
				worksIds: result.works.map((w) => w.id),
				notesIds: result.notes.map((n) => n.id),
			});
		}

		return result;
	} catch (error) {
		console.error('CSV読み込みエラー:', error);
		return { works: [], notes: [] };
	}
}

/**
 * EJSテンプレートをコンパイルしてHTMLを生成
 */
export function html() {
	const csvData = loadCsvData();

	return gulp
		.src(paths.ejs.src)
		.pipe(plumber(plumberOptions))
		.pipe(ejs({ portfolio: csvData }, {}))
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
 * 画像ファイルをコピー
 * private/images/ から site/images/ にコピー
 * バイナリファイルのため、Node.jsのfsモジュールで直接コピー
 */
export function copyImages(done) {
	try {
		// 出力ディレクトリが存在しない場合は作成
		if (!existsSync(imagesDistDir)) {
			mkdirSync(imagesDistDir, { recursive: true });
		}

		// 画像ファイルをコピー
		const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];
		const files = readdirSync(imagesSrcDir);

		for (const file of files) {
			const filePath = join(imagesSrcDir, file);
			const stat = statSync(filePath);

			if (stat.isFile()) {
				const ext = file.toLowerCase().substring(file.lastIndexOf('.'));
				if (imageExtensions.includes(ext)) {
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
	gulp.watch(join(imagesSrcDir, '**/*.{png,jpg,jpeg,gif,webp}'), copyImages).on('change', browserSync.reload);
}

/**
 * EJSテンプレートをコンパイルしてHTMLを生成（本番用）
 * minifyも同時に実行
 */
export function buildProd() {
	const csvData = loadCsvData();

	return gulp
		.src(paths.ejs.src)
		.pipe(plumber(plumberOptions))
		.pipe(ejs({ portfolio: csvData }, {}))
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
	gulp.parallel(html, styles, scripts, copyImages),
	serve
);

/**
 * 本番ビルド
 * SCSS/JSはバンドル後のファイルのみがsite/に配置される
 */
export const build = gulp.series(
	gulp.parallel(buildProd, stylesProd, scripts, copyImages)
);

export default dev;
