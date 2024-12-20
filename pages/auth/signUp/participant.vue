<template>
	<div>
		<AuthSignUp>
			<template #header
				><h1 class="fw-bold lh-sm">Let’s Begin Your Journey!</h1>
				<h5 class="text-secondary lh-sm">
					Let’s set up your profile to help manage your
					institution seamlessly.
				</h5></template
			>
			<template #body>
				<form @submit.prevent="OnSaveNewUser">
					<h5 class="fw-bold lh-sm">Tell Us About Yourself</h5>
					<p class="text-secondary" style="font-size: 0.9rem">
						Help us know you better by providing a few
						details. Enter your first name, last name, email,
						and set a secure password. Don’t worry—your
						information is safe with us!
					</p>
					<div class="d-flex gap-3 mb-3">
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
						v-model="newParticipant.email" />
					<input
						type="password"
						class="form-control border-secondary mb-3"
						placeholder="Password"
						v-model="newParticipant.password" />

					<select
						class="form-select border-secondary"
						v-model="newParticipant.institution_id">
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

					<div class="d-flex justify-content-between mt-5">
						<NuxtLink
							to="/auth/signUp"
							class="btn hstack gap-2">
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
							<span role="status">Apply</span>
						</button>
					</div>
				</form>
			</template>
		</AuthSignUp>
		response data: {{ data }}
	</div>
</template>

<script setup>
	definePageMeta({
		layout: "auth",
	});

	const newParticipant = ref({
		first_name: "",
		last_name: "",
		email: "",
		password: "",
		institution_id: "",
		role: "participants",
	});

	const {
		data,
		status: StatusSavingUser,
		execute: SaveNewUser,
		error: NewUserError,
	} = await useFetch("/api/auth/signUp", {
		headers: useRequestHeaders(["cookie"]),
		method: "POST",
		body: newParticipant,
		immediate: false,
		watch: false,
	});

	const OnSaveNewUser = async () => {
		try {
			await SaveNewUser();
			if (data.value.success) {
				await navigateTo("/");
			}
		} catch {
			console.log("Sign up failed.", NewUserError);
		}
	};

	const { data: institutionsList } = await useFetch(`/api/institutions`);
</script>

<style></style>
