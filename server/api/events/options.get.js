import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);

	const { data, error } = await client.from("events").select("id, title");

	if (error) {
		console.error("Error fetching event options: ", error.message);

		return {
			data: null,
			error: error.message,
		};
	}

	return {
		data,
	};
});
