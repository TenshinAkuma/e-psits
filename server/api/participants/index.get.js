import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);

	return (
		await client
			.from("participants")
			.select(
				"id, name, school, course, year, email, registration_status, events(title)"
			)
	).data;
});
