<template>
	<div>
		<div
			class="d-flex justify-content-between align-items-center gap-5 mb-5">
			<EventsEditsTitle class="flex-grow-1" />
			<div class="hstack gap-2">
				<EventsCreateModal />
				<EventsDelete />
			</div>
		</div>
		<div class="row">
			<div class="col-3">
				<div class="border rounded-3 p-3">
					<p class="fw-bold">About</p>
					<EventsEditsDescription />
					<EventsEditsType />
					<EventsEditsCategory />

					<hr />

					<p class="fw-bold">Schedule</p>
					<EventsEditsDate />
					<EventsEditsTime />

					<hr />

					<p class="fw-bold">Location</p>
					<EventsEditsVenue />
					<EventsEditsAddress />
				</div>
			</div>
			<div class="col-9">
				<TabsHeader>
					<TabsNavButtons id="participants" :active="true">
						Registration Status
					</TabsNavButtons>
					<TabsNavButtons
						v-if="eventDetails.category == 'Competition'"
						id="rules">
						Rules and Guidelines
					</TabsNavButtons>
					<TabsNavButtons v-if="eventDetails.category == 'Competition'" id="criteria">
						Criteria for Judging
					</TabsNavButtons>
					<TabsNavButtons v-if="eventDetails.category == 'Competition'" id="results">
						Results and Evaluation
					</TabsNavButtons>
				</TabsHeader>
				<TabsContent class="py-5">
					<TabsPane id="participants" :active="true">
						<EventsTabsParticipants />
					</TabsPane>
					<TabsPane
						id="rules"
						v-if="
							eventDetails.category ==
							'Competition'
						">
						<EventsTabsRules />
					</TabsPane>
					<TabsPane v-if="eventDetails.category == 'Competition'" id="criteria">
						<EventsTabsCriteria />
					</TabsPane>
					<TabsPane v-if="eventDetails.category == 'Competition'" id="results">
						<EventsTabsResults />
					</TabsPane>
				</TabsContent>
			</div>
		</div>
	</div>
</template>

<script setup>
	definePageMeta({
		layout: "main",
	});

	const eventID = useRoute().params.eventID;
	const eventDetails = useEventDetails();
	const eventCriteria = useEventCriteria();
	const eventRegistrations = useEventRegistrations();
	const eventScores = useEventScores();

	const { data: _eventDetails } = await useFetch(`/api/events/${eventID}`, {
		method: "GET",
	});

	const { data: _criteriaData } = await useFetch(
		`/api/event-criteria/${eventID}`,
		{
			method: "GET",
		}
	);

	const { data: _registrations } = await useFetch(
		`/api/event-registrations/${eventID}`, {
		method: "GET"
	});

	const { data: _scoresData } = await useFetch(
		`/api/event-results/${eventID}`,
		{
			method: "GET",
		});

	eventScores.value = _scoresData.value?.data;
	eventDetails.value = _eventDetails.value?.data;
	eventCriteria.value = _criteriaData.value?.data;
	eventRegistrations.value = _registrations.value.data;
</script>
