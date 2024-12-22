import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);

	// Extract the eventID from the route parameter
	const { eventID } = event.context.params;

	try {
		// Fetch ratings for the specific event
		const { data, error } = await client
			.from("event_criteria")
			.select("rating")
			.eq("event_id", eventID);

		// Handle potential errors from the Supabase query
		if (error) {
			throw new Error(
				`Failed to fetch event criteria: ${error.message}`
			);
		}

		// Ensure data is not null or empty
		if (!data || data.length === 0) {
			return {
				success: false,
				message: "No ratings found for the specified event.",
				totalRating: 0,
			};
		}

		// Calculate the total rating
		const totalRating = data.reduce(
			(sum, criteria) => sum + criteria.rating,
			0
		);

		// Return the total rating
		return {
			success: true,
			message: "Total rating calculated successfully.",
			totalRating,
		};
	} catch (err) {
		// Handle unexpected errors gracefully
		console.error("Error calculating total rating:", err.message);
		return {
			success: false,
			message: err.message || "An unexpected error occurred.",
		};
	}
});
