import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { id } = event.context.params;

	try {
		const { data: scoreData, error: scoreError } = await client
			.from("event_scores")
			.delete()
			.eq("id", id);

		if (scoreError) {
			throw new Error(scoreError.message);
		}

		return {
			success: true,
		};
	} catch (err) {
		console.err("Error occured while deleting scores", err.message);

		return {
			success: false,
			error: err.message,
		};
	}
});
