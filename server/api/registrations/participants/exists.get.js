import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const body = await readBody(event);

	console.log("participantID", body.participant_id);
	console.log("eventID", body.event_id);
	return (
		await client
			.from("event_registrations")
			.select("id")
			.eq("event_id", body.event_id)
			.eq("participant_id", body.participant_id)
			.single()
	).data;
});
