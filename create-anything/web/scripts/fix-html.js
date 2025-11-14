/**
 * ビルド後のHTMLファイルを修正するスクリプト
 * <head>タグとCSSの<link>タグを追加
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const buildClientDir = join(__dirname, '../build/client');
const assetsDir = join(buildClientDir, 'assets');

// CSSファイルを検索
function findCSSFile() {
	const files = readdirSync(assetsDir);
	const cssFile = files.find(file => file.endsWith('.css'));
	return cssFile ? `assets/${cssFile}` : null;
}

// HTMLファイルを修正
function fixHTML() {
	const htmlPath = join(buildClientDir, 'index.html');
	const html = readFileSync(htmlPath, 'utf-8');

	const cssFile = findCSSFile();
	if (!cssFile) {
		console.error('CSSファイルが見つかりません');
		return;
	}

	// <head>タグとCSSの<link>タグを追加
	// HTMLファイルが1行にまとまっている可能性があるため、正規表現を修正
	let fixedHTML = html;

	// <head>タグが既に正しい位置にあるかチェック
	const hasHeadTag = fixedHTML.match(/<!DOCTYPE html>\s*<html[^>]*>\s*<head>/);
	let needsHeadTag = !hasHeadTag;

	if (needsHeadTag) {
		// 1行にまとまっている場合のチェック
		if (fixedHTML.includes('<!DOCTYPE html><html') && fixedHTML.includes('<head>')) {
			// <head>タグが存在するが、位置が正しくない可能性がある
			// <!DOCTYPE html><html><body>のパターンで始まっている場合は修正が必要
			if (fixedHTML.startsWith('<!DOCTYPE html><html><body>')) {
				// 修正が必要
			} else {
				console.log('既に<head>タグが含まれていますが、位置を確認します。');
				// 正しい位置にあるかチェック
				const correctPattern = /<!DOCTYPE html>\s*<html[^>]*>\s*<head>/;
				if (correctPattern.test(fixedHTML)) {
					console.log('既に<head>タグが正しい位置にあります。');
					needsHeadTag = false;
				}
			}
		}
	} else {
		console.log('既に<head>タグが正しい位置にあります。');
	}

	// <head>タグが必要な場合のみ追加
	if (needsHeadTag) {
		// <!DOCTYPE html><html><body>のパターンを検索して置換
		const pattern1 = /<!DOCTYPE html><html><body>/;
		if (pattern1.test(fixedHTML)) {
			fixedHTML = fixedHTML.replace(
				pattern1,
				`<!DOCTYPE html>
<html lang="ja">
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link rel="stylesheet" href="${cssFile}" />
	<title>Portfolio</title>
</head>
<body>`
			);
			console.log('パターン1で置換しました');
		} else {
			// 別のアプローチ: <html>タグの後に<head>を挿入
			const pattern2 = /<!DOCTYPE html><html>/;
			if (pattern2.test(fixedHTML)) {
				fixedHTML = fixedHTML.replace(
					pattern2,
					`<!DOCTYPE html>
<html lang="ja">
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link rel="stylesheet" href="${cssFile}" />
	<title>Portfolio</title>
</head>`
				);
				// 最初の<body>タグを削除（既に追加されているため）
				fixedHTML = fixedHTML.replace(/<body>/, '', 1);
				console.log('パターン2で置換しました');
			} else {
				console.error('HTMLのパターンが見つかりませんでした。HTMLの先頭:', fixedHTML.substring(0, 200));
			}
		}
	}

	// 絶対パス（/assets/）を相対パス（./assets/）に変換
	// ESモジュールのインポートでは ./ で始まる必要がある
	fixedHTML = fixedHTML.replace(/\/assets\//g, './assets/');
	// 既に assets/ となっている場合も ./assets/ に変換（import文やJSON内のパスなど）
	// import文のパスを変換
	fixedHTML = fixedHTML.replace(/(import\s+.*?\s+from\s+["'])assets\//g, '$1./assets/');
	// JSON内のパス（"module": "assets/..."など）を変換
	fixedHTML = fixedHTML.replace(/(["']):\s*["']assets\//g, '$1: "./assets/');
	fixedHTML = fixedHTML.replace(/(["'])\s*:\s*\[?\s*["']assets\//g, '$1: ["./assets/');
	// その他の "assets/ や 'assets/ を ./assets/ に変換
	fixedHTML = fixedHTML.replace(/(["'])assets\//g, '$1./assets/');

	writeFileSync(htmlPath, fixedHTML, 'utf-8');
	console.log('HTMLファイルを修正しました:', cssFile);
	console.log('絶対パスを相対パスに変換しました（ESモジュール対応）');
}

fixHTML();

