import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { id } = event.context.params;
	const body = await readBody(event);

	const { data, error } = await client
		.from("events")
		.update(body)
		.eq("id", id)
		.select()
		.maybeSingle();

	if (error) {
		console.error("Error fetching event: ", error.message);
		return {
			data: null,
			error,
		};
	}

	return {
		data,
	};
});
