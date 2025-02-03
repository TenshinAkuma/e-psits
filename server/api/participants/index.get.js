import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);

	try {
		const { data: participantsData, error: participantsError } =
			await client
				.from("participants")
				.select(
					"*, institutions(id, name), event_registrations(registration_status, events(id, title))"
				)
				.eq("membership_status", "Member");

		if (participantsError) {
			throw new Error(participantsError.message);
		}

		return {
			success: true,
			data: participantsData,
		};
	} catch (error) {
		console.error(
			"Error occurred while loading participants",
			error.message
		);

		return {
			success: false,
			error: error.message,
		};
	}
});
