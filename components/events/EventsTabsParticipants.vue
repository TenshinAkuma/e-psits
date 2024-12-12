<template>
	<div v-if="registrations != null">
		<div class="d-flex justify-content-between fw-bold text-secondary">
			<p>Participant</p>
			<p>Registration status</p>
		</div>
		<EventsParticipantsCard
			v-for="registration in registrations"
			:key="registration.id"
			:registration="registration" />
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

<style scoped>
	table thead tr th {
		position: sticky;
		top: 0;
		z-index: 1;
	}
</style>
