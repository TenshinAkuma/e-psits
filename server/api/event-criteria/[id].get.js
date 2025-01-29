import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { id } = event.context.params;

	try {
		const { data: criteriaData, error: criteriaError } = await client
			.from("event_criteria")
			.select("*")
			.eq("event_id", id)
			.order("id", { ascending: true });

		if (criteriaError) {
			throw new Error(criteriaError.message);
		}

		return {
			success: true,
			data: criteriaData,
		};
	} catch (error) {
		console.error(
			"Error occurred while fetching criteria",
			error.message
		);

		return {
			success: false,
			message: error.message,
		};
	}
});
