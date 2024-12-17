import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const body = await readBody(event);
	return (
		await client
			.from("participant_registrations")
			.insert(body)
			.select()
			.single()
	).data;
});
