import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { id } = event.context.params;

	const { data, error } = await client
		.from("events")
		.select("*")
		.eq("id", id)
		.single();

	if (error) {
		console.error("Error fetching all events: ", error.message);

		return {
			data: null,
			error: error.message,
		};
	}

	return {
		data,
	};
});
