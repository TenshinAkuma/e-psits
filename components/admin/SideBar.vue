<template>
	<div>
		<button
			class="navbar-toggler border border-secondary rounded-1"
			type="button"
			data-bs-toggle="offcanvas"
			href="#leftSideBar"
			role="button"
			aria-controls="leftSideBar">
			<i class="bi-list fs-3" />
		</button>

		<div
			style="width: 288px"
			class="offcanvas offcanvas-start"
			tabindex="-1"
			id="leftSideBar"
			aria-labelledby="offcanvasExampleLabel"
			ref="leftSideBarRef">
			<div class="offcanvas-header">
				<div
					class="offcanvas-title fs-4 fw-bold"
					id="offcanvasExampleLabel">
					E-PSITS
				</div>
				<button
					type="button"
					class="btn-close"
					data-bs-dismiss="offcanvas"
					aria-label="Close"></button>
			</div>
			<div class="offcanvas-body d-flex flex-column">
				<NuxtLink
					v-for="(menu, index) in Menus"
					:key="index"
					@click="navigateToPage(menu.route)"
					class="fw-bold text-decoration-none text-secondary py-3 w-100"
					style="cursor: pointer"
					id="nav-menu">
					{{ menu.selection }}
				</NuxtLink>
			</div>
		</div>
	</div>
</template>

<script setup>
	let leftSideBar = null;
	const leftSideBarRef = ref(null);

	onMounted(() => {
		if (leftSideBarRef.value) {
			// Initialize the Offcanvas instance
			leftSideBar = bootstrap.Offcanvas.getOrCreateInstance(
				leftSideBarRef.value
			);
		}
	});

	const navigateToPage = (url) => {
		navigateTo(`/admin/${url}`);
		closeOffcanvas();
	};
	const closeOffcanvas = () => {
		if (leftSideBar) {
			leftSideBar.hide(); // Call the hide method to close the Offcanvas
		} else {
			console.error("Offcanvas instance not found.");
		}
	};

	const Menus = [
		{
			selection: "Dashboard",
			route: "",
		},
		{
			selection: "Events",
			route: "events",
		},
		{
			selection: "Participants",
			route: "participants",
		},
		{
			selection: "Institutions",
			route: "institutions",
		},
		{
			selection: "Memberships",
			route: "memberships",
		},
		{
			selection: "Results",
			route: "results",
		},
	];
</script>

<style scoped>
	.logout-btn {
		color: #46468f;
		text-decoration: none;
	}

	#nav-menu:hover {
		color: #46468f !important;
	}
</style>
