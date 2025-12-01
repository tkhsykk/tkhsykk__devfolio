# 技術スタックと進捗メモ

## プロジェクト概要

Anythingで生成されたReact Router v7 + Tailwind CSS から Gulp + SCSS (PDFLOCSS) + EJS + CSV への移行プロジェクト。

### devfolio開発フロー

01. ChatGPTに開発の流れを相談、ポートフォリオに必要な項目を挙げてもらう
02. ChatGPTに書いてもらったプロンプトを調整、それを元に[Anything](https://www.createanything.com/)でざっくりしたデザインを生成
03. Anythingで生成されたReact+Vite+Tailwind CSSのソースをダウンロード
04. ローカルでビルドできるよう調整
05. 自分で作ったCursor用汎用指示書mdcを設置し、ChatGPTと相談して一連の開発計画とチェックリストを作成（@gulp-scss-ejs-csv.plan.md）。以降はこのチェックリストに沿って開発
06. Cursor ProでReact->HTML+CSS+JSへ変換、Tailwindを剥がしてPDFLOCSS形式へ変換
07. Gulp + SCSS の開発環境構築（watch + BrowserSync。スタイル変更はリロードではなくStream形式）
08. JavaScriptモジュール化（image-slider.js、work-details.js、custom-cursor.js等）
09. EJS化（HTMLをパーシャルに分割してテンプレート構造を整備）
10. アクセシビリティチェック（WAI-ARIA、キーボード操作、Lighthouse）- 手動チェック
11. パフォーマンス最適化（Lighthouse、クリティカルCSS、フォント最適化）- 手動最適化
12. デプロイ前チェック（ビルド確認、リンク切れ、クロスブラウザテスト）- 手動チェック
13. Netlifyデプロイ設定（ビルドコマンド: `gulp build`）
14. 本番環境での動作確認と最終調整

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
- **gulp-plumber 1.2.1** - エラー時にストリームを継続
- **gulp-notify 5.0.0** - エラー時にポップアップ通知
- **browser-sync 3.0.4** - 開発サーバー（ライブリロード）
- **esbuild 0.27.0** - JavaScriptバンドラー

### ライブラリ

- **@oddbird/popover-polyfill 0.6.1** - Popover APIのポリフィル

### 開発環境

- **Volta** - Node.jsバージョン管理
  - Node.js: 20.17.0
  - npm: 10.8.2
  - `package.json`の`volta`フィールドでバージョンを固定

### CSS設計

**PDFLOCSS形式**を採用。

レイヤー構造：
- `global` - 変数・関数・ミックスインのみ公開し、`@forward`で他レイヤーへ渡す
- `foundation` - リセットとベースタイポの初期化を担当し、タグセレクタ設定はここで完結
- `layout` - `.l-*`でヘッダー／フッター／セクションなどサイト全体の骨組みを定義
- `component` - `.c-*`で再利用可能なUIを作り、ページ固有の命名は避ける
- `project` - `main.p-[page]`配下にページ固有の構造と上書きをまとめる
- `utility` - `.u-*`の単機能クラス。子孫セレクタで詳細度を上げない

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
│  ├─ index.html          # メインHTML（完成形、EJS化は未実装）
│  └─ assets/
│     ├─ scss/            # SCSSソース（PDFLOCSS）
│     │  ├─ style.scss    # エントリーポイント
│     │  ├─ global/       # グローバル変数・関数・ミックスイン
│     │  ├─ foundation/   # リセット・ベーススタイル
│     │  ├─ layout/       # レイアウト（.l-*）
│     │  ├─ component/    # コンポーネント（.c-*）
│     │  ├─ utility/       # ユーティリティ（.u-*）
│     │  ├─ project/      # プロジェクト固有（.p-*）
│     │  └─ plugins/      # プラグイン用スタイル
│     └─ js/              # JavaScriptソース（バンドル対象）
│        ├─ main.js       # エントリーポイント
│        └─ modules/      # モジュール化されたJS
│           ├─ custom-cursor.js      # カスタムカーソル
│           ├─ image-slider.js       # 画像スライダー・ライトボックス
│           ├─ work-details.js       # ワーク詳細パネル
│           ├─ scroll-animation.js  # スクロールアニメーション
│           ├─ text-scramble.js      # テキストスクランブル
│           ├─ theme-toggle.js       # テーマ切り替え
│           └─ page-transition.js    # ページ遷移（未使用）
├─ site/                  # ビルド出力先（.gitignore対象、Netlify公開用）
│  ├─ index.html          # ビルド後のHTML
│  ├─ css/
│  │  └─ style.css        # コンパイル済みCSS
│  ├─ js/                 # バンドル済みJS
│  └─ fonts/              # フォントファイル
├─ notes/                 # ドキュメント
│  ├─ gulp-scss-ejs-csv.plan.md
│  └─ tech-stack-and-progress.md
├─ gulpfile.js            # Gulp設定
└─ package.json
```

### 命名規則

- **レイアウト**: `.l-*` (例: `.l-container`, `.l-grid`)
- **コンポーネント**: `.c-*` (例: `.c-card`, `.c-badge`, `.c-button`, `.c-slider`, `.c-lightbox`, `.c-popover`)
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
- スタイル変更時はBrowserSyncのStream形式でリロードなしで反映

#### 本番ビルド
```bash
npm run build
```
- `gulp build`: 本番用ビルド
  - HTML: minify（空白削除、コメント削除）
  - CSS: SCSSコンパイル → PostCSS（autoprefixer → postcss-combine-media-query）→ minify（コメント削除）
  - JS: esbuildでバンドル
  - アセット: 画像・フォントなどをコピー（SCSS/JSソースは除外）

### JavaScriptモジュール

#### image-slider.js
- **ImageSlider**: 画像スライダー機能（前後ボタン、ページネーション、タッチスワイプ対応）
- **ImageLightbox**: 画像をクリックすると元の位置から画面中央へアニメーション拡大表示するライトボックス
- アクセシビリティ対応（ARIA属性、フォーカストラップ、キーボード操作）
- 共有インスタンスで全スライダーでライトボックスを共有

#### work-details.js
- ワークカードをクリックすると、グリッドレイアウト内に詳細ブロックを動的に挿入・表示
- 高さトランジションアニメーション付き
- グリッドの列数を動的に取得して適切な位置に挿入
- スライダーとの連携対応
- ESCキーで閉じる機能

#### custom-cursor.js
- マウス位置に追従するカスタムカーソル（マウスストーカー）
- 線形補間による滑らかな追従アニメーション
- ホバー対象（a、button、[data-cursor-hover]）でスタイル変更

#### scroll-animation.js
- Intersection Observerを使用したスクロール連動アニメーション
- `[data-scroll-trigger]`属性を持つ要素を監視
- 表示時に`is-visible`クラスを付与

#### text-scramble.js
- ランダムな文字遷移アニメーションでテキストを更新
- `[data-text-scramble]`属性と`data-text`属性で制御
- HTML置換機能（`data-html-replace`属性）

#### theme-toggle.js
- ライト/ダークモードの切り替え
- LocalStorageに保存
- OS設定（prefers-color-scheme）を初期値として使用

### アクセシビリティ対応

- **WAI-ARIA属性**: 適切なrole、aria-label、aria-hidden、aria-expanded等を設定
- **キーボード操作**: Tab、Shift+Tab、Enter、ESCキーに対応
- **フォーカストラップ**: モーダルやライトボックス内でフォーカスを閉じ込める
- **スクリーンリーダー対応**: aria-live、aria-atomic等で状態変化を通知
- **セマンティックHTML**: 適切なHTMLタグを使用（header、nav、main、section、article等）

### パフォーマンス最適化

- **Lighthouseスコア**: アクセシビリティ、パフォーマンス、SEO、ベストプラクティスを最適化
- **CSS最適化**: メディアクエリ結合、autoprefixer、minify
- **JavaScript最適化**: esbuildでバンドル・最適化
- **フォント最適化**: preconnect、適切なフォント読み込み

### デプロイ

- **Netlify**: 自動デプロイ設定済み
- **ビルドコマンド**: `gulp build`
- **公開ディレクトリ**: `site/`
- `main`ブランチへのプッシュで自動的にビルド・デプロイが実行される

## 実装予定機能

### EJS化（フェーズ2）📅
- **現状**: HTMLを1ファイル（`src/index.html`）で管理
- **予定**: パーシャル化してテンプレート構造を整備
- **使用ツール**: `gulp-ejs`を使用予定
- **目的**: メンテナンス性と再利用性の向上

### CSV化（フェーズ3）📅
- **現状**: データはHTMLに直接記述
- **予定**: 個人情報やコンテンツデータをCSV化して外部化
- **使用ツール**: `papaparse`を使用予定
- **目的**: データ管理の容易化とGitHub公開時の個人情報保護

## 参考資料

- 計画書: `notes/gulp-scss-ejs-csv.plan.md`
- Gulp設定: `gulpfile.js`
- パッケージ情報: `package.json`
- README: `README.md`
