import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const body = await readBody(event);

	console.log("body", body[0].registration_id);
	try {
		const { data: scoreExistsData, error: scoreExistsError } =
			await client
				.from("event_scores")
				.select("id")
				.eq("registration_id", body[0].registration_id);

		if (scoreExistsData.length > 0) {
			throw new Error("Participant has already been evaluated.");
		}

		const { data: scoreData, error: scoreError } = await client
			.from("event_scores")
			.insert(body)
			.select("score, registration_id, criteria_id, event_criteria(name, rating), event_registrations(participants(first_name, last_name))");

		if (scoreError) {
			throw new Error(scoreError.message);
		}

		return {
			success: true,
			data: scoreData,
		};
	} catch (err) {
		console.error("Error occurred while saving evaluation", err.message);

		return {
			success: true,
			error: err.message,
		};
	}
});
