<template>
	<header class="border-bottom bg-white border-bottom sticky-top">
		<div
			class="container d-flex justify-content-between align-items-center"
			style="height: 72px">
			<div class="d-flex align-items-center gap-3">
				<AdminSideBar />
				<div class="fs-4 fw-bold">E-PSITS</div>
			</div>
			<div class="d-none d-md-block text-dark">Administrator Panel</div>
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
		router.push("/auth/signIn");
	};
</script>
