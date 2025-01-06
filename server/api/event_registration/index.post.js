import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const body = await readBody(event);

	try {
		const {
			data: registeredParticipantData,
			error: registeredParticipantError,
		} = await client
			.from("event_registration")
			.insert(body)
			.select()
			.single();

		if (registeredParticipantError) {
			throw new Error(registeredParticipantError.message);
		}

		return {
			success: true,
			data: registeredParticipantData,
		};
	} catch (err) {
		console.error(
			"Error occurred while loading registered participants",
			err.message
		);

		return {
			success: false,
			error: err.message,
		};
	}
});
