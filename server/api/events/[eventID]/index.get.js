import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { eventID } = event.context.params;

	try {
		const { data: eventDetails, error } = await client
			.from("events")
			.select("*")
			.eq("id", eventID)
			.single();

		if (error) {
			throw new Error(error.message);
		}

		return {
			success: true,
			data: eventDetails,
		};
	} catch (err) {
		console.error(
			"Error occurred while loading event details",
			err.message
		);

		return {
			success: false,
			error: err.message,
		};
	}
});
