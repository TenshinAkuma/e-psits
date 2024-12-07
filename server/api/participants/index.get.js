import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);

	return (
		await client
			.from("participant_registrations")
			.select(
				"events(id, title), participants(id, name, school, email), registration_status"
			)
	).data;
});
