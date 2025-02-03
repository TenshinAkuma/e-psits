import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);

	const { data, error } = await client.from("participants").select();

	if (error) {
		console.error("Error fetching members: ", error.message);
	}

	return {
		data,
		error,
	};
});
