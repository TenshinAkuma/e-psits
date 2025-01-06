import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const query = getQuery(event);

	console.log(query);
	try {
		const { data: rulesData, error: rulesError } = await client
			.from("event_rules")
			.delete()
			.eq("id", query.id);

		if (rulesError) {
			throw new Error(rulesError.message);
		}

		return {
			success: true,
		};
	} catch (err) {
		console.error(
			"Error occurred while deleting event rule",
			err.message
		);

		return {
			success: false,
			error: err.message,
		};
	}
});
