# Gulp + SCSS + EJS + CSV移行計画

## フェーズ0: 素材抽出（React/TS/Routerの残骸削除）
目的：React Router v7 や Tailwind の不要スクリプトを完全除去し、純粋な素材HTMLを作る

- [x] `build/client/index.html` を `src/` にコピー
- [x] `build/client/assets/` を `src/assets/` にコピー
- [x] React Router の `<script>`・`<link rel="modulepreload">` などを削除
- [x] SSRコメント（`<!--$!-->` など）を削除
- [x] 純静的HTMLにする（JavaScript依存ゼロ）

💡 この段階で Tailwind や React を二度と触らずに済む。

## フェーズ1: Gulp + SCSS（HTMLとスタイルの固定フェーズ）✅ 完了

### 1.1 ディレクトリ構造の準備
```
リポジトリルート/
  ├─ src/
  │   ├─ index.html   ← ここでまず完成形まで組む
  │   └─ assets/
  │       ├─ scss/
  │       │   ├─ global/
  │       │   ├─ foundation/
  │       │   ├─ layout/
  │       │   ├─ component/
  │       │   ├─ utility/
  │       │   └─ project/
  │       └─ js/
  ├─ gulpfile.js
  └─ site/            ← Gulpの出力先
```

- [x] `src/`ディレクトリを作成
- [x] `src/assets/scss/`配下にPDFLOCSSレイヤーディレクトリを作成（global, foundation, layout, component, utility, project）
- [x] `src/assets/js/`ディレクトリを作成（バンドルは必要に応じて）
- [x] `site/`ディレクトリをビルド出力先として作成

### 1.2 Gulp のセットアップ

使用するプラグイン：
- gulp
- gulp-sass（dart-sass）
- gulp-postcss
- gulp-autoprefixer
- gulp-sourcemaps
- browser-sync
- gulp-clean-css
- gulp-htmlmin
- esbuild
- gulp-plumber
- gulp-notify

- [x] 必要パッケージをインストール
- [x] `gulpfile.js`を作成
- [x] `package.json`のscriptsを更新（`dev`, `build`）

### 1.3 Tailwind削除 → SCSS変換ルール

HTMLから Tailwind を剥がして PDFLOCSS へ変換する。

変換手順：
1. ブロック単位で class を BEM に書き換え
   ```html
   <h1 class="text-4xl md:text-6xl font-bold">  
   ↓  
   <h1 class="p-hero__title">
   ```

2. Tailwind の値を SCSS に移植（解釈しなくてOK）
   ```scss
   font-size: 2.25rem;
   @include mq(md) { font-size: 3.75rem; }
   ```

3. PDFLOCSS階層に振り分ける
   - `.l-*` → レイアウト
   - `.c-*` → コンポーネント
   - `.u-*` → 単機能
   - `.p-hero__*` → ページ固有

- [x] `src/index.html`からTailwindクラスを分析
- [x] TailwindクラスをPDFLOCSS形式に変換
- [x] カラー変数、スペーシング、タイポグラフィを`src/assets/scss/global/_variables.scss`に定義
- [x] レイアウト要素を`src/assets/scss/layout/`に`.l-*`クラスとして作成
- [x] 再利用可能なUI要素を`src/assets/scss/component/`に`.c-*`クラスとして作成
- [x] ページ固有のスタイルを`src/assets/scss/project/`に`.p-[page]`配下で定義
- [x] 単機能クラスを`src/assets/scss/utility/`に`.u-*`クラスとして作成

**重要：** このフェーズでは EJS に触らない（HTMLは1ファイルにまとめておく）。

### 1.4 Gulpで HTML + SCSS + JS の開発環境

タスク例：
- `gulp html` → `src/index.html` → `site/index.html`
- `gulp styles` → SCSS → CSS（`site/css/style.css`）
- `gulp js` -> esbuildでバンドル
- `gulp dev` → watch + BrowserSync

- [x] `gulp html`タスクを作成
- [x] `gulp styles`タスクを作成（SCSSコンパイル）
- [x] `gulp js`タスクを作成（esbuildでバンドル）
- [x] `gulp dev`タスクを作成（watch + BrowserSync）
- [x] `gulp build`タスクを作成（本番用ビルド：minify + assetコピー）

💡 EJSなしで HTML と SCSSとJS だけに集中することで、作業速度が桁違いに上がる。

### 1.5 JavaScriptモジュール化

