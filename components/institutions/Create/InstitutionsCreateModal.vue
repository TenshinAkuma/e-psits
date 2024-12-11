<template>
	<div>
		<button
			type="button"
			class="btn btn-sm btn-primary"
			data-bs-toggle="modal"
			data-bs-target="#createInstitutionModal">
			<i class="bi bi-plus" /> Add Institution
		</button>
		<div
			class="modal"
			id="createInstitutionModal"
			data-bs-backdrop="static"
			data-bs-keyboard="false"
			tabindex="-1"
			aria-labelledby="createInstitutionModal"
			aria-hidden="true"
			ref="createInstitutionModalRef">
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<h5
							class="modal-title fw-bold"
							id="staticBackdropLabel">
							Add New Institution
						</h5>
						<button
							type="button"
							class="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"></button>
					</div>

					<div class="modal-body">
						<form
							@submit.prevent="OnAddNewInstitution"
							id="createInstitution">
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
					</div>

					<div class="modal-footer">
						<button
							type="button"
							data-bs-dismiss="modal"
							class="btn btn-outline-secondary border-0">
							Cancel
						</button>
						<button
							type="submit"
							form="createInstitution"
							class="d-flex align-items-center btn btn-primary gap-2"
							:disabled="
								status === 'pending' ||
								newCoordinatorStatus === 'pending'
							">
							<span
								v-if="
									status === 'pending' ||
									newCoordinatorStatus === 'pending'
								"
								class="spinner-border spinner-border-sm"
								aria-hidden="true" />
							<span role="status">Add institution</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	const createInstitutionModalRef = ref(null);
	let createInstitutionModal;

	const newInstitution = ref({
		name: "",
		address: "",
		email: "",
		coordinator_id: Int8Array,
	});

	const newCoordinator = ref({
		name: "",
		position: "",
		email: "",
		contact_number: "",
	});

	const {
		data: newInstitutionData,
		status,
		error,
		execute: saveInstitution,
	} = await useFetch(`/api/institutions`, {
		headers: useRequestHeaders(["cookie"]),
		method: "POST",
		body: newInstitution,
		immediate: false,
		watch: false,
	});

	const {
		data: newCoordinatorData,
		status: newCoordinatorStatus,
		error: coordinatorError,
		execute: saveCoordinator,
	} = await useFetch(`/api/coordinators`, {
		headers: useRequestHeaders(["cookie"]),
		method: "POST",
		body: newCoordinator,
		immediate: false,
		watch: false,
	});

	const OnAddNewInstitution = async () => {
		try {
			await saveCoordinator();

			if (newCoordinatorStatus.value == "error") {
				return;
			}

			newInstitution.value.coordinator_id =
				newCoordinatorData.value.id;

			await saveInstitution();

			if (status == "error") {
				return;
			}

			closeModal();
			navigateTo(`/admin/institutions/${newInstitutionData.value.id}`);
		} catch (err) {
			console.log("Failed adding new institution", error.value);
		}
	};

	const closeModal = () => {
		if (createInstitutionModal) {
			createInstitutionModal.hide();
		}
	};

	onMounted(() => {
		// Access the global `bootstrap` object to initialize the Modal
		if (createInstitutionModalRef.value) {
			createInstitutionModal = new bootstrap.Modal(
				createInstitutionModalRef.value
			);
		}
	});
</script>
