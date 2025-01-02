import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const body = await readBody(event);

	console.log("body", body);
	try {
		const { data: resultData, error: resultError } = await client
			.from("event_scores")
			.insert(body)
			.select();

		if (resultError) {
			throw new Error(resultError.message);
		}

		return {
			success: true,
			data: resultData,
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
