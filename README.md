# tkhsykk__devfolio

ポートフォリオサイト「[devfolio]」のリポジトリです。

## 目的

このプロジェクトは、LLM（ChatGPT/Cursor）と人間が協働して開発したポートフォリオサイトです。

### 主な目的

1. **ポートフォリオの作成**: 転職活動に向けて、実装コードとデザインの両方を示せるポートフォリオサイトを作成
2. **LLM協働開発の実践**: 「できるだけ人間が手を動かさない」という方針で、LLM中心の開発フローを試行
3. **技術スタックの実演**: 実際の開発で使用している技術スタック（Gulp、SCSS、PDFLOCSS設計、モジュール化されたJavaScript）を実装

## コンセプト

- デザイン生成からプロトタイプ・指示書作成、静的実装、ビルドやデプロイまでをLLMに任せる
- LLMとの会話力を鍛えつつ、これからのLLM中心の開発フローを試す
- お客様のサイトのソースコードを公開できないため、ポートフォリオ専用サイトとして新規作成

## 開発フロー

1. ChatGPTに開発の流れを相談し、Cursor用の汎用指示書（`.cursor/rules/*.mdc`）と`notes/gulp-scss-ejs-csv.plan.md`でチェックリストと設計要件を整理
2. Anythingで生成したReact+TailwindのプロトタイプをCursor Proで取得し、静的HTML/CSS/JSに変換
3. TailwindのユーティリティをPDFLOCSS設計に置き換え、SCSSファイルのレイヤー構造を整備
4. Gulp + BrowserSyncでローカル開発環境を構築。SCSSはPostCSS（Autoprefixer + メディアクエリ結合）＋sourcemap、変更はStream形式で即座に反映
5. JavaScriptはモジュール化し、EJSでテンプレート分割、CSVでコンテンツを外部化
6. アクセシビリティチェック（ARIA、キーボード操作、フォーカストラップ）とパフォーマンス最適化（Lighthouse、CSS/JSのminify）を手動で実行
7. `private/portfolio.csv`と`private/images/`をプライベートリポジトリで管理し、ビルド時にサイトに反映
8. GitHub Actions + Private リポジトリ + Cloudflare Pages Direct Upload で自動デプロイ（`wrangler`を使用）

## 使用方法

### 必要な環境

- Node.js 20.17.0（Voltaを使用すれば自動設定）
- npm 10.8.2

### セットアップ

```bash
# 依存関係のインストール
npm install
```

### 開発

```bash
# 開発サーバーを起動（BrowserSyncで自動リロード）
npm run dev
```

開発サーバーは `http://localhost:3000` で起動し、SCSS/JavaScriptの変更を監視して自動コンパイルとStreamリロードを行います。PostCSSのAutoprefixerと`postcss-combine-media-query`もGulpタスク内で動作します。

### コンテンツの編集

サイトのコンテンツ（Works、Tech Notes、About、Contact）は `private/portfolio.csv` で管理しています。CSVを編集すると、`npm run dev` 実行中は自動で再ビルドとLiveReloadが走ります。

```bash
# CSVファイルを編集
private/portfolio.csv を変更すると次回のビルドで反映されます
```

#### CSVファイルの形式

- **セクション**: A列にセクション名（`Works`、`Tech Notes`、`About`、`Contact`）
- **アイテムID**: B列にアイテムID（例：`works_01`、`note_01`）
- **セレクタ**: C列にCSSセレクタ（例：`.p-portfolio__work-details-title`）
- **値**: D列に表示する内容

詳細な形式については `notes/gulp-scss-ejs-csv.plan.md` を参照してください。

### 画像の追加

画像ファイルは `private/images/` に配置すると、ビルド時に `site/images/` にコピーされます。

### ビルド

```bash
# 本番用ビルド（最適化・圧縮）
npm run build
```

`npm run build` は HTML/CSS/JS を minify + esbuild でバンドルし、`site/` に成果物を出力します。

## JavaScript構成

`src/assets/js/main.js` から以下のモジュールを読み込み、必要なタイミングで初期化しています。

- `image-slider.js`: 複数のスライダーとライトボックスを提供し、キーボード・ARIAにも配慮した操作を実装
- `work-details.js`: グリッド内のワークをクリックすると詳細パネルをスライドインで展開
- `navigation.js`: ハンバーガーメニュー＋レスポンシブナビで `aria-expanded` や ESC/リサイズ対応の制御
- `theme-toggle.js`: ライト/ダークモードの切り替え、`localStorage`保持、`prefers-color-scheme` 初期化
- `scroll-animation.js`: Intersection Observer で `[data-scroll-trigger]` 要素をトリガーし、`is-visible` クラスで演出
- `text-scramble.js`: 任意要素のテキストをランダム挙動で書き換えるスクランブルアニメーション
- `custom-cursor.js`: カスタムカーソルの追従、ホバー状態に応じたエフェクトを提供
- `page-transition.js`（任意）: Barba.js + GSAP でSPA風遷移を実現し、スクロールアニメーション/テキストスクランブルを再初期化
- `@oddbird/popover-polyfill`: モダンなPopover APIをサポート

## CSS設計

`src/assets/scss/` は PDFLOCSS 形式でレイヤーを分割しています。`global` は変数・ミックスイン・フォント定義、`foundation` はリセット/ベーススタイル、`layout` は `.l-*`、`component` は `.c-*`、`utility` は `.u-*`、`project` は `.p-*` 固有のオーバーライドを収めます。各レイヤーは `@use` で依存を明示し、`src/assets/scss/project/_portfolio.scss` のようにプロジェクト固有部分を上書きできます。

### 命名規則

