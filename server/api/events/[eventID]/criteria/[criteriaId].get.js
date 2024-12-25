import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { criteriaId } = event.context.params;

	try {
		const { data: criteria, error: criteriaError } = await client
			.from("event_criteria")
			.select("*")
			.eq("id", criteriaId)
			.single();

		if (criteriaError) {
			throw new Error(criteriaError.message);
		}

		return {
			success: true,
			message: "Criteria fetched successfully",
			criteria,
		};
	} catch (err) {
		console.error("Error occurred while fetching criteria", er.message);

		return {
			success: false,
			message: "Error occurred while fetching criteria",
		};
	}
});
