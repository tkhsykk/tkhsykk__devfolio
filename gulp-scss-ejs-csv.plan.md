<!-- f621ee35-ad80-41b4-a040-7dfac7d10901 5e67bdee-4f07-4bf9-bdee-220c112b9df8 -->
# Gulp + SCSS + EJS + CSV移行計画

## フェーズ1: Gulp + SCSSへの移行（スタイル開発環境構築）

### 1.1 ディレクトリ構造の整理
- [ ] `ejs/`配下に`scss/`, `data/`ディレクトリを作成（EJSソースファイル用、`create-anything\web\build\client\index.html`をEJS化）
- [ ] `site/`ディレクトリをビルド出力先として設定（Netlifyで公開）
- [ ] 既存のReact関連ファイルを削除

### 1.2 静的HTMLの作成
- [ ] `ejs/index.ejs`を作成（現在の`build/client/index.html`をベース）
- [ ] HTMLにPDFLOCSS形式のクラスを適用：
  - [ ] `body.page-[slug]`と`main.p-[page]`を基準に構造化
  - [ ] レイアウト要素に`.l-*`クラスを適用
  - [ ] 再利用可能なUI要素に`.c-*`クラスを適用
  - [ ] 必要に応じて`.u-*`ユーティリティクラスを適用
- [ ] 一時的にハードコードされたテキストでHTML構造を再現
- [ ] GulpタスクでEJSをコンパイルして`site/`にHTMLを生成（データ読み込みは後回し）

### 1.3 SCSSファイルの作成（PDFLOCSS形式）
- [ ] PDFLOCSSレイヤー構成に従ってディレクトリ構造を作成：
  - [ ] `ejs/scss/global/`: 変数・関数・ミックスイン（`_index.scss`で`@forward`）
  - [ ] `ejs/scss/foundation/`: リセットとベースタイポ（`_index.scss`で`@forward`）
  - [ ] `ejs/scss/layout/`: `.l-*` クラス（ヘッダー、フッター、セクション等）
  - [ ] `ejs/scss/component/`: `.c-*` クラス（再利用可能なUI）
  - [ ] `ejs/scss/project/`: `main.p-[page]` 配下のページ固有スタイル
  - [ ] `ejs/scss/utility/`: `.u-*` クラス（単機能ユーティリティ）
- [ ] `ejs/scss/style.scss`をエントリーポイントとして作成（`@use`順序: global → foundation → layout → component → utility → project）
- [ ] 現在の`page.jsx`のTailwindクラスを分析
- [ ] TailwindクラスをPDFLOCSS形式に変換：
  - [ ] カラー変数、スペーシング、タイポグラフィを`global/_variables.scss`に定義
  - [ ] レイアウト要素（nav, section等）を`layout/`に`.l-*`クラスとして作成
  - [ ] 再利用可能なUI要素を`component/`に`.c-*`クラスとして作成
  - [ ] ページ固有のスタイルを`project/`に`.p-[page]`配下で定義
  - [ ] 単機能クラスを`utility/`に`.u-*`クラスとして作成

### 1.4 Gulpのセットアップ
- [ ] `gulpfile.js`を作成
- [ ] 必要なGulpプラグインをインストール（gulp-sass, gulp-autoprefixer, gulp-sourcemaps, gulp-ejs, gulp-browser-sync等）
- [ ] `package.json`のscriptsを更新（`dev`, `build`）

### 1.5 React Router v7の削除
- [ ] `react-router.config.ts`を削除
- [ ] `vite.config.ts`を削除
- [ ] `postcss.config.js`を削除
- [ ] `tailwind.config.js`を削除
- [ ] React関連の依存関係を`package.json`から削除
- [ ] `src/app/`ディレクトリを削除
- [ ] `scripts/fix-html.js`を削除（Gulpで処理するため）

### 1.6 Gulpタスクの実装
- [ ] `gulp dev`: ファイル監視、SCSSコンパイル、EJSコンパイル、ブラウザリロード
- [ ] `gulp build`: 本番用ビルド（SCSS圧縮、HTML最適化、`site/`に出力）

### 1.7 Netlify設定とセキュリティ
- [ ] `netlify.toml`を作成して`site/`ディレクトリを公開設定
- [ ] `.gitignore`に`.env`、`site/`、その他非公開情報を追加
- [ ] Netlifyのビルドコマンドを`gulp build`に設定

## フェーズ2: EJS + CSVへの移行（データ外部化）

### 2.1 CSVファイルの作成
- [ ] `ejs/data/`ディレクトリに以下のCSVファイルを作成：
  - [ ] `hero.csv`: タイトル、サブタイトル、説明文
  - [ ] `skills.csv`: カテゴリ、スキル名（カンマ区切りで複数スキル）
  - [ ] `works.csv`: 作品情報（id, title, thumbnail, scope, technologies, features, details）
  - [ ] `tech-notes.csv`: タイトル、説明、日付
  - [ ] `about.csv`: 名前、役職、説明、経験項目
  - [ ] `contact.csv`: メールアドレス、GitHub URL
  - [ ] `navigation.csv`: ナビゲーション項目

### 2.2 CSV読み込みモジュールの作成
- [ ] `gulpfile.js`内または別ファイルでCSVパーサーを実装
- [ ] `papaparse`を使用してCSVをJSONに変換
- [ ] データ構造をEJSテンプレートで使いやすい形式に整形

### 2.3 EJSテンプレートの更新
- [ ] `ejs/index.ejs`を更新してCSVデータを参照
- [ ] 各セクション（hero, skills, works等）でEJSのループ構文を使用
- [ ] パーシャル（`ejs/_header.ejs`, `ejs/_footer.ejs`等）を作成してテンプレートを分割

### 2.4 Gulpタスクの更新
- [ ] CSV読み込み処理を追加
- [ ] EJSコンパイル時にCSVデータを渡す
- [ ] `gulp build`でCSVからHTMLを生成

## 実装ファイル

### 新規作成
- [ ] `gulpfile.js`
- [ ] `ejs/scss/style.scss`（エントリーポイント）
- [ ] `ejs/scss/global/_index.scss`, `ejs/scss/global/_variables.scss`（変数・関数・ミックスイン）
- [ ] `ejs/scss/foundation/_index.scss`（リセットとベースタイポ）
- [ ] `ejs/scss/layout/`配下のファイル（`.l-*`クラス）
- [ ] `ejs/scss/component/`配下のファイル（`.c-*`クラス）
- [ ] `ejs/scss/project/`配下のファイル（`.p-[page]`配下のスタイル）
- [ ] `ejs/scss/utility/`配下のファイル（`.u-*`クラス）
- [ ] `ejs/index.ejs`
- [ ] `ejs/_header.ejs`, `ejs/_footer.ejs`（パーシャル）
- [ ] `ejs/data/*.csv`（複数ファイル）
- [ ] `netlify.toml`（Netlify設定）

### 削除
- [ ] `react-router.config.ts`
- [ ] `vite.config.ts`
- [ ] `postcss.config.js`
- [ ] `tailwind.config.js`
- [ ] `src/app/`ディレクトリ全体
- [ ] `scripts/fix-html.js`
- [ ] React関連の依存関係

### 更新
- [ ] `package.json`: Gulp関連パッケージの追加、React関連の削除、scriptsの更新
- [ ] `.gitignore`: `.env`、`site/`、その他非公開情報を追加

