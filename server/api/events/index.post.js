import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const body = await readBody(event);

	const { data, error } = await client
		.from("events")
		.insert(body)
		.select("*")
		.maybeSingle();

	if (error) {
		console.error("Error creating event: ", error.message);

		return {
			data: null,
			error: error.message,
		};
	}

	return {
		data: data,
	};
});
