<template>
	<div>
		<button
			class="btn btn-sm btn-primary"
			data-bs-toggle="modal"
			data-bs-target="#createParticipantModal">
			Add Participant
		</button>
		<div
			class="modal"
			id="createParticipantModal"
			data-bs-backdrop="static"
			data-bs-keyboard="false"
			tabindex="-1"
			aria-labelledby="createParticipantModal"
			aria-hidden="true"
			ref="createParticipantModalRef">
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<h5
							class="modal-title fw-bold"
							id="staticBackdropLabel">
							ADD NEW PARTICIPANT
						</h5>
						<button
							type="button"
							class="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"></button>
					</div>

					<div class="modal-body">
						<form
							@submit.prevent="OnAddNewParticipant"
							id="createEvent">
							<p class="fw-bold text-secondary">
								Personal Information
							</p>
							<input
								type="text"
								placeholder="Name"
								class="form-control border-secondary text-dark mb-3"
								v-model="participant.name"
								required />

							<div class="input-group mb-3">
								<span
									class="input-group-text text-secondary text-dark"
									for="eventDate"
									>Birthdate:</span
								>
								<input
									type="date"
									class="form-control border-secondary text-dark"
									id="eventDate"
									v-model="participant.dob" />
							</div>

							<input
								type="text"
								placeholder="Address"
								class="form-control border-secondary text-dark mb-4"
								v-model="participant.address" />

							<hr />

							<p class="fw-bold text-secondary">
								Contact Information
							</p>
							<input
								type="email"
								placeholder="Email"
								class="form-control border-secondary text-dark mb-3"
								v-model="participant.email" />

							<input
								type="tel"
								pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
								placeholder="Phone number"
								class="form-control border-secondary text-dark mb-4"
								v-model="participant.phone_number" />

							<hr />
							<p class="fw-bold text-secondary">
								Academic Background
							</p>
							<input
								type="text"
								placeholder="School"
								class="form-control border-secondary text-dark mb-3"
								v-model="participant.school" />

							<div class="hstack gap-2 mb-4">
								<input
									type="text"
									placeholder="Course"
									class="form-control border-secondary text-dark w-75"
									v-model="participant.course" />

								<input
									type="number"
									max="5"
									min="1"
									placeholder="Year"
									class="form-control border-secondary text-dark w-25"
									v-model="participant.year" />
							</div>
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
							form="createEvent"
							class="d-flex align-items-center btn btn-primary gap-2"
							:disabled="status === 'pending'">
							<span
								v-if="status === 'pending'"
								class="spinner-border spinner-border-sm"
								aria-hidden="true" />
							<span role="status">Add participant</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	const createParticipantModalRef = ref(null);
	let createParticipantModal;

	const participant = reactive({
		name: "",
		dob: new Date().toISOString().split("T")[0],
		address: "",
		email: "",
		phone_number: "",
		school: "",
		course: null,
		year: null,
	});

	const {
		data: newParticipant,
		status,
		error,
		execute,
	} = await useFetch(`/api/participants`, {
		headers: useRequestHeaders(["cookie"]),
		method: "POST",
		body: participant,
		immediate: false,
		watch: false,
	});

	const OnAddNewParticipant = async () => {
		try {
			await execute();
			if (status.value == "success") {
				closeModal();
				navigateTo(
					`/admin/participants/${newParticipant.value.id}`
				);
			}
		} catch (err) {
			console.log("Failed adding new participant", error.value);
		}
	};

	const closeModal = () => {
		if (createParticipantModal) {
			createParticipantModal.hide();
		}
	};

	onMounted(() => {
		// Access the global `bootstrap` object to initialize the Modal
		if (createParticipantModalRef.value) {
			createParticipantModal = new bootstrap.Modal(
				createParticipantModalRef.value
			);
		}
	});
</script>
