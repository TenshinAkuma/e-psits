import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { criteriaId } = event.context.params;

	console.log("criteriaId", criteriaId);
	try {
		const { data, error } = await client
			.from("event_criteria")
			.delete()
			.eq("id", criteriaId);

		if (error) {
			throw new Error(`Error deleting criteria: ${error.message}`);
		}

		return {
			success: true,
			message: "Criteria successfully deleted.",
		};
	} catch (err) {
		console.error("Error during criteria deletion:", err.message);
		return {
			success: false,
			error: err.message,
		};
	}
});
