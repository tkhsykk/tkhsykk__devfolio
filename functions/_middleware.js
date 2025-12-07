export async function onRequest(context) {
	const auth = context.request.headers.get("authorization");
	const user = context.env.BASIC_USER;
	const pass = context.env.BASIC_PASS;
	const expected = "Basic " + btoa(`${user}:${pass}`);

	if (auth === expected) {
		return await context.next();
	}

	return new Response("Unauthorized", {
		status: 401,
		headers: {
			"WWW-Authenticate": 'Basic realm="Restricted Area"'
		}
	});
}
