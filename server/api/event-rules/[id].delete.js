import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { id } = event.context.params;

	try {
		const { data: rulesData, error: rulesError } = await client
			.from("event_rules")
			.delete()
			.eq("id", id);

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
