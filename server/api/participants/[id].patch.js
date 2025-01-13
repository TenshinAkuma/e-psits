import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { id } = event.context.params;
	const body = await readBody(event);

	try {
		const { data: participantData, error: participantError } =
			await client
				.from("participants")
				.update(body)
				.eq("id", id)
				.select("*, institutions(name)")
				.single();

		if (participantError) {
			throw new Error(participantError.message);
		}

		return {
			success: true,
			data: participantData,
		};
	} catch (error) {
		console.error(
			"Error occurred while updating participant",
			error.message
		);

		return {
			success: false,
			error: error.message,
		};
	}
});
