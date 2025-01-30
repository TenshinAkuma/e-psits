import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { query } = getQuery(event);

	const [firstName, lastName] = query.split(" ");

	try {
		if (!query || query.trim() === "") {
			// Query for the first 10 participants sorted alphabetically by first_name
			const { data: participantsData, error: participantsError } =
				await client
					.from("participants")
					.select("*, institutions(*)")
					.order("first_name", { ascending: true })
					.limit(10);

			if (participantsError) {
				throw new Error(participantsError.message);
			}

			return {
				success: true,
				data: participantsData,
			};
		}

		const { data: participantsData, error: participantsError } =
			await client
				.from("participants")
				.select("*, institutions(*)")
				.or(
					`first_name.ilike.%${firstName}%,last_name.ilike.%${lastName}%`
				)
				.limit(10);

		if (participantsError) {
			throw new Error(participantsError.message);
		}

		return {
			success: true,
			data: participantsData,
		};
	} catch (error) {
		console.log("Error while loading participants", error.message);

		return {
			success: false,
			error: error.message,
		};
	}
});
