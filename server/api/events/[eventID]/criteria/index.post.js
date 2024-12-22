import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const body = await readBody(event);

	try {
		const { data: Criteria, error: CriteriaError } = await client
			.from("event_criteria")
			.insert(body);

		if (CriteriaError) {
			throw new Error(
				`Error creating criteria: ${CriteriaError.message}`
			);
		}

		return {
			success: true,
			message: "Criteria successfully created.",
		};
	} catch (err) {
		console.error("Error during criteria creation:", err.message);
		return {
			success: false,
			error: err.message,
		};
	}
});
