import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { participantID, eventID } = await getQuery(event);

	return (
		await client
			.from("participant_registrations")
			.select("id")
			.eq("event_id", eventID)
			.eq("participant_id", participantID)
			.single()
	).data;
});
