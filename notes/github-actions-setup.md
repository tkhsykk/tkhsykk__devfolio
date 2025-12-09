# GitHub Actions + Private Repo + Cloudflare Pages Direct Upload 設定手順

## 概要

このプロジェクトでは、GitHub Actions を使用して以下のフローで自動デプロイを行います：

1. **Public リポジトリ**（このリポジトリ）をチェックアウト
2. **Private リポジトリ**（CSVと画像を保存）をチェックアウト
3. Private リポジトリのファイルを Public リポジトリの `private/` にコピー
4. ビルド実行（`npm run build`）
5. **wrangler**（Cloudflare CLI）をインストール
6. **wrangler** を使用して Cloudflare Pages に Direct Upload

## 前提条件

- GitHub アカウント（無料プランで可）
- Cloudflare アカウント（無料プランで可）
- Private リポジトリ `tkhsykk__devfolio-asset_private` を作成済み

## セットアップ手順

### 1. Private リポジトリの作成

1. GitHub で新しいリポジトリを作成
   - リポジトリ名: `tkhsykk__devfolio-asset_private`（既に作成済み）
   - 可視性: **Private** を選択
   - README は不要（空のリポジトリでOK）

2. Private リポジトリにファイルをアップロード
   ```
   private-repo/
   ├── portfolio.csv
   └── images/
       ├── image1.jpg
       ├── image2.png
       └── ...
   ```

### 2. GitHub Personal Access Token (PAT) の作成

1. GitHub の Settings → Developer settings → Personal access tokens → Tokens (classic)
2. 「Generate new token (classic)」をクリック
3. 以下の設定で作成：
   - **Note**: `devfolio-private-repo-access`（任意の名前）
   - **Expiration**: 90 days または No expiration（推奨）
   - **Scopes**: `repo` にチェック（Private リポジトリへのアクセスに必要）
4. 「Generate token」をクリック
5. **トークンをコピー**（後で使うので必ず保存）

### 3. wrangler について

**wrangler** は Cloudflare が提供する公式 CLI ツールで、Cloudflare Pages への Direct Upload に必要です。

- GitHub Actions 内では `npx wrangler` を使用して自動的にダウンロード・実行されます（グローバルインストール不要）
- ローカルでテストする場合は `npm install -g wrangler` でインストールするか、`npx wrangler` を使用できます
- デプロイコマンド: `npx wrangler pages deploy <directory> --project-name=<project-name>`

### 4. Cloudflare API Token の作成

1. Cloudflare ダッシュボードにログイン
2. 「My Profile」→「API Tokens」を開く
3. 「Create Token」をクリック
4. **カスタムトークンを作成**（テンプレートは使用しない）：
   - **Token name**: `devfolio-pages-deploy`（任意の名前）
   - **Permissions**:
     - **Account** → **Cloudflare Pages** → **Edit**（重要：Workers ではなく Pages）
   - **Account Resources**: 対象のアカウントを選択
5. 「Continue to summary」→「Create Token」
6. **トークンをコピー**（後で使うので必ず保存）

### 5. Cloudflare Account ID の取得

1. Cloudflare ダッシュボードで任意のドメインを選択
2. 右サイドバーの「API」セクションに **Account ID** が表示されます
3. **Account ID をコピー**

### 6. Cloudflare Pages プロジェクト名の確認と Direct Upload 設定

1. Cloudflare ダッシュボード → **Pages** を開く
2. 既存のプロジェクト名を確認（例：`tkhsykk-devfolio`）
3. プロジェクト名をメモ

#### Direct Upload に切り替える（重要）

Direct Upload を使用するには、以下の2つの設定変更が必要です：

1. **GitHub 連携をオフにする**
   - プロジェクトの **Settings** → **Builds & deployments** を開く
   - **Source** セクションで、GitHub 連携が有効になっている場合は **Disconnect** をクリック
   - または、GitHub 連携を削除して、ソースを「None」にする

2. **Build Settings を "Direct Upload" に切り替える**
   - 同じ **Settings** → **Builds & deployments** ページで
   - **Build configuration** セクションを確認
   - **Source** が「Direct Upload」になっていることを確認（GitHub 連携をオフにすると自動的に「Direct Upload」になる）

