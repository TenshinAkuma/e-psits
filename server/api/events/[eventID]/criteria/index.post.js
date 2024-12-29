import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const body = await readBody(event);

	try {
		const { data: Criteria, error: CriteriaError } = await client
			.from("event_criteria")
			.insert(body)
			.select("id, name, description, rating")
			.single();

		if (CriteriaError) {
			throw new Error(
				`Error adding criteria: ${CriteriaError.message}`
			);
		}

		return {
			success: true,
			data: Criteria,
		};
	} catch (err) {
		console.error(err.message);
		return {
			success: false,
			error: err.message,
		};
	}
});
