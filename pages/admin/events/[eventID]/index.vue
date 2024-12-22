<template>
	<div class="w-100 pb-5">
		<div v-if="status === 'success'" class="row">
			<div class="d-flex justify-content-between align-items-center">
				<EventsEditsTitle :EventTitle="event.title" />
				<div class="hstack gap-2">
					<EventsRegisterParticipant />
					<EventsCreateModal />
					<EventsDelete />
				</div>
			</div>

			<TabsHeader class="mb-5">
				<TabsNavButtons Id="participants" :Active="true">
					Participants
				</TabsNavButtons>
				<TabsNavButtons Id="criteria"> Criteria </TabsNavButtons>
			</TabsHeader>

			<div class="col-9">
				<TabsContent>
					<TabsPane Id="participants" :Active="true">
						<EventsTabsParticipants />
					</TabsPane>
					<TabsPane Id="criteria">
						<EventsTabsCriteria />
					</TabsPane>
				</TabsContent>
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
