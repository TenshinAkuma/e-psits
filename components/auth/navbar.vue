<template>
	<nav class="bg-light sticky-top border-bottom border-2">
		<div class="container-xxl d-flex justify-content-between p-3">
			<NuxtLink
				to="/"
				class="nav-link fw-bold"
				style="font-size: 1.5rem"
				>E-PSITS</NuxtLink
			>
			<div class="hstack gap-5">
				<NuxtLink
				to="/auth/signIn"
				class="nav-link fw-bold"
				>Sign in</NuxtLink
			><NuxtLink
				to="/register"
				class="nav-link fw-bold rounded-pill bg-primary px-4 py-2 text-light"
				>Create account</NuxtLink
			>
			</div>
		</div>
	</nav>
</template>
<style scoped>
	.nav-link:hover {
		color: #121212 !important;
		cursor: pointer;
	}
</style>
