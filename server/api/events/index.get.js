import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);

	try {
		const { data: eventsData, error: eventsError } = await client
			.from("events")
			.select()
			.order("date");

		if (eventsError) {
			throw new Error(eventsError.message);
		}

		return {
			success: true,
			data: eventsData,
		};
	} catch (error) {
		console.error("Error while fetching events", error.message);

		return {
			success: false,
			error: error.message,
		};
	}
});
