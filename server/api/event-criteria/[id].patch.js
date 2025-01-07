import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { id } = event.context.params;
	const body = await readBody(event);

	console.log("body", body);
	try {
		const { data: criteriaData, error: criteriaError } = await client
			.from("event_criteria")
			.update(body)
			.eq("id", id)
			.select("id, name, description, rating")
			.single();

		if (error) {
			throw new Error(criteriaError.message);
		}

		console.log("response", criteria);
		return {
			success: true,
			data: criteria,
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
