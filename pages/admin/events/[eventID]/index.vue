<template>
	<div class="w-100 pb-5">
		<EventsEditsTitle :EventTitle="event.title" />
		<hr />
		<div v-if="status === 'success'" class="row">
			<div class="col-8"></div>
			<div class="col-4">
				<EventsEditsDescription
					:EventDescription="event.description" />
				<br />
				<EventsEditsModality :EventModality="event.modality" />
				<br />
				<EventsEditsCategory :EventCategory="event.category" />
				<hr />

				<p class="fw-bold">SCHEDULE</p>
				<div class="fw-bold text-secondary">Date</div>
				<div>{{ formatDate(event.date) }}</div>
				<br />
				<div class="fw-bold text-secondary">Time</div>
				<div>
					{{ new Date(event.date).toLocaleTimeString() }}
				</div>
				<hr />
				<p class="fw-bold">LOCATION</p>
				<div class="fw-bold text-secondary">Venue</div>
				<div class="text-secondary">
					{{ event.venue || `To be announced` }}
				</div>
				<br />
				<div class="fw-bold text-secondary">Address</div>
				<div class="text-secondary">
					{{ event.address || `To be announced` }}
				</div>
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

	const { data: event, status } = await useFetch(`/api/events/${eventID}`, {
		headers: useRequestHeaders(["cookie"]),
		method: "GET",
		lazy: true,
	});

	watch(event, (newEvent) => {
		console.log(newEvent);
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
