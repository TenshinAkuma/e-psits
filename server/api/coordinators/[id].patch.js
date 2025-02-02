import { serverSupabaseClient } from "#supabase/server";
import ByParticipantIdPost from "../registrations/participants/ByParticipantId.post";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { id } = event.context.params;
	const body = await readBody(event);

	console.log(body);
	const { data, error } = await client
		.from("coordinators")
		.update(body)
		.eq("id", id)
		.select();

	if (error) {
		console.error("Error updating coordinator: ", error.message);

		return {
			error,
		};
	}

	return {
		data,
	};
});
