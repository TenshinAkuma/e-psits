<template>
	<div class="container-xxl mt-5 pb-5">
		<img
			src="C:\Projects\073024_E-PSITS\e-psits\public\img\undraw_wait_in_line_o2aq.svg"
			style="height: 288px; width: 100%; object-fit: cover"
			class="rounded-3 overflow-hidden border mb-3"
		/>
		<h1 class="fw-bold">{{ event.title }}</h1>
	</div>
</template>

<script setup>
	definePageMeta({
		layout: "main",
	});

	const route = useRoute();
	const eventID = route.params.eventID;


	const { data: event, status } = await useFetch(`/api/events/${eventID}`, {
		headers: useRequestHeaders(["cookie"]),
		method: "GET",
	});
</script>

<style scoped>
	.list-group-item {
		font-size: 0.9rem !important;
	}

	.forms {
		cursor: pointer;
	}

	.forms:hover {
		color: black !important;
	}
</style>
