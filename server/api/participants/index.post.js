import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const body = await readBody(event);

	const { data, error } = await client
		.from("participants")
		.insert(body)
		.select()
		.single();

	if (error) {
		console.error(
			"Error occurred while saving participant",
			error.message
		);

		return {
			data: null,
			error: error.message,
		};
	}

	return {
		data,
	};
});
