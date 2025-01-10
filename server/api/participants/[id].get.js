import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { participantID } = event.context.params;

	return (
		await client
			.from("participants")
			.select("*")
			.eq("id", participantID)
			.single()
	).data;
});
