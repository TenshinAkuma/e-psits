import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { id } = event.context.params;

	try {
		const { data: registrationData, error: registrationError } =
			await client
				.from("event_registrations")
				.select(
					"id, registration_status, participants(id, first_name, last_name, sex, institutions(id, name))"
				)
				.eq("event_id", id);

		if (registrationError) {
			throw new Error(registrationError.message);
		}

		return {
			success: true,
			data: registrationData,
		};
	} catch (error) {
		console.error(
			"Error occurred while registering participant ",
			error.message
		);
		return {
			success: false,
			error: error.message,
		};
	}
});
