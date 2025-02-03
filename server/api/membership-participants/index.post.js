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
		console.error("Error fetching members: ", error.message);
	}

	return {
		data,
		error,
	};
});
