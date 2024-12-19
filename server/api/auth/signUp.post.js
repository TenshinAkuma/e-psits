import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const body = await readBody(event);

	console.log(body);
	const { data, error } = await client.auth.signUp(body);

	try {
		console.log("data", data);
	} catch {
		console.log("error", error);
	}
});
