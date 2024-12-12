<template>
	<div>
		<EventsParticipantsCard
			v-for="registration in registrations"
			:key="registration.id"
			:registration="registration" />
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
