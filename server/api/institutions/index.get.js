import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);

	const { data, error } = await client
		.from("institutions")
		.select("*, coordinators (*)")
		.order("name", { ascending: true });

	if (error) {
		console.error("Error fetching all institutions: ", error.message);
		return {
			data: null,
			error: error.message,
		};
	}

	return {
		data,
	};
});
