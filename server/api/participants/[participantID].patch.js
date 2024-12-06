import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { participantID } = event.context.params;
	const body = await readBody(event);

	console.log(body);
	return (
		await client
			.from("participants")
			.update(body)
			.eq("id", participantID)
			.select()
	).data;
});
