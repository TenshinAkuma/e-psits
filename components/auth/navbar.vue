<template>
	<nav class="bg-light sticky-top">
		<div class="container-xxl d-flex justify-content-between p-3">
			<NuxtLink
				to="/"
				class="nav-link fw-bold"
				style="font-size: 1.5rem"
				>E-PSITS</NuxtLink
			>
			<div class="d-flex align-items-center gap-5">
				<NuxtLink to="/" class="nav-link fw-bold text-secondary"
					>Home</NuxtLink
				>
				<NuxtLink class="nav-link fw-bold text-secondary"
					>Events</NuxtLink
				>
				<NuxtLink class="nav-link fw-bold text-secondary"
					>About</NuxtLink
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
