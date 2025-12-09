# tkhsykk__devfolio

ポートフォリオサイト「[devfolio]」のリポジトリです。

## 目的

このプロジェクトは、LLM（ChatGPT/Cursor/CODEX）と人間が協働して開発したポートフォリオサイトです。

### 主な目的

1. **ポートフォリオの作成**: 転職活動に向けて、実装コードとデザインの両方を示せるポートフォリオサイトを作成
2. **LLM協働開発の実践**: 「できるだけ人間が手を動かさない」という方針で、LLM中心の開発フローを試行
3. **技術スタックの実演**: 実際の開発で使用している技術スタック（Gulp、SCSS、PDFLOCSS設計、モジュール化されたJavaScript等）を実装

### コンセプト

- デザイン生成からプロトタイプ・指示書作成、静的実装、ビルドやデプロイまでをLLMに任せる
- LLMとの会話力を鍛えつつ、これからのLLM中心の開発フローを試す
- お客様のサイトのソースコードを公開できないため、ポートフォリオ専用サイトとして新規作成

## 使用方法

### 必要な環境

- Node.js 20.17.0（Voltaを使用している場合は自動で設定されます）
- npm 10.8.2

### セットアップ

```bash
# 依存関係のインストール
npm install
```

#### 環境変数の設定（ローカル開発時）

