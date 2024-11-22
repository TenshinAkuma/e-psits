import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { eventID } = event.context.params;

	return (await client.from("events").select("*").eq("id", eventID).single())
		.data;
});
