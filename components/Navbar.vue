<template>
	<header class="border-bottom border-2">
		<div
			class="px-3 d-flex justify-content-between align-items-center"
			style="height: 56px">
			<div class="fs-4 fw-bold">E-PSITS</div>
			<div class="text-dark">Administrator Panel</div>
			<button
				class="d-flex align-items-center btn btn-link text-decoration-none text-dark px-3"
				@click="handleLogout()">
				<Icon
					name="material-symbols:power-settings-new-outline-rounded"
					class="me-2" />
				Logout
			</button>
		</div>
	</header>
</template>

<script setup>
	const router = useRouter();
	const client = useSupabaseClient();

	const handleLogout = async () => {
		const { error } = await client.auth.signOut();
		router.push("/signIn");
	};
</script>
