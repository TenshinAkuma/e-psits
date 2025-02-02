import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { id } = event.context.params;

	const { error } = await client.from("coordinators").delete().eq("id", id);

	if (error) {
		console.error("Error deleting institutions: ", error.message);
		return {
			error: error.message,
			data: null,
		};
	}

	return {
		data: "Participant deleted successfully.",
		error: null,
	};
});
