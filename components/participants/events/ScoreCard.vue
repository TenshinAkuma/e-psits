<template>
	<div class="score-card rounded-3 p-3">
		<div class="d-flex justify-content-between">
			<p class="text-secondary">
				{{ formatDateString(registration.events.date) }}
			</p>
			<p class="fs-7">
				{{ registration.events.category }}
			</p>
		</div>
		<h4 class="fw-bold">{{ registration.events.title }}</h4>

		<p class="text-secondary lh-sm fs-7">
			{{ registration.events.description }}
		</p>
		<br />

		<div class="d-flex justify-content-between">
			<RegistrationsStatusUpdate
				:RegistrationStatus="registration.registration_status"
				:ParticipantRegistrationID="registration.id" />
			<NuxtLink
				:to="`/admin/events/${registration.events.id}`"
				class="btn btn-sm btn-outline-dark rounded-pill px-5">
				View event
			</NuxtLink>
		</div>
	</div>
</template>

<script setup>
	const props = defineProps({
		registration: Object,
	});

	const registration = toRef(() => props.registration);

	const { data: _scoreData, status: _scoreStatus } = useFetch(
		`/api/participant-scores/${registration.value?.id}`,
		{
			method: "GET",
		}
	);
</script>

<style scoped>
	.score-card:hover {
		background-color: whitesmoke;
		cursor: pointer;
	}
</style>
