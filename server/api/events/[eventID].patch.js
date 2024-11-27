import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { eventID } = event.context.params;
	const { column } = getQuery(event);
	const body = await readBody(event);

	return (
		await client
			.from("events")
			.update({ [column]: body.value })
			.eq("id", eventID)
			.select()
	).data;
});
