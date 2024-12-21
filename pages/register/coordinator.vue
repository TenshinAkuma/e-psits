<template>
	<div>
		<PublicRegister>
			<template #header>
				<h3 class="fw-bold lh-sm">Register and Lead the Way!</h3>
				<p class="text-secondary lh-sm" style="font-size: 0.9rem">
					Sign up your institution to empower participants and
					manage event involvement seamlessly.
				</p>
			</template>
			<template #body>
				<form @submit.prevent="OnRegisterInstitution">
					<div class="fw-bold mb-1">School Information</div>
					<input
						type="text"
						class="form-control border-secondary mb-3"
						placeholder="Name"
						v-model="registration.institution.name" />
					<input
						type="text"
						class="form-control border-secondary mb-3"
						placeholder="Email"
						v-model="registration.institution.email" />

					<input
						type="text"
						class="form-control border-secondary mb-4"
						placeholder="Address"
						v-model="registration.institution.address" />

					<div class="fw-bold mb-1">Coordinator Information</div>
					<p
						class="text-secondary lh-sm"
						style="font-size: 0.8rem">
						A faculty member representing an institution to
						manage registrations and updates.
					</p>
					<div class="d-flex gap-2 mb-3">
						<input
							type="text"
							class="form-control border-secondary"
							placeholder="First name"
							v-model="
								registration.coordinator.first_name
							" />
						<input
							type="text"
							class="form-control border-secondary"
							placeholder="Last name"
							v-model="
								registration.coordinator.last_name
							" />
					</div>

					<div class="d-flex gap-3">
						<input
							type="text"
							class="form-control border-secondary mb-3"
							placeholder="Position"
							v-model="
								registration.coordinator.position
							" />
						<p
							class="text-secondary fst-italic lh-sm"
							style="font-size: 0.8rem">
							Enter official role or title within the
							institution.
						</p>
					</div>

					<div class="d-flex gap-2 mb-3">
						<input
							type="text"
							class="form-control border-secondary"
							placeholder="Email"
							v-model="registration.coordinator.email" />
						<input
							type="text"
							class="form-control border-secondary"
							placeholder="Contact number"
							v-model="
								registration.coordinator.contact_number
							" />
					</div>

					<div class="d-flex justify-content-between mt-5">
						<NuxtLink to="/register" class="btn hstack gap-2">
							<i class="bi bi-arrow-left" />Back
						</NuxtLink>
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

	const registration = reactive({
		coordinator: {
			first_name: "",
			last_name: "",
			position: "",
			email: "",
			contact_number: "",
		},
		institution: {
			name: "",
			address: "",
			email: "",
		},
	});

	const {
		data: response,
		status: registrationStatus,
		execute: registerInstitution,
	} = await useFetch("/api/registrations/coordinators", {
		method: "POST",
		body: registration,
		immediate: false,
		watch: false,
	});

	const OnRegisterInstitution = async () => {
		try {
			await registerInstitution();
			if (response.value.success) {
				await navigateTo("/");
			}
		} catch {
			console.log("School registration failed");
		}
	};
</script>

<style></style>
