<template>
	<div>
		<div class="d-flex justify-content-between">
			<div class="fw-bold text-secondary">Email</div>
			<button
				type="button"
				class="btn btn-sm d-flex align-items-center text-secondary"
				@click="ToggleEdit">
				<Icon name="material-symbols:edit-outline-rounded" />
			</button>
		</div>
		<p v-if="!IsEditing" class="text-dark">
			{{ InstitutionEmail }}
		</p>

		<form v-else @submit.prevent="OnSaveNewEmail" class="mt-1">
			<input
				type="text"
				class="form-control border-secondary p-2 mb-3"
				v-model="institution.email" />
			<div class="d-flex justify-content-end gap-2">
				<button
					type="submit"
					class="d-flex align-items-center btn btn-sm btn-success fw-bold gap-2"
					style="height: min-content"
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
			</div>
		</form>
	</div>
</template>

<script setup>
	const institutionID = useRoute().params.institutionID;
	const InstitutionEmail = defineModel("InstitutionEmail");

	const IsEditing = ref(false);
	const institution = ref({
		email: InstitutionEmail.value,
	});

	const { status, execute } = await useFetch(
		`/api/institutions/${institutionID}`,
		{
			method: "PATCH",
			body: institution,
			immediate: false,
			watch: false,
		}
	);

	const OnSaveNewEmail = async () => {
		try {
			await execute();
			if (status.value == "success") {
				ToggleEdit();
				InstitutionEmail.value = institution.value.email;
			}
		} catch (err) {
			console.log(err.message);
		}
	};

	const ToggleEdit = () => {
		IsEditing.value = !IsEditing.value;
	};
</script>

<style></style>
