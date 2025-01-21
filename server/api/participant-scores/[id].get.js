import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { id } = event.context.params;

	try {
		const { data: scoreData, error: scoreError } = await client
			.from("event_scores")
			.select("*")
			.eq("registration_id", id);

		if (scoreError) {
			throw new Error(scoreError.message);
		}

		return {
			success: true,
			data: scoreData,
		};
	} catch (error) {
		console.error("Error occurred while loading scores. ", error.message);
		return {
			success: false,
			error: error.message,
		};
	}
});
