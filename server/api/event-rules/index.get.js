import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);

	try {
		const { data: rulesData, error: rulesError } = await client
			.from("event_rules")
			.select("id, name, description");

		if (rulesError) {
			throw new Error(rulesError.message);
		}

		return {
			success: true,
			data: rulesData,
		};
	} catch (err) {
		console.error("Error while fetching event rules", err.message);

		return {
			success: false,
			error: err.message,
		};
	}
});
