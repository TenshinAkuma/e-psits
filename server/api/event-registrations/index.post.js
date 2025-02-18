import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const body = await readBody(event);

	console.log("Event Registration Body:", body);
	try {
		// Check if the participant is already registered for the event
		const { data: participantExists, error: participantError } =
			await client
				.from("event_registrations")
				.select("id")
				.eq("event_id", body.event_id)
				.eq("participant_id", body.participant_id)
				.maybeSingle();

		if (participantError) {
			// Handle unexpected errors (e.g., database issues)
			throw new Error(participantError.message);
		}

		if (participantExists) {
			// Prevent duplicate registration
			throw new Error(
				"Participant is already registered for this event."
			);
		}

		// Insert the new registration
		const { data: Participant, error: registrationError } = await client
			.from("event_registrations")
			.insert(body)
			.select(
				"id, registration_status, participants(id, first_name, last_name, sex, institutions(id, name))"
			)
			.single();

		if (registrationError) {
			throw new Error(
				`Error registering participant: ${registrationError.message}`
			);
		}

		// Registration successful
		return {
			success: true,
			data: Participant,
		};
	} catch (err) {
		// Log and return error response
		console.error(err.message);
		return {
			success: false,
			error: err.message,
		};
	}
});
