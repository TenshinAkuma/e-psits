<template>
	<div class="border rounded-3 p-3">
		<p class="fw-bold">About</p>
		<EventsEditsDescription :EventDescription="event.description" />
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
</template>

<script setup>
	const eventID = useRoute().params.eventID;

	const { data: event, status } = useFetch(`/api/events/${eventID}`, {
		headers: useRequestHeaders(["cookie"]),
		method: "GET",
	});
</script>

<style scoped>
	.sub-label {
		font-size: 0.9rem;
	}
</style>
