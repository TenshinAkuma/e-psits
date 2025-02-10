<template>
	<Dialog
		dialogId="create-participant"
		dialogTitle="Add New Participant"
		openButtonStyle="btn-primary"
		ref="createParticipantRef">
		<template #ButtonLabel>
			<i class="bi bi-plus-lg" /> Add new participant
		</template>

		<template #Body>
			<form
				@submit.prevent="SaveParticipant"
				id="create-participant-form"
				ref="createForm">
				<p class="fw-bold mb-2">Personal Information</p>
				<div class="hstack gap-2 mb-3">
					<input
						type="text"
						placeholder="First name"
						class="form-control border-secondary text-dark"
						v-model="newParticipant.first_name"
						required />
					<input
						type="text"
						placeholder="Last name"
						class="form-control border-secondary text-dark"
						v-model="newParticipant.last_name"
						required />
				</div>

				<div class="d-flex gap-2 mb-3">
					<div class="input-group">
						<span
							class="input-group-text bg-secondary bg-opacity-25 border-secondary text-dark"
							for="eventDate"
							>Birthdate:</span
						>
						<input
							type="date"
							class="form-control border-secondary text-dark"
							id="eventDate"
							v-model="newParticipant.dob" />
					</div>

					<select
						class="form-select border-secondary w-25"
						v-model="newParticipant.sex">
						<option value="" selected hidden>Sex</option>
						<option value="Male">Male</option>
						<option value="Female">Female</option>
					</select>
				</div>

				<input
					type="text"
					placeholder="Address"
					class="form-control border-secondary text-dark mb-3"
					v-model="newParticipant.address" />

				<hr />

				<p class="fw-bold mb-2">Contact Information</p>
				<input
					type="email"
					placeholder="Email"
					class="form-control border-secondary text-dark mb-3"
					v-model="newParticipant.email" />

				<input
					type="tel"
					placeholder="Phone number"
					class="form-control border-secondary text-dark mb-3"
					v-model="newParticipant.phone_number" />

				<hr />

				<p class="fw-bold mb-2">Academic Background</p>
				<select
					class="select form-select border-secondary mb-3"
					v-model="newParticipant.institution_id"
					required>
					<option value="0" selected hidden>
						Choose institution
					</option>
					<option
						v-for="institution in institutionsOptions.data"
						:key="institution.id"
						:value="institution.id">
						{{ institution.name }}
					</option>
				</select>

				<div class="hstack gap-2 mb-4">
					<input
						type="text"
						placeholder="Course"
						class="form-control border-secondary text-dark w-75"
						v-model="newParticipant.course" />

					<input
						type="number"
						max="5"
						min="1"
						placeholder="Year"
						class="form-control border-secondary text-dark w-25"
						v-model="newParticipant.year_level" />
				</div>
				<p class="fs-7 text-danger text-center m-0">
					{{ errMsg }}
				</p>
			</form>
		</template>

		<template #Submit>
			<button
				type="submit"
				form="create-participant-form"
				class="d-flex align-items-center btn btn-primary gap-2"
				:disabled="isLoading">
				<span
					v-if="isLoading"
					class="spinner-border spinner-border-sm"
					aria-hidden="true" />
				<span role="status">Add participant</span>
			</button>
		</template>
	</Dialog>
</template>

<script setup>
	let createParticipantRef = ref(null);
	let createForm = ref(null);

	const isLoading = ref(false);
	const errMsg = ref("");

	const newParticipant = ref({
		first_name: "",
		last_name: "",
		dob: new Date().toISOString().split("T")[0],
		sex: "",
		address: "",
		email: "",
		phone_number: "",
		institution_id: 0,
		course: "",
		year_level: 1,
	});

	const { data: institutionsOptions } = await useFetch(
		`/api/institutions/options`,
		{
			method: "GET",
		}
	);

	async function SaveParticipant() {
		isLoading.value = true;

		if (newParticipant.value?.institution_id == 0) {
			errMsg.value = "Invalid data. Please fill all fields.";
			setTimeout(() => {
				errMsg.value = "";
			}, 3000);
			isLoading.value = false;
			return;
		}

		const { data, error } = await $fetch(`/api/participants`, {
			method: "POST",
			body: newParticipant.value,
		});

		if (error) {
			console.error("Error creating participant: ", error);
			errMsg.value = error;
			setTimeout(() => {
				errMsg.value = "";
			}, 3000);
		}

		isLoading.value = false;
		if (data) {
			createForm.value?.reset();
			navigateTo(`/admin/memberships`);
			createParticipantRef.value?.closeDialog();
		}
	}
</script>
