export async function onRequest(context) {
	// Cloudflare Pages Functions の環境変数
	const user = context.env.BASIC_USER;
	const pass = context.env.BASIC_PASS;

	// クライアントから送られてきた Authorization ヘッダ
	const auth = context.request.headers.get("authorization");

	// 正しい Basic 認証ヘッダ
	const expected = "Basic " + btoa(`${user}:${pass}`);

	// 認証成功 → 次の処理へ
	if (auth === expected) {
		return context.next();
	}

	// 認証失敗 → Basic認証ダイアログを返す
	return new Response("Unauthorized", {
		status: 401,
		headers: {
			"WWW-Authenticate": 'Basic realm="Restricted Area"'
		}
	});
}
