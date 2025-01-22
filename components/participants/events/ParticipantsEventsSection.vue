<template>
	<div class="row">
		<div
			v-for="registration in _registrationData.data"
			:key="registration.id"
			class="col-6 p-2">
			<ScoreCard :registration="registration" />
		</div>
	</div>
</template>

<script setup>
	import ScoreCard from "./ScoreCard.vue";

	const participantId = Number(useRoute().params.participantId);

	const { data: _registrationData } = await useFetch(
		`/api/participant-registrations/${participantId}`,
		{
			method: "GET",
		}
	);
</script>

<style></style>
