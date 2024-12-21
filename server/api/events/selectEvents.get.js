import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);

	try {
		const { data: EventOptions, error } = await client
			.from("events")
			.select("id, title");

		if (error) {
			throw new Error(error.message); // Explicitly handle Supabase errors
		}

		return {
			success: true,
			EventOptions,
		};
	} catch (err) {
		return {
			success: false,
			error: err.message || "An unknown error occurred",
		};
	}
});
