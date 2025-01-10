import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	
	const client = await serverSupabaseClient(event);
	const body = await readBody(event);

	try {
		const { data: eventsData, error: eventsError } = await client
			.from("events")
			.insert(body)
			.select("*")
			.single();

		if (eventsError) {
			throw new Error(eventsError.message);
		}

		return {
			success: true,
			data: eventsData,
		};
	} catch (error) {
		console.error("Error occurred while saving new event", error.message);

		return {
			success: false,
			error: error.message,
		};
	}
});
