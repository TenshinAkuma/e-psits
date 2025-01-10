import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { id } = event.context.params;

	try {
		const { error: participantError } = await client
			.from("participants")
			.delete()
			.eq("id", id);

		if (participantError) {
			throw new Error(participantError.message);
		}

		return {
			success: true,
		};
	} catch (error) {
		console.error(
			"Error occurred while deleting participant",
			error.message
		);

		return {
			success: false,
			error: error.message,
		};
	}
});
