import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const body = await readBody(event);

	console.log(body);
	const { data, error } = await client
		.from("institutions")
		.insert(body)
		.select()
		.single();

	if (error) {
		console.error("Error creating member institution: ", error.message);
	}

	return {
		data,
		error,
	};
});