**注意**: これらの設定変更を行わないと、GitHub Actions からの Direct Upload が失敗する可能性があります。

### 7. GitHub Secrets の設定

Public リポジトリ（このリポジトリ）の Settings → Secrets and variables → Actions で以下を設定：

| Secret 名 | 値 | 説明 |
|-----------|-----|------|
| `PRIVATE_REPO_OWNER` | `tkhsykk` | Private リポジトリのオーナー名 |
| `PRIVATE_REPO_NAME` | `tkhsykk__devfolio-asset_private` | Private リポジトリの名前 |
| `PRIVATE_REPO_TOKEN` | `ghp_xxxxxxxxxxxxx` | 手順2で作成したPAT |
| `CLOUDFLARE_API_TOKEN` | `xxxxxxxxxxxxx` | 手順4で作成したCloudflare API Token |
| `CLOUDFLARE_ACCOUNT_ID` | `xxxxxxxxxxxxx` | 手順5で取得したAccount ID |
| `CLOUDFLARE_PAGES_PROJECT_NAME` | `tkhsykk-devfolio` | 手順6で確認したプロジェクト名 |

### 8. GitHub Actions ワークフローの確認

このリポジトリには既に `.github/workflows/deploy.yml` が含まれており、以下の処理が自動実行されます：

1. Public リポジトリと Private リポジトリをチェックアウト
2. Private リポジトリのファイルを `private/` にコピー
3. `npm ci` で依存関係をインストール
4. `npm run build` でビルド実行（出力先: `site/`）
5. **`npx wrangler pages deploy site --project-name=${{ secrets.CLOUDFLARE_PAGES_PROJECT_NAME }}`** で Cloudflare Pages にデプロイ

**重要なデプロイコマンド**:
```bash
npx wrangler pages deploy site --project-name=${{ secrets.CLOUDFLARE_PAGES_PROJECT_NAME }}
```

このコマンドが実行されることで、`site/` ディレクトリの内容が Cloudflare Pages にアップロードされます。

### 9. 動作確認

1. `main` ブランチにプッシュ
2. GitHub の「Actions」タブでワークフローの実行状況を確認
3. 成功すれば Cloudflare Pages に自動デプロイされます
4. Cloudflare Pages ダッシュボードでデプロイ履歴を確認

## トラブルシューティング

### Private リポジトリのチェックアウトに失敗する

- PAT のスコープに `repo` が含まれているか確認
- `PRIVATE_REPO_OWNER` と `PRIVATE_REPO_NAME` が正しいか確認
- PAT の有効期限が切れていないか確認

### Cloudflare Pages へのデプロイに失敗する

- **Cloudflare Pages の設定を確認**：
  - GitHub 連携がオフになっているか確認（手順6を参照）
  - Build Settings が "Direct Upload" になっているか確認
- `wrangler` が正しくインストールされているか確認（GitHub Actions のログを確認）
- `CLOUDFLARE_API_TOKEN` の権限が正しいか確認（**Account → Cloudflare Pages → Edit**、Workers ではない）
- `CLOUDFLARE_ACCOUNT_ID` が正しいか確認
- `CLOUDFLARE_PAGES_PROJECT_NAME` が既存のプロジェクト名と一致しているか確認
- デプロイコマンド: `npx wrangler pages deploy site --project-name=<project-name>` が正しく実行されているか確認（GitHub Actions のログで確認）

### ビルドエラー

- Private リポジトリに `portfolio.csv` と `images/` が正しく配置されているか確認
- ファイルパスが正しいか確認（`private-repo/portfolio.csv`、`private-repo/images/`）

## 注意事項

- Private リポジトリのファイル構造は以下の通りである必要があります：
  ```
  private-repo/
  ├── portfolio.csv
  └── images/
      └── (画像ファイル)
  ```
- GitHub Actions の無料プランでは月2000分の実行時間が提供されます（通常の使用では十分）
- Cloudflare Pages の無料プランでも Direct Upload は利用可能です

