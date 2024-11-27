import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { eventID } = event.context.params;
	const { column } = getQuery(event);
	const { body } = readBody(event);

	return (
		await client
			.from("events")
			.update({ [column]: body })
			.eq("id", eventID)
			.select()
	).data;
});
