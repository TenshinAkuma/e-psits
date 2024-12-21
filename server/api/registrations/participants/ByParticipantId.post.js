import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const body = await readBody(event);

	console.log(body);
	try {
		const { error: RegistrationError } = await client
			.from("event_registrations")
			.insert(body);

		if (RegistrationError) {
			throw new Error(RegistrationError.message);
		}

		return {
			success: true,
		};
	} catch (err) {
		console.error("Error during registering participant", err.message);
		return {
			success: false,
			error: err.message,
		};
	}
});
