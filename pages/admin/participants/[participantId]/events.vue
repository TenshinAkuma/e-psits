<template>
	<section>
		<article class="d-flex align-items-center gap-2">
			<Avatar
				:id="`participant-${ParticipantData.id}`"
				:name="GetFullname()"
				:gender="ParticipantData.sex"
				size="144px" />

			<div>
				<h1 class="fw-bold m-0">{{ GetFullname() }}</h1>
				<p class="hstack gap-3 m-0">
					<i class="bi bi-envelope-fill text-secondary fs-7" />
					<span>{{ ParticipantData.email }}</span>
				</p>
				<p class="hstack gap-3 m-0">
					<i class="bi bi-building-fill text-secondary fs-7" />
					<NuxtLink
						:to="`/admin/institutions/${ParticipantData.institution_id}`"
						>{{ ParticipantData.institutions.name }}</NuxtLink
					>
				</p>
			</div>

			<!-- <button class="btn btn-primary fw-bold">
				<i class="bi bi-plus-lg me-3" />
				<span>Register participant</span>
			</button> -->>
		</article>

		<br />

		<ParticipantsTabs activeTab="events" />
		<br />

		<article
			v-if="isLoading"
			class="d-flex flex-column justify-content-center align-items-center"
			style="height: 432px">
			<p>Loading data...</p>
			<div class="spinner-border" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
		</article>

		<article
			v-else-if="EventData.length <= 0 || EventData == null"
			class="d-flex flex-column justify-content-center align-items-center"
			style="height: 432px">
			<h4 class="fw-bold m-0">Event Guidelines</h4>
			<br />
			<br />
			<br />
			<p class="text-secondary text-center fs-7 lh-sm">
				No data available. Register to an event.
			</p>
			<EventRulesCreate
				:event="EventDetails"
				@onCreate="HandleReload" />
		</article>

		<article v-else>
			<br />
			<h4 class="fw-bold">Participant Events</h4>
			<br />
			<div>
				{{ EventData }}
			</div>
		</article>
	</section>
</template>

<script setup>
	definePageMeta({
		layout: "main",
	});

	const participantId = useRoute().params.participantId;
	const ParticipantData = ref({});
	const EventData = ref([]);
	const isLoading = ref(false);
	const errorMessage = ref();

	const LoadData = async () => {
		isLoading.value = true;
		const { data, error } = await $fetch(
			`/api/participants/${participantId}`,
			{
				method: "GET",
			}
		);

		const { data: events, error: eventsError } = await $fetch(
			`/api/participant-events/${participantId}`,
			{
				method: "GET",
			}
		);

		if (error || eventsError) {
			console.error("Error while loading data");
			errorMessage.value =
				"Internal server error. Please try again." ||
				error ||
				eventsError;
			setTimeout(() => {
				errorMessage.value = "";
			}, 3000);
		}

		ParticipantData.value = data;
		EventData.value = events;
		isLoading.value = false;
	};

	await LoadData();

	const GetFullname = () =>
		`${ParticipantData.value?.first_name} ${ParticipantData.value?.last_name}`;
</script>

<style></style>
