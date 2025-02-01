<template>
	<Dialog
		dialogId="createParticipant"
		dialogTitle="Add New Participant"
		openButtonStyle="btn-primary"
		ref="createParticipantModalRef">
		<template #ButtonLabel>
			<i class="bi bi-plus-lg" /> Add new participant
		</template>

		<template #Body>
			<form
				@submit.prevent="OnSaveNewParticipant"
				id="createEvent"
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
						<option value="male">Male</option>
						<option value="female">Female</option>
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
					<option value="0" selected hidden>Choose institution</option>
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
						v-model="newParticipant.year" />
				</div>
				<p class="fs-7 text-danger text-center m-0">
					{{ errorMessage }}
				</p>
			</form>
		</template>

		<template #Submit>
			<button
				type="submit"
				form="createEvent"
				class="d-flex align-items-center btn btn-primary gap-2"
				:disabled="isLoading">
				<span
					v-if="isLoading"
					class="spinner-border spinner-border-sm"
					aria-hidden="true" />
					<i v-else class="bi bi-plus-lg" />
				<span role="status">Add participant</span>
			</button>
		</template>
	</Dialog>
</template>

<script setup>
	let createParticipantModalRef = ref(null);
	let createForm = ref(null);

	const isLoading = ref(false);
	const errorMessage = ref("");

	const newParticipant = ref({
		first_name: "",
		last_name: "",
		dob: new Date().toISOString().split("T")[0],
		sex: "",
		address: "",
		email: "",
		phone_number: "",
		institution_id: Number(0),
		course: "",
		year_level: Number,
	});

	const { data: institutionsOptions } = await useFetch(
		`/api/institutions/options`,
		{
			method: "GET",
		}
	);

	const OnSaveNewParticipant = async () => {
		isLoading.value = true;
		if (newParticipant.value?.institution_id == 0) {
			throw new Error("Please specify institution.");
		}

		const { data, error } = await useFetch(`/api/participants`, {
			method: "POST",
			body: newParticipant,
		});

		if (error) {
			console.error(err.message);
			errorMessage.value = err.message;
			setTimeout(() => {
				errorMessage.value = "";
				isLoading.value = false;
				return;
			}, 3000);
		}

		createForm.value?.reset();
		navigateTo(`/admin/participants/${data.id}`)
		createParticipantModalRef.value?.closeDialog();
		isLoading.value = false;
	};
</script>
