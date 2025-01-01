import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { id } = event.context.params;

	try {
		const { data: rulesData, error: rulesError } = await client
			.from("event_rules")
			.select("id, name, description")
			.eq("event_id", id);

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
