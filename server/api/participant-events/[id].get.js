import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { id } = event.context.params;

	try {
		const { data: participantData, error: participantError } =
			await client
				.from("event_registrations")
				.select(
					"*, events!left(title, event_results!left(weighted_points, event_scores!left(score, event_criteria(name))))"
				)
				.eq("participant_id", id);

		if (participantError) {
			throw new Error(participantError.message);
		}

		return {
			success: true,
			data: participantData,
		};
	} catch (error) {
		console.error(
			"Error occurred while loading participant",
			error.message
		);

		return {
			success: false,
			error: error.message,
			data: null,
		};
	}
});
