import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { id } = event.context.params;
	const body = await readBody(event);

	console.log(body);
	try {
		const { data: scoreData, error: scoreError } = await client
			.from("event_scores")
			.upsert(body)
			.select("score, event_criteria(rating)");

		if (scoreError) {
			throw new Error(scoreError.message);
		}

		const totalWeightedPoints = scoreData.reduce(
			(sum, { score, event_criteria }) => {
				const rating = event_criteria?.rating ?? 0; // Default to 0 if rating is null
				const points = (score * rating) / 100;
				return sum + points;
			},
			0
		);

		console.log(totalWeightedPoints);

		// Update the event_results table with total weighted points
		const { error: finalResultError } = await client
			.from("event_results")
			.update({ weighted_points: totalWeightedPoints })
			.eq("id", id);

		if (finalResultError) {
			throw new Error(finalResultError.message);
		}

		return {
			success: true,
			data: scoreData,
		};
	} catch (error) {
		console.error(
			"Error occurred while updating event results update:",
			error.message
		);

		return {
			success: false,
			error: error.message,
		};
	}
});
