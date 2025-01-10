import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const body = await readBody(event);

	try {
		const { data: participantData, error: participantError } =
			await client
				.from("participants")
				.insert(body)
				.select("*")
				.single();

		if (participantError) {
			throw new Error(participantError.message);
		}

		return {
			success: true,
			data: participantError,
		};
	} catch (error) {
		console.error(
			"Error occurred while loading participant details",
			error.message
		);

		return {
			success: false,
			error: error.message,
		};
	}
});
