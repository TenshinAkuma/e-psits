import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const body = await readBody(event);

	console.log(body);
	try {
		const { data: _criteriaData, error: _criteriaError } = await client
			.from("event_criteria")
			.insert(body)
			.select("id, name, description, rating")
			.single();

		if (_criteriaError) {
			throw new Error(_criteriaError.message);
		}

		return {
			success: true,
			data: _criteriaData,
		};
	} catch (error) {
		console.error("Error while  creating criteria", error.message);
		return {
			success: false,
			error: err.message,
		};
	}
});
