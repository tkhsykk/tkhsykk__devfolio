# tkhsykk__devfolio

ポートフォリオサイト「[devfolio]」のリポジトリです。

## 目的

このプロジェクトは、LLM（ChatGPT/Cursor）と人間が協働して開発したポートフォリオサイトです。

### 主な目的

1. **ポートフォリオの作成**: 転職活動に向けて、実装コードとデザインの両方を示せるポートフォリオサイトを作成
2. **LLM協働開発の実践**: 「できるだけ人間が手を動かさない」という方針で、LLM中心の開発フローを試行
3. **技術スタックの実演**: 実際の開発で使用している技術スタック（Gulp、SCSS、PDFLOCSS設計、モジュール化されたJavaScript）を実装

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

### 開発

```bash
# 開発サーバーを起動（BrowserSyncで自動リロード）
npm run dev
```

開発サーバーは `http://localhost:3000` で起動します。  
SCSSやJavaScriptの変更は自動でコンパイルされ、ブラウザが自動リロードされます。

### コンテンツの編集

サイトのコンテンツ（Works、Tech Notes、About、Contact）は `private/portfolio.csv` で管理されています。

```bash
# CSVファイルを編集
# private/portfolio.csv を編集すると、次回のビルド時に反映されます
```

CSVファイルを編集後、`npm run dev` を実行中であれば自動的に再ビルドされ、ブラウザが自動リロードされます。  
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
├── private/                # コンテンツデータ
│   ├── portfolio.csv       # コンテンツデータ（Works、Tech Notes、About、Contact）
│   └── images/             # 画像ファイル（ビルド時にsite/images/にコピー）
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

### .gitignore対象のディレクトリ

以下のディレクトリは`.gitignore`で無視されており、リポジトリには含まれません：

- **node_modules/**: npmパッケージの依存関係（`npm install`で生成）
- **site/**: ビルド出力先（`npm run build`で生成）
- **create-anything/mobile/**: プロトタイプ生成時に作成されたReact Native/Expoプロジェクト
- **create-anything/web/**: プロトタイプ生成時に作成されたReact Routerプロジェクト
- **.vscode/**: Visual Studio Codeの設定ファイル
- **.idea/**: IntelliJ IDEAの設定ファイル
- **.cache/**: ビルドキャッシュ
- **.temp/**: 一時ファイル
- **logs/**: ログファイル

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

GitHub Actions + Private リポジトリ + Cloudflare Pages Direct Upload を使用して自動デプロイしています。BASIC認証を設定済みです。

### デプロイフロー

1. **Public リポジトリ**（このリポジトリ）に `main` ブランチへプッシュ
2. GitHub Actions が自動的に実行：
   - Public リポジトリをチェックアウト
   - Private リポジトリ（CSVと画像を保存）をチェックアウト
   - Private リポジトリのファイルを `private/` にコピー
   - ビルド実行（`npm run build`）
   - Cloudflare Pages に Direct Upload

### セットアップ

初回セットアップ時は `notes/github-actions-setup.md` を参照してください。

- Private リポジトリの作成
- GitHub Personal Access Token (PAT) の作成
- Cloudflare API Token の作成
- GitHub Secrets の設定

## ライセンス

ISC

## 作者

tkhsykk
