import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);

	const { data, error } = await client
		.from("institutions", { count: "exact" })
		.select("*, coordinators(first_name, last_name)")
		.order("created_at", { ascending: false });

	if (error) {
		console.error("Error fetching member institutions: ", error);
	}

	return {
		data,
		error,
	};
});
