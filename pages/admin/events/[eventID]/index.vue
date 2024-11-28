<template>
	<div class="w-100 pb-5">
		<div v-if="status === 'success'" class="row">
			<EventsEditsTitle :EventTitle="event.title" />
			<hr />
			<div class="col-8"></div>
			<div class="col-4">
				<p class="fw-bold">BASIC INFORMATION</p>
				<EventsEditsDescription
					:EventDescription="event.description" />
				<br />
				<EventsEditsModality :EventModality="event.modality" />
				<br />
				<EventsEditsCategory :EventCategory="event.category" />
				<hr />
				<p class="fw-bold">SCHEDULE</p>
				<EventsEditsDate :EventDate="event.date" />
				<br />
				<EventsEditsTime :EventTime="event.date" />
				<hr />
				<p class="fw-bold">LOCATION</p>
				<EventsEditsVenue :EventVenue="event.venue" />
				<br />
				<EventsEditsAddress :EventAddress="event.address" />
			</div>
		</div>
		<div v-else>
			<div class="spinner-border" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
		</div>
	</div>
</template>

<script setup>
	definePageMeta({
		layout: "main",
	});

	const eventID = useRoute().params.eventID;

	const { data: event, status } = useFetch(`/api/events/${eventID}`, {
		headers: useRequestHeaders(["cookie"]),
		method: "GET",
	});

	// onMounted(async () => {
	// 	await refresh();
	// 	execute();
	// });
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
