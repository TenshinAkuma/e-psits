import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { id } = event.context.params;

	try {
		const { data, error } = await client
			.from("institutions")
			.delete()
			.eq("id", institutionID)
			.single();
	} catch {
		console.error("Error fetching all institutions: ");
		return {};
	}
});
