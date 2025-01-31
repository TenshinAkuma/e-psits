import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);

	try {
		const { data, error } = await client
			.from("institutions")
			.select("id, name");

		if (error) {
			throw new Error(error.message);
		}

		return {
			success: true,
			data,
		};
	} catch (err) {
		console.error("Error while retrieving participant options:", err.message)
		return {
			success: false,
			error: err.message,
			data: null
		};
	}
});
