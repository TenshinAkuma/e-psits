import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { id } = event.context.params;

	console.log("Get event registration data.");
	try {
		const { data: registrationData, error: registrationError } =
			await client
				.from("event_registrations")
				.select(
					"*, participants(first_name, last_name, institutions(name)), events(title))"
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
			"Error occurred while loading participants.",
			error.message
		);
		return {
			success: false,
			error: error.message,
		};
	}
});
