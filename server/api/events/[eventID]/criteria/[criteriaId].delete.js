import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { criteriaId } = event.context.params;

	console.log("criteriaId", criteriaId);
	try {
		const { data: criteria, error } = await client
			.from("event_criteria")
			.delete()
			.eq("id", criteriaId);

		if (error) {
			throw new Error(error.message);
		}

		return {
			success: true,
		};
	} catch (err) {
		console.error("Error during criteria deletion:", err.message);
		return {
			success: false,
			error: "Error occurred while deleting criteria",
		};
	}
});