- [x] `image-slider.js` - 画像スライダー・ライトボックス機能
- [x] `work-details.js` - ワーク詳細パネル機能
- [x] `custom-cursor.js` - カスタムカーソル機能
- [x] `scroll-animation.js` - スクロールアニメーション
- [x] `text-scramble.js` - テキストスクランブル
- [x] `theme-toggle.js` - テーマ切り替え
- [x] `main.js`で各モジュールを統合

### 1.6 フェーズ1のゴール

- [x] `index.html` と `style.css` が "完成形"
- [x] Tailwind 完全除去
- [x] React Router の JS も完全除去
- [x] CSS 設計が完全にPDFLOCSSスタックに統合される
- [x] JavaScriptモジュールが完成
- [x] アクセシビリティ対応完了
- [x] パフォーマンス最適化完了

## フェーズ2: EJS化（構造の分割フェーズ）✅ 完了

目的：HTML が固まったタイミングで初めて分割する

**現状**: HTMLは1ファイル（`src/index.html`）のまま。  
**完了**: パーシャル化してテンプレート構造を整備しました。

### 2.1 EJS ディレクトリ構造
```
ejs/
  ├─ index.ejs
  ├─ _head.ejs
  ├─ _nav.ejs
  ├─ _hero.ejs
  ├─ _skills.ejs
  ├─ _works.ejs
  ├─ _notes.ejs
  ├─ _flow.ejs
  ├─ _about.ejs
  ├─ _contact.ejs
  └─ _footer.ejs
```

- [x] `ejs/`ディレクトリを作成
- [x] `ejs/index.ejs`を作成
- [x] パーシャルファイルを作成（`_head.ejs`, `_nav.ejs`, `_hero.ejs`, `_skills.ejs`, `_works.ejs`, `_notes.ejs`, `_flow.ejs`, `_about.ejs`, `_contact.ejs`, `_footer.ejs`）

### 2.2 EJS ロジック

HTML をパーツに分割し、include で組み立てる：
```ejs
<%- include('_head') %>
<%- include('_nav') %>
<%- include('_hero') %>
...
<%- include('_footer') %>
```

- [x] `src/index.html`をEJSテンプレートに分割
- [x] `ejs/index.ejs`でincludeを使用して組み立て
- [x] Gulp に EJSパイプラインを追加

**重要：** ここで初めて Gulp に EJSパイプラインを追加（フェーズ1では絶対に使わない）

## フェーズ3: CSV（データ外部化フェーズ）✅ 完了

目的：EJS テンプレをCSVから生成できるようにする

**完了**: Works、Tech Notes、About、ContactセクションのデータをCSV化して外部化しました。

### 3.1 CSVファイル構成（決定事項）

**決定事項:**
- **1つのCSVファイルに統合**: `private/portfolio.csv`（LLMが読みやすいように）
- **1行目は説明行**: 見出しや例を記載し、パース時にスキップ
- **4列構成**:
  - A列: セクション名（`Works`、`Tech Notes`、`About`、`Contact`）またはアイテムID（`works_01`, `note_01`など）
  - B列: アイテムID（`works_01`, `note_01`など）または空
  - C列: CSSセレクタ（`.p-portfolio__work-details-title`など）
  - D列: 値（テキストまたはファイル名のパイプ区切り）
- **複数値はパイプ区切り**: `WordPress|SCSS|Gulp|PHP` → 配列に変換（`split('|')`）
- **改行タグの指定**: `<br>|`で区切ると、各要素に`<br>`タグが含まれた配列に変換される

**CSV例:**
```csv
Works,,,
works_01,01,.p-portfolio__work-details-title,タイトルテキスト
works_01,01,.p-portfolio__work-details-meta,メタテキスト
works_01,01,.p-portfolio__work-details-tags,WordPress|SCSS|Gulp|PHP
works_01,01,.p-portfolio__work-details-description,説明文
works_01,01,.c-slider__slide,works_01_01.png|works_01_02.png|works_01_03.png
works_02,02,.p-portfolio__work-details-title,次のワークのタイトル
...
```

**ディレクトリ構造:**
```
private/
  ├─ portfolio.csv          # CSVデータ（GitHubにコミット）
  └─ images/                # 画像ファイル（ビルド時にsite/images/にコピー）
      ├─ works_01_01.png
      ├─ works_01_02.png
      └─ ...
```

- [x] `private/portfolio.csv`を作成
- [x] `.gitignore`に`private/images/`を追加（ただし、CSVファイル自体はコミット対象）

### 3.2 Gulpで CSV → JSON に変換

papaparseを使用してJSON を EJS に渡す

