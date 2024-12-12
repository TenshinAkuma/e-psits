import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { participantRegistrationID } = event.context.params;
	const body = await readBody(event);

	console.log(body);

	const { data, error } = await client
		.from("participant_registrations")
		.update(body)
		.eq("id", participantRegistrationID)
		.select();

	try {
		console.log(data);
		return data;
	} catch {
		console.log(error.message);
	}
});
