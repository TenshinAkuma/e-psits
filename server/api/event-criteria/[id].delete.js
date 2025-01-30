import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { id } = event.context.params;

	try {
		const { data: criteriaData, error: criteriaError } = await client
			.from("event_criteria")
			.delete()
			.eq("id", id);

		if (criteriaError) {
			throw new Error(criteriaError.message);
		}

		return {
			success: true,
		};
	} catch (error) {
		console.error("Error during criteria deletion:", error.message);
		return {
			success: false,
			error: error.message,
		};
	}
});
