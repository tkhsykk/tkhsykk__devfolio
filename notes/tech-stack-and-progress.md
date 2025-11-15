# 技術スタックと進捗メモ

## プロジェクト概要

Anythingで生成されたReact Router v7 + Tailwind CSS から Gulp + SCSS (PDFLOCSS) + EJS + CSV への移行プロジェクト。

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

**PDFLOCSS形式**を採用。レイヤー構造は以下の通り：

```
src/assets/scss/
├─ global/          # 変数・ミックスイン
│  ├─ _variables.scss
│  ├─ _mixins.scss
│  └─ _index.scss
├─ foundation/      # リセット・ベーススタイル
│  ├─ _reset.scss
│  └─ _index.scss
├─ layout/         # レイアウトクラス（.l-*）
│  ├─ _container.scss
│  ├─ _grid.scss
│  └─ _index.scss
├─ component/      # コンポーネントクラス（.c-*）
│  ├─ _card.scss
│  ├─ _badge.scss
│  ├─ _button.scss
│  └─ _index.scss
├─ utility/        # ユーティリティクラス（.u-*）
│  └─ _index.scss
├─ project/        # プロジェクト固有スタイル（.p-*）
│  ├─ _portfolio.scss
│  └─ _index.scss
└─ style.scss      # エントリーポイント
```

### ディレクトリ構造

```
リポジトリルート/
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

### ディレクトリ説明

#### ルートディレクトリ

- **`src/`** - ソースファイルのルート。開発時に編集するファイルを配置
- **`site/`** - ビルド出力先。Gulpが生成したファイルが配置され、Netlifyで公開される
- **`notes/`** - プロジェクトのドキュメント（計画書、技術メモなど）
- **`create-anything/`** - 元のAnythingプロジェクト（移行元、一度TypeScriptを静的HTMLにしたら使わない）

#### `src/` 配下

- **`src/index.html`** - メインのHTMLファイル。完成形のマークアップ
- **`src/assets/scss/`** - SCSSソースファイル（PDFLOCSS形式）
  - `global/` - 変数、ミックスインなどグローバル設定
  - `foundation/` - リセットCSS、ベーススタイル
  - `layout/` - レイアウト関連のクラス（`.l-*`）
  - `component/` - 再利用可能なコンポーネント（`.c-*`）
  - `utility/` - ユーティリティクラス（`.u-*`）
  - `project/` - プロジェクト固有のスタイル（`.p-*`）
  - `style.scss` - エントリーポイント（全レイヤーをインポート）
- **`src/assets/js/`** - JavaScriptソースファイル（esbuildでバンドル）

#### `site/` 配下

- **`site/index.html`** - ビルド後のHTML（minify済み）
- **`site/css/`** - コンパイル済みCSS
  - `style.css` - 本番用CSS（minify済み）
  - `style.css.map` - ソースマップ（開発時のみ）
- **`site/js/`** - バンドル済みJavaScriptファイル
- **`site/assets/`** - 静的アセット（画像、フォントなど）
  - 注意: SCSS/JSのソースファイルは含まれない（バンドル後のファイルのみ）

#### その他

- **`gulpfile.js`** - Gulpのタスク定義ファイル
- **`package.json`** - プロジェクトの依存関係とスクリプト定義

### 命名規則

- **レイアウト**: `.l-*` (例: `.l-container`, `.l-grid`)
- **コンポーネント**: `.c-*` (例: `.c-card`, `.c-badge`, `.c-button`)
- **ユーティリティ**: `.u-*` (例: `.u-text-center`, `.u-mb-4`)
- **プロジェクト**: `.p-*` (例: `.p-portfolio`, `.p-portfolio__nav`)

## 進捗状況

### ✅ フェーズ0: 素材抽出（完了）

- [x] `build/client/index.html` を `src/` にコピー
- [x] `build/client/assets/` を `src/assets/` にコピー
- [x] React Router の `<script>`・`<link rel="modulepreload">` などを削除
- [x] SSRコメント（`<!--$!-->` など）を削除
- [x] 純静的HTMLにする（JavaScript依存ゼロ）

**成果**: 
- React Router v7 と Tailwind CSS の残骸を完全除去し、純粋な素材HTMLを作成
- Viteで生成されたJS/CSSファイル（`src/vendor/`配下）は不要のため削除済み

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

### ビルド出力の特徴

- **SCSS/JSのソースファイルはコピーしない**: `copyAssets`タスクで除外
- **バンドル後のファイルのみ配置**: `site/css/style.css`、`site/js/`など

### エラーハンドリング

- **gulp-plumber**: エラー発生時にストリームを継続し、watchタスクが停止しないようにする
- **gulp-notify**: エラー発生時にデスクトップ通知（ポップアップ）を表示
- すべてのGulpタスク（HTML、SCSS、アセットコピー）に`plumber()`を適用
- JavaScriptビルド（esbuild）のエラー時も通知を表示
- **ソースマップ生成**: 開発時のデバッグ用（本番ビルドではminify）

### 変数・ミックスイン

#### カラーパレット
```scss
$color-white: #fff;
$color-primary: #ff006c;
$color-text: #494b67;
$color-bg-light: #d5f7ff;
$color-bg-lighter: #ecebff;
$color-border: #ecebff;
```

#### スペーシング（Tailwind準拠）
```scss
$spacing-1: 0.25rem;  // 4px
$spacing-2: 0.5rem;   // 8px
$spacing-4: 1rem;     // 16px
$spacing-6: 1.5rem;   // 24px
$spacing-8: 2rem;     // 32px
// ... など
```

#### メディアクエリミックスイン
```scss
@include mq(md) {
  // 768px以上
}
```

## 今後の予定

1. **フェーズ2**: HTMLをEJSテンプレートに分割
2. **フェーズ3**: CSVからデータを読み込んで動的生成
3. **フェーズ4**: Netlifyにデプロイ

## 参考資料

- 計画書: `notes/gulp-scss-ejs-csv.plan.md`
- Gulp設定: `gulpfile.js`
- パッケージ情報: `package.json`

