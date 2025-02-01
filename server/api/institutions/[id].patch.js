import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { institutionID } = event.context.params;
	const body = await readBody(event);

	return (
		await client
			.from("institutions")
			.update(body)
			.eq("id", institutionID)
			.select()
	).data;
});
