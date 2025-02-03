<template>
	<Dialog
		dialogId="create-institution"
		dialogTitle="Add New Institution Member"
		openButtonStyle="btn-primary hstack gap-3"
		ref="createInstitutionRef">
		<template #ButtonLabel>
			<i class="bi bi-plus-lg" /> Add institution member
		</template>

		<template #Body>
			<form
				@submit.prevent="OnAddNewInstitution"
				id="create-institution-form">
				<p class="fw-bold mb-1">Institution Information</p>
				<input
					type="text"
					placeholder="Name"
					class="form-control border-secondary mb-2"
					v-model="newInstitution.institution.name"
					required />
				<input
					type="text"
					placeholder="Email"
					class="form-control border-secondary mb-2"
					v-model="newInstitution.institution.email"
					required />
				<input
					type="text"
					placeholder="Address"
					class="form-control border-secondary mb-4"
					v-model="newInstitution.institution.address"
					required />

				<hr />

				<p class="fw-bold mb-1">Coordinator Information</p>
				<div class="d-flex gap-2 mb-2">
					<input
						type="text"
						placeholder="First name"
						class="form-control border-secondary w-50"
						v-model="newInstitution.coordinator.first_name"
						required />
					<input
						type="text"
						placeholder="Last name"
						class="form-control border-secondary w-50"
						v-model="newInstitution.coordinator.last_name"
						required />
				</div>
				<input
					type="text"
					placeholder="Position"
					class="form-control border-secondary mb-2"
					v-model="newInstitution.coordinator.position"
					required />
				<input
					type="text"
					placeholder="Email"
					class="form-control border-secondary mb-2"
					v-model="newInstitution.coordinator.email"
					required />
				<div class="d-flex gap-2 mb-4">
					<input
						type="text"
						placeholder="Contact number"
						class="form-control border-secondary w-75"
						v-model="
							newInstitution.coordinator.contact_number
						"
						required />

					<select
						class="form-select border-secondary w-25"
						v-model="newInstitution.coordinator.sex">
						<option value="Male">Male</option>
						<option value="Female">Female</option>
					</select>
				</div>
			</form>
		</template>

		<template #Submit>
			<button
				type="submit"
				form="create-institution-form"
				class="btn btn-primary hstack gap-3"
				:disabled="isLoading">
				<span
					v-if="isLoading"
					class="spinner-border spinner-border-sm"
					aria-hidden="true" />
				<span role="status">Add member</span>
			</button>
		</template>
	</Dialog>
</template>

<script setup>
	const createInstitutionRef = ref(null);
	const isLoading = ref();
	const errorMsg = ref("");

	const newInstitution = ref({
		institution: {
			name: "",
			address: "",
			email: "",
			coordinator_id: Int8Array,
		},
		coordinator: {
			first_name: "",
			last_name: "",
			email: "",
			contact_number: "",
			sex: "Male",
		},
	});

	async function OnAddNewInstitution() {
		isLoading.value = true;
		const { data, error } = await $fetch(`/api/institutions`, {
			method: "POST",
			body: newInstitution.value,
		});

		if (error) {
			console.error("Error creating institution: ", error);
			errorMsg.value = "Internal server error. Please try again.";
			setTimeout(() => {
				errorMsg.value = "";
			}, 3000);
		}

		isLoading.value = false;
		if (data) {
			navigateTo(`/admin/institutions/${data.id}`);
			createInstitutionRef.value.closeDialog();
		}
	}
</script>
