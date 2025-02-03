import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);

	const { data, error } = await client
		.from("institutions", { count: "exact" })
		.select();

	if (error) {
		console.error("Error fetching member institutions: ", error.message);
	}

	return {
		data,
		error,
	};
});
