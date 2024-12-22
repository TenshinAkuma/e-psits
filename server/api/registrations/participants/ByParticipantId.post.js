import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	// Initialize Supabase client and read the request body
	const client = await serverSupabaseClient(event);
	const body = await readBody(event);

	try {
		// Check if the participant is already registered for the event
		const { data: participantExists, error: participantError } =
			await client
				.from("event_registrations")
				.select("id")
				.eq("event_id", body.event_id)
				.eq("participant_id", body.participant_id)
				.single();

		if (participantError && participantError.code !== "PGRST116") {
			// Handle unexpected errors (e.g., database issues)
			throw new Error(
				`Error checking participant registration: ${participantError.message}`
			);
		}

		if (participantExists) {
			// Prevent duplicate registration
			return {
				success: false,
				error: "Participant is already registered for this event.",
			};
		}

		// Insert the new registration
		const { error: registrationError } = await client
			.from("event_registrations")
			.insert(body);

		if (registrationError) {
			throw new Error(
				`Error registering participant: ${registrationError.message}`
			);
		}

		// Registration successful
		return {
			success: true,
			message: "Participant successfully registered.",
		};
	} catch (err) {
		// Log and return error response
		console.error("Error during participant registration:", err.message);
		return {
			success: false,
			error: err.message,
		};
	}
});
