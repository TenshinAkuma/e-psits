import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { query } = getQuery(event);

	const [firstName, lastName] = query.split(" ");

	const { data, error } = await client
		.from("participants")
		.select("id, first_name, surname, institutions(name)")
		.or(`first_name.ilike.%${firstName}%,surname.ilike.%${lastName}%`);

	console.log(data, error);
	try {
		console.log(data);
		return data;
	} catch {
		console.log(error);
	}
});
