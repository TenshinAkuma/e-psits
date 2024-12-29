import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { registrationID } = event.context.params;
	const body = await readBody(event);

	console.log(body);

	try {
		const { data: participant, error: errorParticipant } = await client
			.from("event_registrations")
			.update(body)
			.eq("id", registrationID)
			.select();

		if (errorParticipant) {
			throw new Error(
				"Error occurred while updating registration status"
			);
		}

		return {
			data: participant,
			success: true,
		};
	} catch (err) {
		console.error(err.message);
		return {
			success: false,
			error: err.message,
		};
	}
});
