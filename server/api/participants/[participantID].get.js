import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { participantID } = event.context.params;

	return (
		await client
			.from("participants")
			.select(
				"id, name, school, course, year, email, registration_status, address, phone_number, dob, event_id, events(title)"
			)
			.eq("id", participantID)
			.single()
	).data;
});
