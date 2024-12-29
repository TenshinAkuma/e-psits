import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { eventID } = event.context.params;

	try {
		// Fetch criteria data from the database
		const { data: criteria, error } = await client
			.from("event_criteria")
			.select("id, name, description, rating")
			.eq("event_id", eventID);

		// Handle Supabase query errors
		if (error) {
			throw new Error(`Error fetching criteria: ${error.message}`);
		}

		// Handle empty criteria case
		if (!criteria || criteria.length === 0) {
			throw new Error("No criteria found for this event.");
		}

		// Return successful response with the fetched data
		return {
			success: true,
			data: criteria,
		};
	} catch (err) {
		// Log the error for debugging
		console.log("Error fetching event criteria:", err.message);

		// Return error response
		return {
			success: false,
			error: err.message || "An unexpected error occurred.",
		};
	}
});
