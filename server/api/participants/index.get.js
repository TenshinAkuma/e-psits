import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);

	return (
		await client
			.from("participants")
			.select(
				"*, participant_registrations!left (events(id, title), registration_status), institutions (id, name)"
			)
	).data;
});
