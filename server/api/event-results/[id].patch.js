import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { id } = event.context.params;
	const body = await readBody(event);

	try {
		const { data: scoreData, error: scoreError } = await client
			.from("event_scores")
			.update(body)
			.eq("id", id)
			.select(
				"id, score, registration_id, criteria_id, event_criteria(name, rating), event_registrations(participants(first_name, last_name))"
			)
			.single();

		if (scoreError) {
			throw new Error(scoreError.message);
		}

		return {
			success: true,
			data: scoreData,
		};
	} catch (error) {
		console.error(
			"Error occurred while saving event results update",
			error.message
		);

		return {
			success: false,
			error: error.message,
		};
	}
});
