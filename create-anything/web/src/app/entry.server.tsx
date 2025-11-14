/**
 * サーバーサイドエントリーポイント
 * React Router v7のサーバーサイドレンダリングを実行
 */
import type { EntryContext } from "react-router";
import { renderToString } from "react-dom/server";
import { ServerRouter } from "react-router";

export default function handleRequest(
	request: Request,
	responseStatusCode: number,
	responseHeaders: Headers,
	routerContext: EntryContext
) {
	const html = renderToString(<ServerRouter context={routerContext} />);
	responseHeaders.set("Content-Type", "text/html");
	return new Response("<!DOCTYPE html>" + html, {
		status: responseStatusCode,
		headers: responseHeaders,
	});
}
