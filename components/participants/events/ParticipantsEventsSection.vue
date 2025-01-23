<template>
	<div
		v-if="_registrationStatus === 'pending'"
		class="d-flex flex-column justify-content-center align-items-center gap-2 m-auto"
		style="height: 576px">
		<div class="spinner-border text-secondary" role="status">
			<span class="visually-hidden">Loading...</span>
		</div>
		Loading...
	</div>

	<div v-else class="vstack gap-3">
		<ScoreCard v-for="registration in EventRegistrations"
		class="border border-secondary"
			:key="registration.id"
			:registration="registration" />
	</div>
</template>

<script setup>
	import ScoreCard from "./ScoreCard.vue";

	const participantId = Number(useRoute().params.participantId);
	const EventRegistrations = useEventRegistrations();
	const errorMessage = ref("");

	const {
		data: _registrationData,
		status: _registrationStatus,
		execute: LoadRegistration,
	} = await useFetch(`/api/participant-registrations/${participantId}`, {
		method: "GET",
		immediate: false,
		watch: false,
	});

	try {
		await LoadRegistration();
		if (_registrationData.value?.error) {
			throw new Error(_registrationData.value?.error);
		}

		EventRegistrations.value = _registrationData.value?.data;
	} catch (err) {
		console.error(err.message);
		errorMessage.value = "Error while loading data. Please try again.";
		setTimeout(() => {
			errorMessage.value = "";
		}, 3000);
	}
</script>