コンテンツデータ（`portfolio.csv`）は別の非公開リポジトリ（[tkhsykk__devfolio-asset_private](https://github.com/tkhs/tkhsykk__devfolio-asset_private)）で管理されています。

ローカル開発時は、別リポジトリをcloneした後、プロジェクトルートに `.env` ファイルを作成して、CSVファイルのパスを設定してください：

**注意**: `.env` ファイルは `.gitignore` に含まれているため、Gitにはコミットされません。  
各開発者は自分の環境に合わせて `.env` ファイルを作成してください。

### 開発

```bash
# 開発サーバーを起動（BrowserSyncで自動リロード）
npm run dev
```

開発サーバーは `http://localhost:3000` で起動します。  
SCSSやJavaScriptの変更は自動でコンパイルされ、ブラウザが自動リロードされます。

### コンテンツの編集

サイトのコンテンツ（Works、Tech Notes、About、Contact）は別リポジトリ（[tkhsykk__devfolio-asset_private](https://github.com/tkhs/tkhsykk__devfolio-asset_private)）の `portfolio.csv` で管理されています。

ローカル開発時は、`.env` ファイルで設定したパスのCSVファイルを編集してください。  
編集後、`npm run dev` を実行中であれば自動的に再ビルドされ、ブラウザが自動リロードされます。

**本番環境（Cloudflare Pages / GitHub Actions）**: 別リポジトリから自動的に `portfolio.csv` が読み込まれます。  
手動でビルドする場合は `npm run build` を実行してください。

#### CSVファイルの形式

- **セクション**: A列にセクション名（`Works`、`Tech Notes`、`About`、`Contact`）
- **アイテムID**: B列にアイテムID（例：`works_01`、`note_01`）
- **セレクタ**: C列にCSSセレクタ（例：`.p-portfolio__work-details-title`）
- **値**: D列に表示する内容

詳細な形式については `notes/gulp-scss-ejs-csv.plan.md` を参照してください。

#### 画像の追加

画像ファイルは `private/images/` に配置してください。  
ビルド時に自動的に `site/images/` にコピーされます。

### ビルド

```bash
# 本番用ビルド（最適化・圧縮）
npm run build
```

ビルド結果は `site/` ディレクトリに出力されます。

## ディレクトリ構造

```
tkhsykk__devfolio/
├── src/                    # ソースファイル
│   ├── index.ejs           # メインEJSテンプレート
│   ├── _*.ejs              # EJSパーシャルテンプレート
│   └── assets/
│       ├── js/             # JavaScriptファイル
│       │   ├── main.js     # エントリーポイント
│       │   └── modules/    # モジュール化されたJS
│       │       ├── custom-cursor.js      # カスタムカーソル
│       │       ├── image-slider.js       # 画像スライダー・ライトボックス
│       │       ├── work-details.js       # ワーク詳細パネル
│       │       ├── scroll-animation.js   # スクロールアニメーション
│       │       ├── text-scramble.js      # テキストスクランブル
│       │       └── theme-toggle.js       # テーマ切り替え
│       └── scss/           # SCSSファイル（PDFLOCSS設計）
│           ├── style.scss  # エントリーポイント
│           ├── global/    # グローバル変数・関数・ミックスイン
│           ├── foundation/ # リセット・ベーススタイル
│           ├── layout/     # レイアウト（.l-*）
│           ├── component/ # コンポーネント（.c-*）
│           ├── utility/    # ユーティリティ（.u-*）
│           ├── project/    # プロジェクト固有（.p-*）
│           └── plugins/   # プラグイン用スタイル
├── private/                # コンテンツデータ（ローカル開発用）
│   └── images/             # 画像ファイル（ビルド時にsite/images/にコピー）
│                           # 注意: portfolio.csvは別リポジトリで管理（.envでパス指定）
├── site/                   # ビルド出力先（.gitignore対象）
│   └── index.html          # ビルド後のHTML（CSS、JS、画像はビルド時に生成）
├── create-anything/        # プロトタイプ生成時のファイル（.gitignore対象）
│   ├── mobile/            # React Native/Expoプロトタイプ
│   └── web/               # React Routerプロトタイプ
├── node_modules/          # 依存関係（.gitignore対象）
├── notes/                 # 開発メモ・計画書
├── gulpfile.js             # Gulp設定ファイル
├── package.json            # 依存関係・スクリプト定義
└── README.md               # このファイル
```

### 主要ディレクトリの説明

#### `src/assets/js/modules/`

モジュール化されたJavaScriptファイル。各モジュールは独立して動作し、必要に応じてインポートして使用します。

- **image-slider.js**: 画像スライダーとライトボックス機能。元の位置から画面中央へアニメーション拡大表示
- **work-details.js**: ワークカードクリックでグリッド内に詳細パネルを動的に表示
- **custom-cursor.js**: マウス位置に追従するカスタムカーソル
- **scroll-animation.js**: Intersection Observerを使用したスクロール連動アニメーション
- **text-scramble.js**: ランダムな文字遷移アニメーション
- **theme-toggle.js**: ライト/ダークモードの切り替え

#### `src/assets/scss/`

PDFLOCSS設計に基づいたSCSSファイル構造。

- **global/**: 変数、関数、ミックスイン、リセット、フォント定義
- **foundation/**: ベーススタイル、変数、ミックスイン
- **layout/**: サイト全体の骨組み（`.l-*`）
- **component/**: 再利用可能なUIコンポーネント（`.c-*`）
- **utility/**: 単機能のユーティリティクラス（`.u-*`）
- **project/**: ページ固有のスタイル（`.p-*`）

#### `private/portfolio.csv`

サイトのコンテンツデータを管理するCSVファイル。Works、Tech Notes、About、Contactセクションの内容を外部化しています。

- **セクション**: A列にセクション名
- **アイテムID**: B列にアイテムID
- **セレクタ**: C列にCSSセレクタ
- **値**: D列に表示する内容

このファイルを編集すると、次回のビルド時に自動的に反映されます。

## 技術スタック

### ビルドツール

- **Gulp**: タスクランナー
- **Sass (Dart Sass)**: SCSSコンパイル
- **esbuild**: JavaScriptバンドル
- **BrowserSync**: 開発サーバー・自動リロード
- **PostCSS**: CSS後処理（Autoprefixer、メディアクエリ結合）
- **EJS**: HTMLテンプレートエンジン
- **PapaParse**: CSVパーサー（コンテンツデータの読み込み）

### ライブラリ

- **@oddbird/popover-polyfill**: Popover APIのポリフィル

### CSS設計

- **PDFLOCSS**: レイヤー構造（global → foundation → layout → component → utility → project）

## デプロイ

本プロジェクトでは、デプロイは Cloudflare Pages によって main ブランチの更新をトリガーに自動実行されます。
GitHub Actions はデプロイ前の CI として機能しており、Pull Request 作成時に以下のチェックを自動で実行します。

- Lint / Format チェック
- ビルドエラーの検出
- 必要に応じたユニットテスト
- その他、デプロイ前に検証すべき項目

これにより、main ブランチにマージされるコードの品質を担保し、Cloudflare Pages のビルド失敗を未然に防ぐ設計としています。
なお、GitHub Actions 自体はデプロイ処理を実行せず、あくまで Cloudflare Pages による本番デプロイの前段階として CI を担当します。

## ライセンス

ISC

## 作者

tkhsykk
