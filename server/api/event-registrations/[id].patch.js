import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { id } = event.context.params;
	const body = await readBody(event);

	try {
		const { data: registrationData, error: registrationError } =
			await client
				.from("event_registrations")
				.update(body)
				.eq("id", id)
				.select("*, participants(*, institutions(*)), events(*))")
				.single();

		if (registrationError) {
			throw new Error(registrationError.message);
		}

		return {
			success: true,
			data: registrationData,
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
