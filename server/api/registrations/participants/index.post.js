import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const body = await readBody(event);

	console.log(body);
	try {
		const { data: Participant, error: ParticipantError } = await client
			.from("participants")
			.insert(body.participantData)
			.select()
			.single();

		if (ParticipantError) {
			throw new Error(
				"Error while saving participant data",
				ParticipantError.message
			);
		}

		const { data: Registration, error: RegistrationError } = await client
			.from("event_registrations")
			.insert({
				event_id: body.event_id,
				participant_id: Participant.id,
			});

		if (RegistrationError) {
			throw new Error(RegistrationError.message);
		}

		return {
			success: true,
			data: Participant,
		};
	} catch (err) {
		// Log the error and return an error response
		console.error(err.message);
		return {
			success: false,
			error: err.message,
		};
	}
});
