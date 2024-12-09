<template>
	<div>
		<div>
			<div class="d-flex justify-content-between align-items-center">
				<div
					v-if="!isEditing"
					class="d-flex align-items-start gap-2">
					<h2 class="fw-bold mb-0">
						{{ InstitutionName }}
					</h2>
					<button
						type="button"
						class="btn btn-sm d-flex align-items-center text-secondary"
						@click="ToggleEdit">
						<Icon
							name="material-symbols:edit-outline-rounded" />
					</button>
				</div>
				<form
					v-else
					@submit.prevent="OnSaveNewName"
					class="d-flex align-items-center gap-2 w-100">
					<input
						type="text"
						class="form-control border-secondary w-100 border p-2 fw-bold"
						v-model="institution.name" />

					<button
						type="submit "
						class="d-flex align-items-center btn btn-sm btn-success fw-bold gap-2"
						:disabled="status === 'pending'">
						<span
							v-if="status === 'pending'"
							class="spinner-border spinner-border-sm"
							aria-hidden="true" />
						<span role="status">Save</span>
					</button>
					<button
						type="button"
						class="btn btn-sm btn-outline-secondary"
						@click="ToggleEdit">
						Cancel
					</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup>
	const institutionID = useRoute().params.institutionID;
	const InstitutionName = defineModel("InstitutionName");

	const institution = ref({
		name: InstitutionName.value,
	});

	const isEditing = ref(false);

	const { status, error, execute } = await useFetch(
		`/api/institutions/${institutionID}`,
		{
			method: "PATCH",
			body: institution,
			immediate: false,
			watch: false,
		}
	);

	const OnSaveNewName = async () => {
		try {
			await execute();
			if (status.value == "success") {
				ToggleEdit();
				InstitutionName.value = institution.value.name;
			}
		} catch (err) {
			console.log(err, error.value);
		}
	};

	const ToggleEdit = () => {
		isEditing.value = !isEditing.value;
	};
</script>
