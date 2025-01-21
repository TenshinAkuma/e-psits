<template>
	<div class="row g-2">
		<ScoreCard v-for="registration in _registrationData.data"
		:key="registration.id"
		:registration="registration"/>
	</div>
</template>

<script setup>
	import ScoreCard from './ScoreCard.vue';

	const participantId = Number(useRoute().params.participantId);

	const { data: _registrationData } = await useFetch(
		`/api/participant-registrations/${participantId}`,
		{
			method: "GET",
		}
	);
</script>

<style></style>
