import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);

	return (
		await client
			.from("coordinators")
			.select("*, institutions!inner (name)")
	).data;
});
