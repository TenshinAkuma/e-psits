import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { criteriaId } = event.context.params;
	const body = await readBody(event);

	console.log("body", body);
	try {
		const { data: criteria, error } = await client
			.from("event_criteria")
			.update(body)
			.eq("id", criteriaId)
			.select("id, name, description, rating")
			.single();

		if (error) {
			throw new Error(error.message);
		}

		console.log("response", criteria);
		return {
			success: true,
			data: criteria,
		};
	} catch (err) {
		console.error("Error occurred while updating criteria", err.message);
		return {
			success: false,
			error: "Error occurred while updating criteria",
		};
	}
});
