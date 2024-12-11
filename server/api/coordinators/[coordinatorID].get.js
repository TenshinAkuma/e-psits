import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { coordinatorID } = event.context.params;

	return (
		await client
			.from("coordinators")
			.select("*, institutions!inner (name)")
			.eq("id", coordinatorID)
			.single()
	).data;
});
