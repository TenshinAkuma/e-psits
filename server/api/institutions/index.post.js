import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const body = await readBody(event);

	console.log("Body: ", body);
	const { data: coordinator, error: coordinatorError } = await client
		.from("coordinators")
		.insert(body.coordinator)
		.select()
		.single();

	console.log("Coordinator: ", coordinator);
	if (coordinatorError) {
		console.error(
			"Error inserting institution coordinator: ",
			coordinatorError.message
		);

		return {
			error: coordinatorError.message,
			data: null,
		};
	}

	body.institution.coordinator_id = coordinator.id;

	console.log("Institution: ", body.institution);

	const { data: institution, error: institutionError } = await client
		.from("institutions")
		.insert(body.institution)
		.select()
		.single();

	if (institutionError) {
		console.error(
			"Error creating institution: ",
			institutionError.message
		);

		return {
			error: institutionError.message,
			data: null,
		};
	}

	return {
		data: institution,
	};
});
