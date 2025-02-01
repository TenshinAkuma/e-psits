import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const body = await readBody(event);

	console.log("Event Registration Body:", body);

	try {
		// Check if the participant is already registered for the event
		const { data, error: checkError } = await client
			.from("event_registrations")
			.select("id")
			.eq("event_id", body.event_id)
			.eq("participant_id", body.participant_id)
			.maybeSingle();

		if (checkError) {
			throw new Error("Database error while checking registration.");
		}

		if (data) {
			throw new Error("Participant is already registered in event.");
		}

		// Insert the new registration
		const { error: insertError } = await client
			.from("event_registrations")
			.insert(body);

		if (insertError) {
			throw new Error(insertError.message);
		}

		// Registration successful
		return {
			success: true,
		};
	} catch (err) {
		// Log and return error response
		console.error("Error participant event registration:", err.message);
		return {
			success: false,
			error: err.message,
		};
	}
});
