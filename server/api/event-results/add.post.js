import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const body = await readBody(event);

	try {
		const { data: scoreData, error: scoreError } = await client
			.from("event_scores")
			.insert(body)
			.select()
			.single();

		if (scoreError) {
			throw new Error(scoreError.message);
		}

		return {
			success: true,
			data: scoreData,
		};
	} catch (err) {
		console.error("Error occurred while saving score", err.message);

		return {
			success: true,
			error: err.message,
		};
	}
});