- `.l-*`: レイアウト（`l-container`、`l-grid`）
- `.c-*`: 再利用可能コンポーネント（`c-card`、`c-slider`、`c-popover`）
- `.u-*`: ユーティリティ（`u-text-center`、`u-mb-4`）
- `.p-*`: ページ固有（`p-portfolio`、`p-portfolio__nav`）

## 技術スタック

### ビルドツール

- **Gulp 5.0.0**: タスクランナー
- **Sass (dart-sass) 1.83.0 + gulp-sass 5.1.0**: SCSS コンパイル
- **PostCSS 8.5.6**: `autoprefixer 10.4.22`、`postcss-combine-media-query 2.1.0` を組み合わせて処理
- **gulp-sourcemaps 2.6.5**: ソースマップ生成
- **gulp-clean-css 4.3.0**: CSS minify
- **gulp-htmlmin 5.0.1**: HTML minify
- **gulp-plumber 1.2.1** + **gulp-notify 5.0.0**: エラーハンドリング
- **BrowserSync 3.0.4**: 開発サーバ・自動リロード（Stream形式でCSSを反映）
- **esbuild 0.27.0**: JavaScriptバンドル
- **gulp-ejs 5.1.0**: EJSテンプレート処理
- **PapaParse 5.4.1**: `private/portfolio.csv` のCSVパース

### ライブラリ

- **@oddbird/popover-polyfill 0.6.1**: Popover APIのポリフィルを `src/assets/js/main.js` でインポート

### 実行環境

- Node.js 20.17.0、npm 10.8.2（`package.json` の `volta` フィールドで固定）

## ディレクトリ構造

```
tkhsykk__devfolio/
├── .cursor/                # Cursor AIの指示書・ルール（.cursor/rules/*.mdc）
├── functions/              # Cloudflare Pages Functions（Basic Authを処理）
├── src/                    # ソースファイル
│   ├── index.ejs           # メインEJSテンプレート
│   ├── _*.ejs              # EJSパーシャルテンプレート
│   └── assets/
│       ├── js/             # JavaScriptファイル
│       │   ├── main.js     # モジュールを読み込むエントリーポイント
│       │   └── modules/    # モジュール化されたJS（image-slider, work-details, navigation, etc.）
│       └── scss/           # SCSSファイル（PDFLOCSS設計）
│           ├── style.scss  # エントリーポイント
│           ├── global/      # 変数・ミックスイン
│           ├── foundation/  # リセット・ベース
│           ├── layout/      # `.l-*`
│           ├── component/   # `.c-*`
│           ├── utility/     # `.u-*`
│           ├── project/     # `.p-*`
│           └── plugins/     # Sassプラグイン
├── private/                # コンテンツデータ（GitHubには含まれません）
│   ├── portfolio.csv       # Works / Tech Notes / About / Contactを管理
│   └── images/             # 画像（ビルド時に site/images/ へコピー）
├── site/                   # ビルド出力（Cloudflare Pagesにデプロイ）
│   └── index.html
├── create-anything/        # プロトタイプ生成用ファイル（.gitignore対象）
│   ├── mobile/             # React Native/Expo
│   └── web/                # React Router
├── node_modules/           # 依存関係（.gitignore対象）
├── notes/                  # 開発メモ・計画書
├── gulpfile.js             # Gulp設定
├── package.json            # 依存関係・スクリプト
└── README.md               # このファイル
```

### .gitignore対象のディレクトリ

以下のディレクトリは `.gitignore` により除外されています。

- **node_modules/**: `npm install` で生成される依存関係
- **site/**: `npm run build` で生成される出力
- **create-anything/mobile/**、**create-anything/web/**: プロトタイプ生成時の成果物
- **.vscode/**、**.idea/**: IDEの設定
- **.cache/**、**.temp/**、**logs/**: ビルド・実行時の一時ファイル

## デプロイ

GitHub Actions + Private リポジトリ + Cloudflare Pages Direct Upload で自動デプロイを行っています。CI は以下の流れです。

1. Publicリポジトリと Private リポジトリ（CSV・画像格納）を Checkout
2. Private リポジトリのファイルを `private/` にコピー
3. `npm ci` → `npm run build`
4. `npx wrangler pages deploy site --project-name=${{ secrets.CLOUDFLARE_PAGES_PROJECT_NAME }}` で Cloudflare Pages に Direct Upload

### セットアップに必要なシークレット

| Secret 名 | 内容 |
|------------|------|
| `PRIVATE_REPO_OWNER` | Private リポジトリ所有者（例: `tkhsykk`） |
| `PRIVATE_REPO_NAME` | Private リポジトリ名（例: `tkhsykk__devfolio-asset_private`） |
| `PRIVATE_REPO_TOKEN` | GitHub PAT（`repo` スコープ） |
| `CLOUDFLARE_API_TOKEN` | Cloudflare API Token（Pages展開/Account:Pages:Edit権限） |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare Account ID |
| `CLOUDFLARE_PAGES_PROJECT_NAME` | Cloudflare Pages プロジェクト名 |

### Basic 認証

`functions/_middleware.js` が `BASIC_USER`/`BASIC_PASS`（環境変数）を読み込み、Cloudflare Pages Functions で Basic 認証を担います。認証に成功しないと `WWW-Authenticate` ヘッダー付きで `401` を返し、認証後に `context.next()` で通常処理に移動します。

## 参考資料

- `notes/gulp-scss-ejs-csv.plan.md`: CSV・EJS・SCSSの連携設計
- `notes/tech-stack-and-progress.md`: 技術スタック・開発メモ
- `notes/github-actions-setup.md`: GitHub Actions + Cloudflare Pages のセットアップ手順

## ライセンス

ISC

## 作者

tkhsykk
