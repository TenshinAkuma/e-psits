import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { id } = event.context.params;

	try {
		const { error } = await client
			.from("event_registrations")
			.delete()
			.eq("id", id);

		if (error) {
			throw new Error(error.message);
		}

		return {
			success: true,
		};
	} catch (error) {
		console.error(
			"Error while updating participant registration status",
			error.message
		);
		return {
			success: false,
			error: error.message,
		};
	}
});
