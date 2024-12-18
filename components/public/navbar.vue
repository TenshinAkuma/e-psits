<template>
	<div
		class="container-xxl d-flex justify-content-between align-items-center rounded-3 border p-3 my-3 sticky-top">
		<div class="d-flex align-items-center gap-5">
			<h4 class="fw-bold m-0">E-PSITS</h4>
			<NuxtLink class="nav-link fw-bold text-secondary">Home</NuxtLink>
			<NuxtLink class="nav-link fw-bold text-secondary"
				>Events</NuxtLink
			>
			<NuxtLink class="nav-link fw-bold text-secondary"
				>About</NuxtLink
			>
		</div>
		<div class="hstack gap-3">
			<button class="btn fw-bold" @click="ToSignIn">Sign in</button>
			<button type="button" class="btn btn-primary fw-bold">
				Become a member
			</button>
		</div>
	</div>
</template>

<script setup>
	const ToSignIn = () => {
		navigateTo("/auth/signIn");
	};
</script>

<style scoped>
	.nav-link:hover {
		color: #121212 !important;
		cursor: pointer;
	}
</style>
