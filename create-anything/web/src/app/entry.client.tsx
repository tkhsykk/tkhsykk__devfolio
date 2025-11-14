/**
 * クライアントサイドエントリーポイント
 * React Router v7のクライアントサイドハイドレーションを実行
 */
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";

startTransition(() => {
	hydrateRoot(
		document,
		<StrictMode>
			<HydratedRouter />
		</StrictMode>
	);
});
