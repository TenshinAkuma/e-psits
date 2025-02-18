import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { id } = event.context.params;

	try {
		const { data: registrationData, error: registrationError } =
			await client
				.from("event_registrations")
				.select("*, participants(*, institutions(*)), events(*))")
				.eq("participant_id", id);

		if (registrationError) {
			throw new Error(registrationError.message);
		}

		return {
			success: true,
			data: registrationData,
		};
	} catch (error) {
		console.error(
			"Error occurred while loading participant ",
			error.message
		);
		return {
			success: false,
			error: error.message,
		};
	}
});
