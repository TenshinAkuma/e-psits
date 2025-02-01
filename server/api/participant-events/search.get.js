import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { query } = getQuery(event);

	try {
		// Get eventTitle from query and ensure it's a string
		const eventTitle = query.trim() || "a";

		const { data, error } = await client
			.from("events")
			.select("id, title, category") // Ensure these columns exist in your DB
			.ilike("title", `%${eventTitle}%`)
			.limit(10);

		if (error) {
			throw new Error(error.message);
		}

		return {
			success: true,
			data,
		};
	} catch (error) {
		console.error("Error while loading event options:", error.message);

		return {
			success: false,
			error: error.message,
			data: [],
		};
	}
});
