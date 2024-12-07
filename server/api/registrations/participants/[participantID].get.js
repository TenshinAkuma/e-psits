import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { participantID } = event.context.params;

	return (
		await client
			.from("participant_registrations")
			.select(
				"registration_status, participants(id, name), events(id, title)"
			)
			.eq("participant_id", participantID)
			.single()
	).data;
});
