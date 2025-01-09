import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const query = getQuery(event);

	try {
		const { data: scoreData, error: scoreError } = await client
			.from("event_scores")
			.delete()
			.eq("registration_id", query.id);

		if (scoreError) {
			throw new Error(scoreError.message);
		}

		return {
			success: true,
		};
	} catch (error) {
		console.error("Error occurred while deleting scores", error.message);

		return {
			success: false,
			error: error.message,
		};
	}
});
