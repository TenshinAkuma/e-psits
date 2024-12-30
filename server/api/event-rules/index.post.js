import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const body = await readBody(event);
	const query = getQuery(event);

	try {
		const { data: rulesData, error: rulesError } = await client
			.from("event_rules")
			.insert(body)
			.select("id, name, description")
			.single();

		if (rulesError) {
			throw new Error(rulesError.message);
		}

		return {
			success: true,
			data: rulesData,
		};
	} catch (err) {
		console.err("Error occurred while creating event rule", err.message);

		return {
			success: false,
			error: err.message,
		};
	}
});
