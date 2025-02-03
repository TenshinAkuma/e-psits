import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { id } = event.context.params;
	const body = await readBody(event);

	const { data, error } = await client
		.from("institutions")
		.update(body)
		.eq("id", id)
		.select();

	if (error) {
		console.error(
			"Error updating institution membership status: ",
			error.message
		);
	}

	return {
		data,
		error,
	};
});
