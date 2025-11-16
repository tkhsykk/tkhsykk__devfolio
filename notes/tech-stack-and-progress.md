# 技術スタックと進捗メモ

## プロジェクト概要

Anythingで生成されたReact Router v7 + Tailwind CSS から Gulp + SCSS (PDFLOCSS) + EJS + CSV への移行プロジェクト。

### devfolio開発フロー

01. ChatGPTに開発の流れを相談、ポートフォリオに必要な項目を挙げてもらう
03. ChatGPTに書いてもらったプロンプトを調整、それを元に[Anything](https://www.createanything.com/)でざっくりしたデザインを生成
04. Anythingで生成されたReact+Vite+Tailwind CSSのソースをダウンロード
05. ローカルでビルドできるよう調整
06. 自分で作ったCursor用汎用指示書mdcを設置し、ChatGPTと相談して一連の開発計画とチェックリストを作成（@gulp-scss-ejs-csv.plan.md）。以降はこのチェックリストに沿って開発
07. Cursor ProでReact->HTML+CSS+JSへ変換、Tailwindを剥がしてPDFLOCSS形式へ変換
09. Gulp + SCSS の開発環境構築（watch + BrowserSync。スタイル変更はリロードではなくStream形式）
10. EJS化：HTMLをパーシャルに分割（_header.ejs、_footer.ejs等）- gulp-ejs使用
11. CSV化：Githubに公開するにあたり、公開したくない個人情報やコンテンツデータを外部化し、EJSに読み込み - papaparse使用
12. アクセシビリティチェック（WAI-ARIA、キーボード操作、Lighthouse）- 手動チェック
13. パフォーマンス最適化（Lighthouse、クリティカルCSS、フォント最適化）- 手動最適化
15. デプロイ前チェック（ビルド確認、リンク切れ、クロスブラウザテスト）- 手動チェック
16. Netlifyデプロイ設定（netlify.toml、ビルドコマンド）
17. 本番環境での動作確認と最終調整

## 技術スタック

### ビルドツール

- **Gulp 5.0.0** - タスクランナー
- **Sass (dart-sass) 1.83.0** - CSSプリプロセッサ
- **gulp-sass 5.1.0** - Gulp用Sassプラグイン
- **gulp-postcss 10.0.0** - PostCSSをGulpで使用
- **postcss 8.5.6** - CSS変換ツール
- **autoprefixer 10.4.22** - ベンダープレフィックス自動付与（PostCSSプラグイン）
- **postcss-combine-media-query 2.1.0** - メディアクエリ結合（PostCSSプラグイン）
- **gulp-sourcemaps 2.6.5** - ソースマップ生成
- **gulp-clean-css 4.3.0** - CSS圧縮
- **gulp-htmlmin 5.0.1** - HTML圧縮
- **gulp-ejs 5.1.0** - EJSテンプレート処理（フェーズ2で使用予定）
- **gulp-plumber** - エラー時にストリームを継続
- **gulp-notify** - エラー時にポップアップ通知
- **browser-sync 3.0.4** - 開発サーバー（ライブリロード）
- **esbuild 0.27.0** - JavaScriptバンドラー

### 開発環境

- **Volta** - Node.jsバージョン管理
  - Node.js: 20.17.0
  - npm: 10.8.2
  - `package.json`の`volta`フィールドでバージョンを固定

### CSS設計

**PDFLOCSS形式**を採用。


### ディレクトリ構造

```
リポジトリルート/
├─ .cursor/                # Git管理外
│  └─ rules/               # Cursor AI指示ファイル
│     ├─ 00_rule.mdc                    # 基本ルール・コーディング規約（常時適用）
│     ├─ 10_pdfcss-quickref.mdc         # PDFLOCSS運用サマリ（レイヤー構成・Sass運用）
│     ├─ 20_wordpress-production-guide.mdc  # WordPressプロダクションガイド（PHP/テーマ/プラグイン開発）
│     ├─ 70_review-checklist.mdc       # コードレビュー確認表（Sass・一般チェックリスト）
│     └─ 99_local-notes.mdc            # ローカルメモ（プロジェクト固有の注意点）
├─ src/                    # ソースファイル
│  ├─ index.html          # メインHTML（完成形）
│  └─ assets/
│     ├─ scss/            # SCSSソース（PDFLOCSS）
│     └─ js/              # JavaScriptソース（バンドル対象）
├─ site/                  # ビルド出力先（Netlify公開用）
│  ├─ index.html          # ビルド後のHTML
│  ├─ css/
│  │  └─ style.css        # コンパイル済みCSS
│  ├─ js/                 # バンドル済みJS
│  └─ assets/             # 画像・フォントなど（SCSS/JSソースは除外）
├─ notes/                 # ドキュメント
│  ├─ gulp-scss-ejs-csv.plan.md
│  └─ tech-stack-and-progress.md
├─ gulpfile.js            # Gulp設定
└─ package.json
```

### 命名規則

- **レイアウト**: `.l-*` (例: `.l-container`, `.l-grid`)
- **コンポーネント**: `.c-*` (例: `.c-card`, `.c-badge`, `.c-button`)
- **ユーティリティ**: `.u-*` (例: `.u-text-center`, `.u-mb-4`)
- **プロジェクト**: `.p-*` (例: `.p-portfolio`, `.p-portfolio__nav`)


## 主な実装内容

### Gulpタスク

#### 開発環境
```bash
npm run dev
```
- `gulp dev`: watch + BrowserSyncで開発サーバー起動
- HTML、SCSS、JSの変更を監視して自動リロード
- CSS処理: SCSSコンパイル → PostCSS（autoprefixer → postcss-combine-media-query）→ ソースマップ生成

#### 本番ビルド
```bash
npm run build
```
- `gulp build`: 本番用ビルド
  - HTML: minify（空白削除、コメント削除）
  - CSS: SCSSコンパイル → PostCSS（autoprefixer → postcss-combine-media-query）→ minify
  - JS: esbuildでバンドル
  - アセット: 画像・フォントなどをコピー（SCSS/JSソースは除外）



## 参考資料

- 計画書: `notes/gulp-scss-ejs-csv.plan.md`
- Gulp設定: `gulpfile.js`
- パッケージ情報: `package.json`

