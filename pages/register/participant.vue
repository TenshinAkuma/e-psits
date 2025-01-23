<template>
	<div>
		<PublicRegister>
			<template #header>
				<h3 class="fw-bold lh-sm">
					Join the Action as a Participant!
				</h3>
				<p class="text-secondary lh-sm" style="font-size: 0.9rem">
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
							" />
						<input
							type="text"
							class="form-control border-secondary"
							placeholder="Last name"
							v-model="
								participantRegistration.participantData
									.last_name
							" />
					</div>

					<div class="hstack gap-3 mb-3">
						<input
							type="email"
							class="form-control border-secondary"
							placeholder="Email"
							v-model="
	participantRegistration.participantData
		.email
	" />

						<select
							class="form-select border-secondary w-25"
							v-model="participantRegistration.participantData.sex">
							<option value="" selected hidden>Sex</option>
							<option value="male">Male</option>
							<option value="female">
								Female
							</option>
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
						">
						<option value="" selected hidden>
							Choose your institution
						</option>
						<option
							v-for="institution in institutionOptions.InstitutionOptions"
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
							v-for="event in eventOptions.EventOptions"
							:key="event.id"
							:value="event.id">
							{{ event.title }}
						</option>
					</select>

					<div class="d-flex justify-content-between">
						<button
							@click="OnBack"
							class="btn hstack px-0 gap-2">
							<i class="bi bi-arrow-left" />Back
						</button>
						<button
							type="submit"
							class="btn btn-primary px-5"
							:disabled="registrationStatus === 'pending'">
							<span
								v-if="registrationStatus === 'pending'"
								class="spinner-border spinner-border-sm"
								aria-hidden="true" />
							<span role="status">Register</span>
						</button>
					</div>
				</form>
			</template>
		</PublicRegister>
	</div>
</template>

<script setup>
	definePageMeta({
		layout: "auth",
	});

	const router = useRouter();

	const OnBack = () => {
		router.back();
	};

	const participantRegistration = reactive({
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
		`/api/institutions/selectInstitutions`
	);

	const { data: eventOptions } = await useFetch("/api/events/selectEvents");

	const {
		data: registration,
		execute: RegisterParticipant,
		status: registrationStatus,
		error: registrationError,
	} = await useFetch("/api/registrations/participants", {
		method: "POST",
		body: participantRegistration,
		immediate: false,
		watch: false,
	});

	const OnRegisterParticipant = async () => {
		try {
			await RegisterParticipant();
			if (registration.value.success) {
				await navigateTo("/");
			}
		} catch {
			console.log(
				"Participant registration failed",
				registrationError.value
			);
		}
	};
</script>

<style></style>
