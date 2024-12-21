import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { eventID } = event.context.params;

	try {
		// Fetch data from Supabase
		const { data, error } = await client
			.from("event_registrations")
			.select(
				"id, registration_status, participants(*, institutions(id, name))"
			)
			.eq("event_id", eventID);

		// Handle Supabase errors
		if (error) {
			throw new Error(error.message);
		}

		return {
			success: true,
			data,
		};
	} catch (err) {
		return {
			success: false,
			error:
				err.message ||
				"An unknown error occurred while fetching data.",
		};
	}
});
