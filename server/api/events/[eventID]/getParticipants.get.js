import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { eventID } = event.context.params;

	return (
		await client
			.from("participant_registrations")
			.select(
				"id, registration_status, participants (*, institutions(name))"
			)
			.eq("event_id", eventID)
	).data;
});
