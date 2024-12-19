<template>
	<div style="max-width: 576px" class="mx-auto my-5 pb-5">
		<div class="text-center mb-5">
			<h1 class="fw-bold m-0">
				Join the Future of Collaboration and Innovation
			</h1>
			<p class="text-secondary">
				Sign up now to unlock exclusive access, streamline your
				experience, and connect with institutions and peers like
				never before.
			</p>
		</div>

		<AuthSignUpWizard
			:labels="['role', 'personal', 'institution']"
			:height="'360px'"
			:formName="'newUserForm'">
			<template #label-role>Role</template>
			<template #label-personal>Personal</template>
			<template #label-institution>Institution</template>

			<template #step-role>
				<!-- ROLE -->
				<form class="mb-5" id="newUserForm">
					<h5 class="fw-bold text-center">Choose Your Role</h5>
					<p
						class="text-secondary text-center ls-sm"
						style="font-size: 0.8rem">
						Roles define how you interact with the platform.
						Each role determines the features and
						responsibilities available to you
					</p>

					<select
						class="form-select border-secondary mb-2"
						v-model="userRole">
						<option value="participant">Participant</option>
						<option value="coordinator">Coordinator</option>
					</select>

					<p
						v-if="userRole == 'participant'"
						style="font-size: 0.8rem">
						A <strong>participant</strong> is student of an
						institution registering to join events and
						activities.
					</p>

					<p
						v-if="userRole == 'coordinator'"
						style="font-size: 0.8rem">
						A <strong>coordinator</strong> is a faculty member
						representing an institution to manage
						registrations and updates.
					</p>
				</form>
			</template>
			<template #step-personal>
				<!-- PARTICIPANT DETAILS -->
				<form v-if="userRole == 'participant'" class="mb-5">
					<h5 class="fw-bold">Tell Us About Yourself</h5>
					<p
						class="text-secondary lh-sm"
						style="font-size: 0.8rem">
						Your personal information is kept private and
						secure, used only to enhance your experience and
						ensure seamless registration.
					</p>
					<div class="d-flex gap-2 mb-3">
						<input
							type="text"
							class="form-control border-secondary"
							placeholder="First name"
							v-model="newParticipant.first_name" />
						<input
							type="text"
							class="form-control border-secondary"
							placeholder="Last name"
							v-model="newParticipant.surname" />
					</div>
					<input
						type="email"
						class="form-control border-secondary mb-3"
						placeholder="Email" />
					<input
						type="password"
						class="form-control border-secondary"
						placeholder="Password" />
				</form>

				<!-- COORDINATOR DETAILS -->
				<form v-if="userRole == 'coordinator'" class="mb-5">
					<h5 class="fw-bold">Tell Us About Yourself</h5>
					<p
						class="text-secondary lh-sm"
						style="font-size: 0.8rem">
						Your personal information is kept private and
						secure, used only to enhance your experience and
						ensure seamless registration.
					</p>
					<div class="d-flex gap-2 mb-3">
						<input
							type="text"
							class="form-control border-secondary"
							placeholder="First name" />
						<input
							type="text"
							class="form-control border-secondary"
							placeholder="Last name" />
					</div>
					<div class="d-flex gap-3">
						<input
							type="text"
							class="form-control border-secondary mb-3"
							placeholder="Position" />
						<p
							class="text-secondary fst-italic lh-sm"
							style="font-size: 0.8rem">
							Enter your official role or title within the
							institution.
						</p>
					</div>
					<input
						type="email"
						class="form-control border-secondary mb-3"
						placeholder="Email" />
					<input
						type="password"
						class="form-control border-secondary"
						placeholder="Password" />
				</form>
			</template>
			<template #step-institution>
				<!-- INSTITUTION DETAILS -->
				<form class="mb-5">
					<h5 class="fw-bold">Link Your Institution</h5>
					<p
						class="text-secondary lh-sm"
						style="font-size: 0.8rem">
						Almost there! Enter your institution’s name,
						address, and email to establish your account. This
						ensures accurate records and better communication.
					</p>

					<select
						v-if="userRole == 'participant'"
						class="form-select border-secondary mb-3"
						v-model="newParticipant.institution_id">
						<option selected hidden>
							Select your institution
						</option>
						<option
							v-for="institution in institutions"
							:key="institution.id"
							:value="institution.id">
							{{ institution.name }}
						</option>
					</select>

					<div v-if="userRole == 'coordinator'">
						<input
							type="text"
							class="form-control border-secondary mb-3"
							placeholder="Name" />
						<input
							type="text"
							class="form-control border-secondary mb-3"
							placeholder="Email" />
						<input
							type="text"
							class="form-control border-secondary mb-3"
							placeholder="Address" />
					</div>
				</form>
			</template>
		</AuthSignUpWizard>

		{{ userRole }} <br />
		{{ newParticipant }} <br />
		{{ newCoordinator }} <br />
		{{ newInstitution }} <br />
	</div>
</template>

<script setup>
	definePageMeta({
		layout: "auth",
	});

	const userRole = ref("participant");

	const credentials = ref({
		email: "",
		password: "",
	});

	const newParticipant = ref({
		first_name: "",
		surname: "",
		email: credentials.value.email,
		institution_id: null,
	});

	const newCoordinator = ref({
		firstname: "",
		lastname: "",
		position: "",
		email: credentials.value.email,
		contact_number: "",
	});

	const newInstitution = ref({
		name: "",
		email: "",
		address: "",
	});

	const { status: signUpStatus, execute: SignUpNewUser } = await useFetch(
		"/api/auth/signUp",
		{
			headers: useRequestHeaders(["cookie"]),
			method: "POST",
			body: credentials,
			immediate: false,
			watch: false,
		}
	);

	const { data: institutions } = await useFetch("/api/institutions");
</script>

<style></style>
