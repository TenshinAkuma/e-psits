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
						Participants
					</TabsNavButtons>
					<TabsNavButtons id="criteria">
						Criteria
					</TabsNavButtons>
				</TabsHeader>
				<TabsContent class="py-5">
					<TabsPane id="participants" :active="true">
						<EventsTabsParticipants />
					</TabsPane>
					<TabsPane id="criteria">
						<EventsTabsCriteria />
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

	const { data: _eventDetails, status } = await useFetch(
		`/api/events/${eventID}`,
		{
			method: "GET",
		}
	);

	eventDetails.value = _eventDetails.value.data;
</script>

<style scoped></style>
