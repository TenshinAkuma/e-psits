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
					<TabsNavButtons id="rules">
						Rules and Guidelines
					</TabsNavButtons>
					<TabsNavButtons id="criteria">
						Criteria for Judging
					</TabsNavButtons>
					<TabsNavButtons id="results">
						Results and Evaluation
					</TabsNavButtons>
				</TabsHeader>
				<TabsContent class="py-5">
					<TabsPane id="participants" :active="true">
						<EventsTabsParticipants />
					</TabsPane>
					<TabsPane id="rules">
						<EventsTabsRules />
					</TabsPane>
					<TabsPane id="criteria">
						<EventsTabsCriteria />
					</TabsPane>
					<TabsPane id="results">
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
	const participantRegistrations = useParticipantRegistrations();
	const eventScores = useEventScores();

	const { data: _eventDetails } = await useFetch(
		`/api/events/${eventID}`,
		{
			method: "GET",
		}
	);

	const { data: _criteria } = await useFetch(
		`/api/events/${eventID}/criteria`,
		{
			method: "GET",
		}
	);

	const { data: _registrations } =
		await useFetch(`/api/events/${eventID}/getParticipants`);


	const { data: _scoresData } = await useFetch(
		`/api/event-results/${eventID}`,
		{
			method: "GET",
		}
	);

	eventScores.value = _scoresData.value?.data;
	eventDetails.value = _eventDetails.value?.data;
	eventCriteria.value = _criteria.value?.data;
	participantRegistrations.value = _registrations.value.data;
</script>

<style scoped></style>
