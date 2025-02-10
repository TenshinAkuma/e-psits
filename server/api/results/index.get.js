import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);

	try {
		const { data, error} =
			await client
				.from("events")
				.select("*, event_registrations!left(participants(*))")

		if (error) {
			throw new Error(error.message);
		}

		return {
			success: true,
			data
		};
	} catch (error) {
		console.error(
			"Error occurred while loading event results.",
			error.message
		);
		return {
			success: false,
			error: error.message,
		};
	}
});
