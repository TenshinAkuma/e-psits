import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { query } = getQuery(event);

	const [firstName, lastName] = query.split(" ");

	return (
		await client
			.from("participants")
			.select(
				"id, first_name, surname, institutions(name), participant_registrations(id, event_id, registration_status)"
			)
			.or(
				`first_name.ilike.%${firstName}%,surname.ilike.%${lastName}%`
			)
			.limit(10)
	).data;
});
