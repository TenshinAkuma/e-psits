import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);

	const { data, count, error } = await client
		.from("participants")
		.select("*, institutions(name)", { count: "exact" })
		.order("created_at", { ascending: false });

	if (error) {
		console.error("Error fetching members: ", error.message);
	}

	return {
		data,
		count,
		error,
	};
});
