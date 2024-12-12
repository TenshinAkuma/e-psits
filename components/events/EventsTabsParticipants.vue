<template>
	<div>
		<EventsParticipantsCard
			v-for="registration in registrations"
			:key="registration.id"
			:first_name="registration.participants.first_name"
			:surname="registration.participants.surname"
			:sex="registration.participants.sex"
			:institution="registration.participants.institutions.name"
			:registration_status="registration.registration_status"
			:registration_id="registration.id" />
	</div>
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
