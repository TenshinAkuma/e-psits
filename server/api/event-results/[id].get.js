import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { id } = event.context.params;

	try {
		const { data: scoreData, error: scoreError } = await client
			.from("event_scores")
			.select(
				"id, score, registration_id, criteria_id, event_criteria(name, rating), event_registrations(event_id)"
			)
			.eq("event_registrations.event_id", id);

		if (scoreError) {
			throw new Error(scoreError.message);
		}

		return {
			success: true,
			data: scoreData,
		};
	} catch (err) {
		console.error(
			"Error occurred while saving event result",
			err.message
		);

		return {
			success: true,
			error: err.message,
		};
	}
});
