import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { id } = event.context.params;
	const body = await readBody(event);

	try {
		const { data: criteriaData, error: criteriaError } = await client
			.from("event_criteria")
			.update(body)
			.eq("id", id)
			.select("*")
			.single();

		if (criteriaError) {
			throw new Error(criteriaError.message);
		}

		const { error: DeleteError } = await client
			.from("event_results")
			.delete()
			.eq("event_id", criteriaData.event_id);

		return {
			success: true,
			data: criteriaData,
		};
	} catch (error) {
		console.error(
			"Error occurred while updating criteria",
			error.message
		);
		return {
			success: false,
			error: error.message,
		};
	}
});
