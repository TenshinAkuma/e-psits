// Importing serverSupabaseClient to interact with Supabase from the server-side
import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const query = getQuery(event);

	try {
		const { data: criteriaData, error: criteriaError } = await client
			.from("event_criteria")
			.select("rating")
			.eq("event_id", query.eventId);

		if (criteriaError) {
			throw new Error(criteriaError.message);
		}

		// Ensure criteriaData is properly handled and fallback to an empty array if null
		const maxRating = (() => {
			if (!criteriaData || criteriaData.length === 0) {
				return 100; // Default max rating
			}

			// Calculate max rating based on the sum of criteria ratings
			const totalUsedRating = criteriaData.reduce(
				(total, criteria) => total + (criteria.rating || 0),
				0
			);

			return 100 - totalUsedRating;
		})();

		return {
			success: true,
			data: maxRating, // Correctly return the value of maxRating
		};
	} catch (error) {
		console.error("Error calculating max rating:", error.message);

		return {
			success: false,
			message: error.message,
		};
	}
});
