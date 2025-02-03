import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);

	const { data, count, error } = await client
		.from("participants")
		.select("*", { count: "exact" });

	if (error) {
		console.error("Error fetching members: ", error.message);
	}

	return {
		data,
		count,
		error,
	};
});