**処理フロー:**
1. CSVを読み込む（1行目は説明行としてスキップ）
2. セクション名（A列）とアイテムID（B列）でグループ化
3. 各グループ内でC列のセレクタをキーにD列の値を取得
4. D列の値が`<br>|`で区切られている場合は`<br>`タグを含む配列に変換
5. D列の値が通常の`|`で区切られている場合は配列に変換（画像ファイル名など）
6. 画像ファイルの場合はパスを`./images/`に変換し、`:link`サフィックスを処理
7. EJSテンプレートにデータを渡す

- [x] `gulpfile.js`にCSV読み込み処理を追加
- [x] `papaparse`を使用してCSVをJSONに変換
- [x] 1行目をスキップする処理を追加
- [x] セクション名とアイテムIDでグループ化する処理を追加
- [x] `<br>|`と通常の`|`で区切られた値を配列に変換する処理を追加
- [x] 画像パスの解決と`:link`サフィックスの処理を追加
- [x] EJSコンパイル時にCSVデータを渡す

### 3.3 画像処理

**画像の配置:**
- `private/images/` に平らに配置（サブディレクトリなし）
- CSVの値はファイル名のみ（例: `works_01_01.png`）

**画像拡大リンクの指定方法:**
- 拡大リンクを付ける画像には`:link`サフィックスを付与
- 例: `works_01_01.png|works_01_02.png:link|works_01_03.png|works_01_04.png:link`
- パース時に`:link`サフィックスを検出し、画像データをオブジェクト配列に変換
  - `{ src: 'works_01_01.png', hasLink: false }`
  - `{ src: 'works_01_02.png', hasLink: true }`
- JavaScript側で`hasLink`フラグに基づいて`<a>`タグを生成

**ビルド時の処理:**
1. `private/images/` から画像を読み込む
2. WebPに変換（可能であれば）
3. `site/images/` にコピー
4. HTML内のパスを `./images/works_01_01.png` に変換
5. 画像配列をオブジェクト配列に変換（`:link`サフィックスを処理）

- [x] Gulpタスクで画像コピー処理を追加
- [ ] WebP変換処理を追加（`gulp-webp`など）- 将来の拡張
- [x] 画像パスの解決処理を追加
- [x] `:link`サフィックスの処理を追加

### 3.4 EJS でループ表示

- [x] EJSテンプレートでCSVデータをループ表示
- [x] 各セクション（works, notes, about, contact）でEJSのループ構文を使用
- [x] `<br>|`形式の改行タグ処理を実装
- [x] 画像の`:link`サフィックス処理を実装

## フェーズ4: 本番ビルド + Cloudflare Pages デプロイ ✅ 完了

- [x] `gulp build` → minify + assetコピー
- [x] `.gitignore`に`site/`、`.env`、その他非公開情報を追加
- [x] Cloudflare Pagesのビルドコマンドを`gulp build`に設定
- [x] BASIC認証を設定
- [x] `main`ブランチへのプッシュで自動デプロイが実行される

## 🏁 全体の進行順（最短で沼らない順番）

1. [x] 素材HTMLを作る（React/TS完全排除）
2. [x] Tailwind → SCSS（PDFLOCSS）変換
3. [x] GulpでHTML+SCSS+JSの開発環境
4. [x] JavaScriptモジュール化
5. [x] デザイン確定
6. [x] アクセシビリティ対応
7. [x] パフォーマンス最適化
8. [x] Cloudflare Pages公開（BASIC認証設定済み）
9. [x] EJS化（初めてテンプレ化）- 完了
10. [x] CSV化（データ外部化）- 完了

## 補足

### 現在の実装状況

- **フェーズ1**: 完了 ✅
  - Gulp + SCSS環境構築
  - Tailwind → PDFLOCSS変換
  - JavaScriptモジュール化
  - アクセシビリティ対応
  - パフォーマンス最適化
  - Cloudflare Pagesデプロイ（BASIC認証設定済み）

- **フェーズ2**: 完了 ✅
  - EJS化によりHTMLをパーシャル化してテンプレート構造を整備
  - メンテナンス性と再利用性を向上

- **フェーズ3**: 完了 ✅
  - CSV化によりデータを外部化
  - Works、Tech Notes、About、ContactセクションのデータをCSVで管理
  - 画像の拡大リンク指定（`:link`サフィックス）を実装
  - 改行タグの指定（`<br>|`形式）を実装

### 今後の拡張予定

- **WebP変換**: 画像のWebP変換処理を追加（`gulp-webp`など）- 将来の拡張
- **JavaScriptプラグイン化**: image-slider.js、work-details.jsをクライアントワーク向けにプラグイン化予定 - 将来の拡張
