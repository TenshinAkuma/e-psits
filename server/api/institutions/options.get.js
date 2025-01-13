import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);

	try {
		return (await client.from("institutions").select("id, name")).data;
	} catch (error) {
		return {
			error: error.message,
		};
	}
});
