<template>
	<div>
		<div class="d-flex justify-content-between align-items-center mb-5">
			<EventsEditsTitle :EventTitle="event.title" />
			<div class="hstack gap-2">
				<EventsCreateModal />
				<EventsDelete />
			</div>
		</div>

		<div class="d-flex gap-5">
			<div class="border rounded p-3">
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
			<div class="flex-grow-1 w-100">
				<ul class="nav nav-tabs mb-3">
					<li class="nav-item">
						<NuxtLink
							class="nav-link"
							activeClass="active"
							:to="`/admin/events/${eventID}`"
							>Participants</NuxtLink
						>
					</li>
					<li class="nav-item">
						<NuxtLink
							class="nav-link"
							activeClass="active"
							:to="`/admin/events/${eventID}/criteria`"
							>Criteria</NuxtLink
						>
					</li>
				</ul>

				<!-- SLOT FOR TABS -->
				<div>
					<slot name="tabs" />
				</div>
			</div>
		</div>
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
	.nav-link {
		color: #424242;
	}
	.nav-link.active {
		color: #242424 !important;
		font-weight: bold;
	}
</style>
