import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { ruleId } = event.context.params;
	const body = await readBody(event);

	try {
		const { data: rulesData, error: rulesError } = await client
			.from("event_rules")
			.update(body)
			.eq("id", ruleId)
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
		console.error(
			"Error occurred while updating event rule",
			err.message
		);

		return {
			success: false,
			error: err.message,
		};
	}
});
