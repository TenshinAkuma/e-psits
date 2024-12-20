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
				<form @submit.prevent="OnSaveNewUser">
					<label class="fw-bold mb-1">
						Personal Information
					</label>
					<div class="d-flex gap-3 mb-3">
						<input
							type="text"
							class="form-control border-secondary"
							placeholder="First name"
							v-model="
								participantRegistration.first_name
							" />
						<input
							type="text"
							class="form-control border-secondary"
							placeholder="Last name"
							v-model="
								participantRegistration.last_name
							" />
					</div>
					<input
						type="email"
						class="form-control border-secondary mb-3"
						placeholder="Email"
						v-model="participantRegistration.email" />
					<input
						type="password"
						class="form-control border-secondary mb-4"
						placeholder="Address"
						v-model="participantRegistration.address" />

					<label class="fw-bold mb-1">School Information</label>
					<select
						class="form-select border-secondary mb-3"
						v-model="participantRegistration.institution_id">
						<option value="" select hidden>
							Choose your institution
						</option>
						<option
							v-for="institution in institutionsList"
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
							v-model="participantRegistration.course" />

						<input
							type="number"
							max="5"
							min="1"
							placeholder="Year"
							class="form-control border-secondary text-dark w-25"
							v-model="
								participantRegistration.year_level
							" />
					</div>

					<label class="fw-bold mb-1">Event Information</label>
					<select
						class="form-select border-secondary mb-5"
						v-model="participantRegistration.institution_id">
						<option value="" select hidden>
							Choose your event
						</option>
						<option
							v-for="institution in institutionsList"
							:key="institution.id"
							:value="institution.id">
							{{ institution.name }}
						</option>
					</select>
					<div class="d-flex justify-content-between">
						<NuxtLink to="/register" class="btn hstack gap-2">
							<i class="bi bi-arrow-left" />Back
						</NuxtLink>
						<button
							type="submit"
							class="btn btn-primary px-5"
							:disabled="StatusSavingUser === 'pending'">
							<span
								v-if="StatusSavingUser === 'pending'"
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

	const participantRegistration = reactive({
		first_name: "",
		last_name: "",
		email: "",
		institution_id: "",
		course: "",
		year_level: "",
		address: "",
		event_id: "",
	});

	const { data: institutionsList } = await useFetch(`/api/institutions`);
</script>

<style></style>
