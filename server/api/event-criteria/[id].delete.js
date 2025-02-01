import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { id } = event.context.params;

	try {
		const { data: criteriaExist } = await client
			.from("event_criteria")
			.select("event_id")
			.eq("id", id)
			.maybeSingle();

		if (!criteriaExist) {
			throw new Error("Criteria not found.");
		}

		const { data: criteriaData, error: criteriaError } = await client
			.from("event_criteria")
			.delete()
			.eq("id", id);

		if (criteriaError) {
			throw new Error(criteriaError.message);
		}

		const { error: DeleteError } = await client
			.from("event_results")
			.delete()
			.eq("event_id", criteriaExist.event_id);

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
