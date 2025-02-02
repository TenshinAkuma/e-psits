import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { id } = event.context.params;

	const { data, error } = await client.from("events").delete().eq("id", id);

	if (error) {
		console.error("Error deleting event: ", error.message);

		return {
			error,
		};
	}

	return {
		data: "Event deleted successfully.",
	};
});
