import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const body = await readBody(event);

	try {
		const { data: Coordinator, error: CoordinatorError } = await client
			.from("coordinators")
			.insert(body.coordinator)
			.select()
			.single();

		if (CoordinatorError) {
			throw new Error(CoordinatorError.message);
		}

		const { data: Institution, error: InstitutionError } = await client
			.from("institutions")
			.insert({
				name: body.institution.name,
				email: body.institution.email,
				address: body.institution.address,
				coordinator_id: Coordinator.id,
			});

		if (InstitutionError) {
			throw new Error(InstitutionError.message);
		}

		return {
			success: true,
		};
	} catch (err) {
		console.error("Error during school registration", err.message);
		return {
			success: false,
			error: err.message,
		};
	}
});
