import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { id } = event.context.params;

	console.log(id);
	const { data, error } = await client
		.from("participants")
		.select(
			"*, event_registrations(id, registration_status, event_id, events(title))"
		)
		.eq("institution_id", id)
		.order("first_name", { ascending: true });

	if (error) {
		console.error("Error fetching participants: ", error.message);

		return {
			data: null,
			error: error.message,
		};
	}

	return {
		data,
	};
});
