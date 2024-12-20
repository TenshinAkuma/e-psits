<template>
	<div>
		<AuthSignUp>
			<template #body>
				<h5 class="fw-bold lh-sm">Choose Your Role</h5>
				<p class="text-secondary" style="font-size: 0.9rem">
					Roles define how you interact with the platform. Each
					role determines the features and responsibilities
					available to you
				</p>

				<div class="d-flex flex-column gap-3">
					<div
						@click="ToRoleSignUp('participant')"
						class="role-select d-flex align-items-center border border-secondary rounded-3 gap-4 p-4 w-100">
						<i class="bi bi-trophy-fill fs-5" />
						<div>
							<div class="fw-bold">Participant</div>
							<p class="m-0" style="font-size: 0.8rem">
								A <strong>participant</strong> is
								student of an institution registering to
								join events and activities.
							</p>
						</div>
					</div>

					<div
						@click="ToRoleSignUp('coordinator')"
						class="role-select d-flex align-items-center border border-secondary rounded-3 gap-4 p-4 w-100">
						<i class="bi bi-heart-fill fs-5" />
						<div>
							<div class="fw-bold">Coordinator</div>
							<p class="m-0" style="font-size: 0.8rem">
								A <strong>coordinator</strong> is a
								faculty member representing an
								institution to manage registrations and
								updates.
							</p>
						</div>
					</div>
				</div>
			</template>
		</AuthSignUp>

		<!-- <AuthSignUpWizard
			:labels="['role', 'personal', 'institution']"
			:height="'360px'"
			:formName="'newUserForm'">
			<template #label-role>Role</template>
			<template #label-personal>Personal</template>
			<template #label-institution>Institution</template>

			<template #step-role>
			</template>
			<template #step-personal>
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
							v-model="newParticipant.last_name" />
					</div>
					<input
						type="email"
						class="form-control border-secondary mb-3"
						placeholder="Email"
						v-model="credentials.email" />
					<input
						type="password"
						class="form-control border-secondary"
						placeholder="Password"
						v-model="credentials.password" />
				</form>
				<form v-if="userRole == 'coordinator'" class="mb-5">
					
				</form>
			</template>
			<template #step-institution>
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
						<option selected hidden value="">
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
							placeholder="Name"
							v-model="newInstitution.name" />
						<input
							type="text"
							class="form-control border-secondary mb-3"
							placeholder="Email"
							v-model="newInstitution.email" />
						<input
							type="text"
							class="form-control border-secondary mb-3"
							placeholder="Address"
							v-model="newInstitution.address" />
					</div>
				</form>
			</template>
		</AuthSignUpWizard> -->
	</div>
</template>

<script setup>
	definePageMeta({
		layout: "auth",
	});

	const ToRoleSignUp = (route) => {
		navigateTo(`/auth/signUp/${route}`);
	};
</script>

<style scoped>
	.role-select:hover {
		cursor: pointer;
		border: solid 1px #0d6efd !important;
		color: #0d6efd !important;
	}
</style>
