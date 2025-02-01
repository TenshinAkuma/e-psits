import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const body = await readBody(event);

	console.log("body", body);
	try {
		// Check if participant already exists in event_results
		const { data: resultExist } = await client
			.from("event_results")
			.select("id")
			.eq("participant_id", body.participant_id)
			.eq("event_id", body.event_id);

		if (Array.isArray(resultExist) && resultExist.length > 0) {
			throw new Error("Participant has already been evaluated.");
		}

		// Insert new result into event_results
		const { data: results, error: resultsError } = await client
			.from("event_results")
			.insert({
				participant_id: body.participant_id,
				event_id: body.event_id,
			})
			.select("id")
			.single();

		if (resultsError) {
			throw new Error(resultsError.message);
		}
		if (!results?.id) {
			throw new Error("Failed to insert event result.");
		}

		// Prepare score data for insertion
		const scoreData = body.scores.map(({ criteria_id, score }) => ({
			result_id: results.id,
			criteria_id,
			score,
		}));

		// Insert scores into event_scores table
		const { error: scoresError } = await client
			.from("event_scores")
			.insert(scoreData);

		if (scoresError) {
			throw new Error(scoresError.message);
		}

		// Fetch scores with event_criteria ratings
		const { data: scores, error: scoreFetchError } = await client
			.from("event_scores")
			.select("score, event_criteria(rating)")
			.eq("result_id", results.id);

		if (scoreFetchError) {
			throw new Error("Failed to fetch scores with ratings.");
		}

		console.log(scores);

		// Calculate weighted points
		const totalWeightedPoints = scores.reduce(
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
			.eq("id", results.id)
			.select()
			.single();

		if (finalResultError) {
			throw new Error(finalResultError.message);
		}

		return {
			success: true,
			data: scoreData,
			totalWeightedPoints,
		};
	} catch (err) {
		console.error("Error occurred while saving evaluation", err.message);

		return {
			success: false,
			error: err.message,
			data: null,
		};
	}
});
