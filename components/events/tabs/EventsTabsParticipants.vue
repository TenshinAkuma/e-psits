<template>
	<div v-if="registrations != null">
		<ul class="list-group list-group-flush">
			<div
				class="list-group-item d-flex justify-content-between fw-bold text-secondary">
				<div>Participant</div>
				<div>Registration status</div>
			</div>
			<li
				v-for="registration in registrations.data"
				:key="registration.id"
				class="list-group-item d-flex justify-content-between align-items-center">
				<EventsParticipantsCard :registration="registration" />

				<RegistrationsStatusUpdate
					:RegistrationStatus="registration.registration_status"
					:ParticipantRegistrationID="registration.id" />
			</li>
		</ul>
	</div>

	<div v-else>No Participants</div>
</template>

<script setup>
	const eventID = useRoute().params.eventID;
	const {
		data: registrations,
		status,
		error,
	} = await useFetch(`/api/events/${eventID}/getParticipants`);
</script>
