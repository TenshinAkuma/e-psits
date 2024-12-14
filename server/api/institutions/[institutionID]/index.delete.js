import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { institutionID } = event.context.params;

	return (
		await client
			.from("institutions")
			.delete()
			.eq("id", institutionID)
			.single()
	).data;
});
