import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const body = await readBody(event);

	try {
		// Create a new user with Supabase Auth
		const { data: user, error: authError } = await client.auth.signUp({
			email: body.email,
			password: body.password,
		});

		if (authError) {
			throw new Error(authError.message);
		}

		// Insert participant into the database
		const { data: participant, error: dbError } = await client
			.from(body.role) // Validate the role before using
			.insert({
				first_name: body.first_name,
				last_name: body.last_name,
				institution_id: body.institution_id,
				email: user.user.email,
				user_id: user.user.id,
			})
			.select()
			.single();

		if (dbError) {
			throw new Error(dbError.message);
		}

		// Return the participant record
		return {
			success: true,
			participant,
		};
	} catch (err) {
		// Log the error and return an error response
		console.error("Error during sign-up:", err.message);
		return {
			success: false,
			error: err.message,
		};
	}
});
