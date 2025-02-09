<template>
	<div
		class="d-flex flex-column justify-content-end mx-auto"
		style="width: 372px; height: 504px">
		<div class="text-center mb-5">
			<h1 class="fw-bold m-0">Welcome!</h1>
			<p class="m-0">Sign in and start your session</p>
		</div>
		<div
			class="text-center fw-bold text-danger"
			style="font-size: 0.8rem">
			{{ errMsg }}
		</div>
		<form @submit.prevent="handleSignIn">
			<div class="mb-3">
				<label for="user-email" class="text-secondary">Email</label>
				<input
					type="email"
					class="form-control border-secondary rounded-3"
					id="user-email"
					placeholder="Enter your email here"
					v-model="email"
					require />
			</div>
			<div class="mb-5">
				<label for="user-password" class="text-secondary"
					>Password</label
				>
				<input
					type="password"
					class="form-control border-secondary"
					id="user-password"
					placeholder="Enter your password here"
					v-model="password"
					required />
			</div>

			<!-- <p class="fw-bold text-center" style="font-size: 0.8rem">
				Don't have an account yet?
				<NuxtLink to="/auth/signUp">Sign up here.</NuxtLink>
			</p> -->

			<button type="submit" class="btn btn-primary w-100">
				Sign in
			</button>
		</form>
	</div>
</template>

<script setup>
	import { ref } from "vue";

	definePageMeta({
		layout: "auth",
	});

	const client = useSupabaseClient();
	const user = useSupabaseUser();
	const email = ref("");
	const password = ref("");
	const errMsg = ref("");

	watchEffect(async () => {
		if (user.value) {
			await navigateTo("/admin");
		}
	});

	const handleSignIn = async () => {
		const { data, error } = await client.auth.signInWithPassword({
			email: email.value,
			password: password.value,
		});
		if (error) {
			errMsg.value = error.message;
			setTimeout(() => {
				errMsg.value = "";
			}, 3000);
		} else {
			console.log(data);
		}
	};
</script>

<style scoped></style>
