import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { institutionID } = event.context.params;

	console.log("institutionID");
	return (
		await client
			.from("institutions")
			.select("*, coordinators (*)")
			.eq("id", institutionID)
			.single()
	).data;
});
