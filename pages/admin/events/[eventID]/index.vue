<template>
	<div class="w-100 pb-5">
		<div v-if="status === 'success'" class="row">
			<div class="d-flex justify-content-between mb-3">
				<EventsEditsTitle :EventTitle="event.title" />
				<EventsDelete />
			</div>
			<nav class="mb-4">
				<div class="nav nav-tabs" id="nav-tab" role="tablist">
					<button
						class="nav-link active"
						id="nav-participants-tab"
						data-bs-toggle="tab"
						data-bs-target="#nav-participants"
						type="button"
						role="tab"
						aria-controls="nav-participants"
						aria-selected="true">
						Participants
					</button>
					<button
						class="nav-link"
						id="nav-results-tab"
						data-bs-toggle="tab"
						data-bs-target="#nav-results"
						type="button"
						role="tab"
						aria-controls="nav-results"
						aria-selected="true">
						Results
					</button>
				</div>
			</nav>

			<div class="col-8">
				<div class="tab-content" id="nav-tabContent">
					<div
						class="tab-pane show active"
						id="nav-participants"
						role="tabpanel"
						aria-labelledby="nav-participants-tab"
						tabindex="0">
						<EventsTabsParticipants />
					</div>
				</div>
			</div>
			<div class="col-3">
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
	.nav-link {
		color: #424242;
	}
	.nav-link.active {
		color: #242424 !important;
		font-weight: bold;
	}
</style>
