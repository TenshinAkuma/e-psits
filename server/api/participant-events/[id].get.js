import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { id } = event.context.params;

	try {
		const { data: participantData, error: participantError } =
			await client
				.from("event_registrations")
				.select(
					"*, events(title, category), participants(first_name, last_name)"
				)
				.eq("participant_id", id)
				.order('created_at', { ascending: false });;

		if (participantError) {
			throw new Error(participantError.message);
		}

		return {
			success: true,
			data: participantData,
		};
	} catch (error) {
		console.error(
			"Error occurred while loading registrations:",
			error.message
		);

		return {
			success: false,
			error: error.message,
			data: null,
		};
	}
});
