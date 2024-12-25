import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { criteriaId } = event.context.params;
	const body = await readBody(event);

	console.log("body", body);
	try {
		const { error } = await client
			.from("event_criteria")
			.update(body)
			.eq("id", criteriaId);

		if (error) {
			throw new Error(error.message);
		}

		return {
			success: true,
			message: "Criteria updated successfully",
		};
	} catch (err) {
		console.error("Error occurred while updating criteria", err.message);
		return {
			success: true,
			message: "Criteria updated successfully",
		};
	}
});
