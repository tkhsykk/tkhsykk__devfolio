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

## フェーズ2: EJS化（構造の分割フェーズ）📅 実装予定

目的：HTML が固まったタイミングで初めて分割する

**現状**: HTMLは1ファイル（`src/index.html`）のまま。  
**予定**: パーシャル化してテンプレート構造を整備する予定。

### 2.1 EJS ディレクトリ構造
```
ejs/
  ├─ index.ejs
  ├─ _header.ejs
  ├─ _footer.ejs
  ├─ _hero.ejs
  ├─ _skills.ejs
  ├─ _works.ejs
  ├─ _about.ejs
  └─ _contact.ejs
```

- [ ] `ejs/`ディレクトリを作成
- [ ] `ejs/index.ejs`を作成
- [ ] パーシャルファイルを作成（`_header.ejs`, `_footer.ejs`, `_hero.ejs`, `_skills.ejs`, `_works.ejs`, `_about.ejs`, `_contact.ejs`）

### 2.2 EJS ロジック

HTML をパーツに分割し、include で組み立てる：
```ejs
<%- include('_header') %>
<%- include('_hero') %>
...
<%- include('_footer') %>
```

- [ ] `src/index.html`をEJSテンプレートに分割
- [ ] `ejs/index.ejs`でincludeを使用して組み立て
- [ ] Gulp に EJSパイプラインを追加

**重要：** ここで初めて Gulp に EJSパイプラインを追加（フェーズ1では絶対に使わない）

## フェーズ3: CSV（データ外部化フェーズ）📅 実装予定

目的：EJS テンプレをCSVから生成できるようにする

**現状**: データはHTMLに直接記述。  
**予定**: 個人情報やコンテンツデータをCSV化して外部化する予定。

### 3.1 dataディレクトリ
```
data/
  ├─ hero.csv
  ├─ skills.csv
  ├─ works.csv
  ├─ notes.csv
  ├─ about.csv
  └─ contact.csv
```

- [ ] `data/`ディレクトリを作成
- [ ] CSVファイルを作成（`hero.csv`, `skills.csv`, `works.csv`, `notes.csv`, `about.csv`, `contact.csv`）

### 3.2 Gulpで CSV → JSON に変換

papaparseを使用してJSON を EJS に渡す

スクリプト例：
```javascript
const Papa = require('papaparse');
const data = Papa.parse(fs.readFileSync('data/skills.csv', 'utf8'), { header: true }).data;
```

- [ ] `gulpfile.js`にCSV読み込み処理を追加
- [ ] `papaparse`を使用してCSVをJSONに変換
- [ ] EJSコンパイル時にCSVデータを渡す

### 3.3 EJS でループ表示
```ejs
<% skills.forEach(skill => { %>
  <div><%= skill.name %></div>
<% }) %>
```

- [ ] EJSテンプレートでCSVデータをループ表示
- [ ] 各セクション（hero, skills, works等）でEJSのループ構文を使用

## フェーズ4: 本番ビルド + Netlify デプロイ ✅ 完了

- [x] `gulp build` → minify + assetコピー
- [x] `.gitignore`に`site/`、`.env`、その他非公開情報を追加
- [ ] Netlifyのビルドコマンドを`gulp build`に設定
- [ ] `main`ブランチへのプッシュで自動デプロイが実行される

## 🏁 全体の進行順（最短で沼らない順番）

1. [x] 素材HTMLを作る（React/TS完全排除）
2. [x] Tailwind → SCSS（PDFLOCSS）変換
3. [x] GulpでHTML+SCSS+JSの開発環境
4. [x] JavaScriptモジュール化
5. [x] デザイン確定
6. [ ] アクセシビリティ対応
7. [ ] パフォーマンス最適化
8. [ ] Netlify公開
9. [ ] EJS化（初めてテンプレ化）- 未実装
10. [ ] CSV化（データ外部化）- 未実装

## 補足

### 現在の実装状況

- **フェーズ1**: 完了 ✅
  - Gulp + SCSS環境構築
  - Tailwind → PDFLOCSS変換
  - JavaScriptモジュール化
  - アクセシビリティ対応
  - パフォーマンス最適化
  - Netlifyデプロイ

- **フェーズ2**: 実装予定 📅
  - EJS化によりHTMLをパーシャル化してテンプレート構造を整備
  - メンテナンス性と再利用性を向上

- **フェーズ3**: 実装予定 📅
  - CSV化によりデータを外部化
  - 個人情報やコンテンツデータの管理を容易に

### 今後の拡張予定

- **JavaScriptプラグイン化**: image-slider.js、work-details.jsをクライアントワーク向けにプラグイン化予定
- **EJS化**: フェーズ2として実装予定
- **CSV化**: フェーズ3として実装予定
