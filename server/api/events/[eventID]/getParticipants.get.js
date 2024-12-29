import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { eventID } = event.context.params;

	try {
		// Fetch data from Supabase
		const { data: participants, error: errorParticipants } = await client
			.from("event_registrations")
			.select(
				"id, registration_status, participants(id, first_name, last_name, sex, institutions(id, name))"
			)
			.eq("event_id", eventID);

		// Handle Supabase errors
		if (errorParticipants) {
			throw new Error(
				"Error occurred while registering participant ",
				errorParticipants.message
			);
		}

		return {
			success: true,
			data: participants,
		};
	} catch (err) {
		return {
			success: false,
			error: err.message,
		};
	}
});
