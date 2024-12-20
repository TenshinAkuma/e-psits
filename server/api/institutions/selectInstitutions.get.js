import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);

	try {
		const { data: InstitutionOptions, error } = await client
			.from("institutions")
			.select("id, name");

		if (error) {
			throw new Error(error.message); // Explicitly handle Supabase errors
		}

		return {
			success: true,
			InstitutionOptions,
		};
	} catch (err) {
		return {
			success: false,
			error: err.message || "An unknown error occurred",
		};
	}
});
