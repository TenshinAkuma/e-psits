import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { id } = event.context.params;

	try {
		const { data: registrationData, error: registrationError } =
			await client.from("event_registrations").delete().eq("id", id);

		if (registrationError) {
			throw new Error(registrationError.message);
		}

		return {
			success: true,
		};
	} catch (err) {
		console.error(
			"Error occurred while deleting event rule",
			err.message
		);

		return {
			success: false,
			error: "Error occurred while deleting event rule",
		};
	}
});
