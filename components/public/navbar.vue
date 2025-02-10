<template>
	<div
		class="container-xxl d-flex justify-content-between align-items-center rounded-3 p-3 my-3 sticky-top">
		<div class="d-flex align-items-center gap-5">
			<NuxtLink class="nav-link fw-bold" style="font-size: 1.5rem"
				>E-PSITS</NuxtLink
			>
		</div>
		<div class="hstack gap-3">
			<button class="btn fw-bold p-3" @click="ToSignIn">
				Sign in
			</button>
			<button
				type="button"
				class="btn btn-primary fw-bold p-3"
				@click="ToRegister">
				Register Now
			</button>
		</div>
	</div>
</template>

<script setup>
	const ToSignIn = () => {
		navigateTo("/auth/signIn");
	};

	const ToRegister = () => {
		navigateTo("/register");
	};
</script>

<style scoped>
	.nav-link:hover {
		color: #121212 !important;
		cursor: pointer;
	}
</style>
