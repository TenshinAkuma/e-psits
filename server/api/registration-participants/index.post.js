import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const body = await readBody(event);

	const { data: participantData, error: participantError } = await client
		.from("participants")
		.insert(body.participantData)
		.select()
		.single();

	if (participantError) {
		console.error(
			"Error occurred while saving participant",
			participantError.message
		);

		return {
			error: participantError.message,
		};
	}

	const registration = {
		event_id: body.event_id,
		participant_id: participantData.id,
	};

	const { error: eventError } = await client
		.from("event_registrations")
		.insert(registration);

	if (eventError) {
		console.error(
			"Error registering participant to an event: ",
			eventError.message
		);
		return {
			error: eventError.message,
		};
	}

	return {
		data: participantData,
	};
});
