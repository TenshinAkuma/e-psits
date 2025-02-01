import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { id } = event.context.params;

	try {
		const { data: scoreData, error: scoreError } = await client
			.from("event_results")
			.select("*, participants(first_name, last_name), event_scores!left (id, score, event_criteria(id, name, rating))")
			.eq("event_id", id)
			.order("weighted_points", { ascending: false });

		if (scoreError) {
			throw new Error(scoreError.message);
		}

		return {
			success: true,
			data: scoreData,
		};
	} catch (err) {
		console.error(
			"Error occurred while loading event results",
			err.message
		);

		return {
			success: true,
			error: err.message,
			data: null
		};
	}
});
