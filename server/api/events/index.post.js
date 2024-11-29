import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const client = await serverSupabaseClient(event);

	console.log(body);
	return (await client.from("events").insert(body).select().single()).data;
});
