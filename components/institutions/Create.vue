<template>
	<Dialog
		dialogId="create-institution"
		dialogTitle="Add New Institution"
		openButtonStyle="btn-primary hstack gap-3">
		<template #ButtonLabel>
			<i class="bi bi-plus-lg" /> Add New Institution
		</template>

		<template #Body>
			<form
				@submit.prevent="OnAddNewInstitution"
				id="create-institution-form">
				<p class="fw-bold text-secondary">
					Institution Information
				</p>
				<input
					type="text"
					placeholder="Name"
					class="form-control border-secondary text-dark mb-3"
					v-model="newInstitution.name"
					required />
				<input
					type="text"
					placeholder="Email"
					class="form-control border-secondary text-dark mb-3"
					v-model="newInstitution.email"
					required />
				<input
					type="text"
					placeholder="Address"
					class="form-control border-secondary text-dark mb-4"
					v-model="newInstitution.address"
					required />

				<hr />

				<p class="fw-bold text-secondary">
					Coordinator Information
				</p>
				<input
					type="text"
					placeholder="Name"
					class="form-control border-secondary text-dark mb-3"
					v-model="newCoordinator.name"
					required />
				<input
					type="text"
					placeholder="Position"
					class="form-control border-secondary text-dark mb-3"
					v-model="newCoordinator.position"
					required />
				<input
					type="text"
					placeholder="Email"
					class="form-control border-secondary text-dark mb-3"
					v-model="newCoordinator.email"
					required />
				<input
					type="text"
					placeholder="Contact number"
					class="form-control border-secondary text-dark mb-4"
					v-model="newCoordinator.contact_number"
					required />
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
				<span role="status">Add institution</span>
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
			name: "",
			position: "",
			email: "",
			contact_number: "",
		},
	});

	async function OnAddNewInstitution() {
		isLoading.value = true;
		const { data, error } = await $fetch(`/api/institutions`, {
			method: "POST",
			body: newInstitution,
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
