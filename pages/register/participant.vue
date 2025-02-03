<template>
	<PublicRegister>
			<template #header>
				<h3 class="fw-bold lh-sm">
					Join the Action as a Participant!
				</h3>
				<p class="text-secondary lh-sm fs-7">
					Register now to unlock opportunities, connect with your
					institution, and take part in exciting events.
				</p>
			</template>

			<template #body>
				<form @submit.prevent="OnRegisterParticipant">
					<label class="fw-bold mb-1">
						Personal Information
					</label>
					<div class="d-flex gap-3 mb-3">
						<input
							type="text"
							class="form-control border-secondary"
							placeholder="First name"
							v-model="
								participantRegistration.participantData
									.first_name
							"
							required />
						<input
							type="text"
							class="form-control border-secondary"
							placeholder="Last name"
							v-model="
								participantRegistration.participantData
									.last_name
							"
							required />
					</div>

					<div class="hstack gap-3 mb-3">
						<input
							type="email"
							class="form-control border-secondary"
							placeholder="Email"
							v-model="
								participantRegistration.participantData
									.email
							"
							required />

						<select
							class="form-select border-secondary w-25"
							v-model="
								participantRegistration.participantData
									.sex
							"
							required>
							<option value="" selected hidden>Sex</option>
							<option value="male">Male</option>
							<option value="female">Female</option>
						</select>
					</div>

					<input
						type="text"
						class="form-control border-secondary mb-4"
						placeholder="Address"
						v-model="
							participantRegistration.participantData
								.address
						" />

					<label class="fw-bold mb-1">School Information</label>
					<select
						class="form-select border-secondary mb-3"
						v-model="
							participantRegistration.participantData
								.institution_id
						" required>
						<option value="" selected hidden>
							Choose your institution
						</option>
						<option
							v-for="institution in institutionOptions.data"
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
							v-model="
								participantRegistration.participantData
									.course
							" />

						<input
							type="number"
							max="5"
							min="1"
							placeholder="Year"
							class="form-control border-secondary text-dark w-25"
							v-model="
								participantRegistration.participantData
									.year_level
							" />
					</div>

					<label class="fw-bold mb-1">Event Information</label>
					<select
						class="form-select border-secondary mb-5"
						v-model="participantRegistration.event_id">
						<option value="" selected hidden>
							Choose your event
						</option>
						<option
							v-for="event in eventOptions.data"
							:key="event.id"
							:value="event.id">
							{{ event.title }}
						</option>
					</select>

					<p v-if="errMsg" class="text-center text-danger fs-7">{{errMsg}}</p>

					<div class="d-flex justify-content-between">
						<button
							@click="OnBack"
							class="btn hstack px-0 gap-2">
							<i class="bi bi-arrow-left" />Back
						</button>
						<button
							type="submit"
							class="btn btn-primary px-5 hstack gap-3"
							:disabled="isLoading">
							<span
								v-if="isLoading"
								class="spinner-border spinner-border-sm"
								aria-hidden="true" />
							<span role="status">Register</span>
						</button>
					</div>
				</form>
			</template>
		</PublicRegister>
</template>

<script setup>
	definePageMeta({
		layout: "auth",
	});

	const isLoading = ref(false);
	const errMsg = ref("");
	const participantRegistration = ref({
		participantData: {
			first_name: "",
			last_name: "",
			sex: "",
			email: "",
			institution_id: "",
			course: "",
			year_level: "",
			address: "",
		},
		event_id: "",
	});

	const { data: institutionOptions } = await useFetch(
		`/api/institutions/options`,
		{
			method: "GET",
		}
	);

	const { data: eventOptions } = await useFetch(`/api/events/options`, {
		method: "GET",
	});

	async function OnRegisterParticipant() {
		isLoading.value = true;
		const { data, error } = await $fetch(
			"/api/registration-participants",
			{
				method: "POST",
				body: participantRegistration.value,
			}
		);

		if (error) {
			console.error("Error participant registration: ", error);
			errMsg.value = error;
			setTimeout(() => {
				errMsg.value = "";
			}, 3000);
		}

		if (data) {
			navigateTo(`/`);
		}
		isLoading.value = false;
	}

	const OnBack = () => {
		useRouter().back();
	};
</script>

<style></style>
