import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const body = await readBody(event);

	try {
		const { data: rulesData, error: rulesError } = await client
			.from("event_rules")
			.insert(body)
			.select("*")
			.single();

		if (rulesError) {
			throw new Error(rulesError.message);
		}

		return {
			success: true,
			data: rulesData,
		};
	} catch (err) {
		console.error("Error occurred while creating event rule", err.message);

		return {
			success: false,
			error: err.message,
		};
	}
});
