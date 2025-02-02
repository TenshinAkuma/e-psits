import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);

	const { data, error } = await client.from("events").select().order("date");

	if (error) {
		console.error("Error fetching all events: ", error.message);
		return {
			data: null,
			error,
		};
	}

	return {
		data: data,
	};
});
