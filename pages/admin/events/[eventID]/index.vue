<template>
	<div class="w-100 pb-5">
		<div v-if="status === 'success'" class="row">
			<div
				class="d-flex justify-content-between align-items-center mb-3">
				<EventsEditsTitle :EventTitle="event.title" />
				<EventsDelete />
			</div>
			<hr />
			<div class="col-8"></div>
			<div class="col-4">
				<p class="fw-bold">Basic Information</p>
				<EventsEditsDescription
					:EventDescription="event.description" />
				<EventsEditsModality :EventModality="event.type" />
				<EventsEditsCategory :EventCategory="event.category" />

				<hr />
				<p class="fw-bold">Schedule</p>
				<EventsEditsDate :EventDate="event.date" />
				<EventsEditsTime :EventTime="event.date" />
				<hr />
				<p class="fw-bold">Location</p>
				<EventsEditsVenue :EventVenue="event.venue" />
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
