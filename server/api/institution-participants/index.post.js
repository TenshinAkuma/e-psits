import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const body = await readBody(event);

	const { data, error } = await client
		.from("participants")
		.insert(body)
		.select();

	if (error) {
		console.error("Error saving institution: ", error.message);

		return {
			error,
		};
	}

	return {
		data,
	};
});
