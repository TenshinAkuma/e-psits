<template>
	<section class="pb-5">
		<article>
			<div class="fs-4 fw-bold">Welcome to E-PSITS XII Dashboard.</div>
			<div class="text-secondary">
				An Online Registration Platform for the Philippine Society
				of Information Technology Students Convention
			</div>
		</article>

		<hr>
		<br/>
		
		<article>
			<p class="fw-bold mb-2">Quick actions</p>
			<div class="row">
				<DashboardCard
					v-for="(action, index) in dashboard_actions"
					:key="index"
					class="col-lg-6 col-md-12 p-1"
					:action_shortcut="action.shortcut"
					:action_icon="action.icon"
					:link="action.link" />
			</div>
		</article>

		<br />
		<br />

		<article>
			<div class="d-flex justify-content-between">
				<p class="fw-bold m-0">Student memberships</p>
				<NuxtLink
					:to="`/admin/memberships`"
					class="fw-bold fs-7 text-decoration-none m-0"
					>See full list</NuxtLink
				>
			</div>
			<div class="row">
				<div
				v-for="(stat, index) in institutionCount"
				:key="index"
				class="col-3 p-1">
				<div class="border border-secondary rounded-3 px-3 py-2">
					<h4 class="fw-bold m-0">{{ stat.stat }}</h4>
					<div class="mb-0 text-secondary">
						{{ stat.name }}
					</div>
				</div>
			</div>
			</div>
		</article>

		<br />

		<article>
			<div class="d-flex justify-content-between">
				<p class="fw-bold m-0">Institutions memberships</p>
				<NuxtLink
					:to="`/admin/memberships/institutions`"
					class="fw-bold fs-7 text-decoration-none m-0"
					>See full list</NuxtLink
				>
			</div>
			<div class="row">
				<div
				v-for="(stat, index) in participantCount"
				:key="index"
				class="col-3 p-1">
				<div class="border border-secondary rounded-3 px-3 py-2">
					<h4 class="fw-bold m-0">{{ stat.stat }}</h4>
					<p class="mb-0 text-secondary">
						{{ stat.name }}
					</p>
				</div>
			</div>
			</div>
		</article>
	</section>
</template>

<script setup>
	definePageMeta({
		layout: "main",
	});

	const participantCount = ref([]);
	const institutionCount = ref([]);
	const isLoading = ref(false);
	const errMsg = ref("");

	async function LoadData() {
		isLoading.value = true;
		const { data: participantStats, error: participantsError } =
			await $fetch(`/api/membership-participants/count`, {
				method: "GET",
			});

		const { data: institutionsStats, institutionsError } = await $fetch(
			`/api/membership-institutions/count`,
			{
				method: "GET",
			}
		);

		if (participantsError || institutionsError) {
			console.error(
				"Error loading data: ",
				participantsError || institutionsError
			);
		}

		participantCount.value = participantStats;
		institutionCount.value = institutionsStats;
		isLoading.value = false;
	}

	await LoadData();

	const dashboard_actions = [
		{
			shortcut: "Membership applications",
			icon: "material-symbols:card-membership-outline-rounded",
			link: "/admin/memberships",
		},
		{
			shortcut: "Create an event",
			icon: "material-symbols:calendar-add-on-outline-rounded",
			link: "/admin/events",
		},
		{
			shortcut: "Participant registration",
			icon: "material-symbols:person-add-outline-rounded",
			link: "/admin/participants",
		},
		{
			shortcut: "Event results",
			icon: "material-symbols:award-star-outline-rounded",
			link: "/admin",
		},
	];
</script>
