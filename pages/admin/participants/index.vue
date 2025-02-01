<template>
	<div class="">
		<div class="d-flex justify-content-between align-items-center gap-3">
			<h4 class="fw-bold m-0">PARTICIPANTS</h4>
			<ParticipantsCreateModal />
		</div>

		<hr />

		<div
			v-if="_participantsStatus === 'pending'"
			class="d-flex flex-column justify-content-center align-items-center gap-2 m-auto"
			style="height: 576px">
			<div class="spinner-border text-secondary" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
			Loading participants
		</div>

		<div v-else class="row g-2 overflow-y-auto" style="height: 720px">
			<div
				v-for="participant in participants"
				:key="participant.id"
				class="col-6 participant-card d-flex justify-content-between align-items-center rounded-3 p-3">
				<Avatar
					:gender="participant.sex"
					:id="`participant-${participant.id}`"
					:name="`${participant.first_name} ${participant.last_name}`"
					size="72px">
					<template #Name>
						<p class="fw-bold m-0">
							{{
								`${participant.first_name} ${participant.last_name}`
							}}
						</p>
						<p class="fs-7 m-0">
							{{ participant.institutions.name }}
						</p>
						<p class="fs-7 text-secondary m-0">
							{{ participant.email }}
						</p>
					</template>
				</Avatar>

				<div class="btn-group gap-2">
					<button
						type="button"
						@click="ToParticipantDetails(participant.id)"
						class="btn btn-sm btn-outline-dark rounded-pill px-3"
						style="height: min-content">
						Visit profile
					</button>
					<button type="button" class="btn btn-sm">
						<i class="bi bi-three-dots-vertical" />
					</button>
				</div>
			</div>
		</div>

		<div
			v-if="participants == null || participants == 0"
			class="d-flex flex-column justify-content-center align-items-center"
			style="height: 576px">
			<p class="fs-7">No Participants.</p>
			<EventsCreateModal />
		</div>
	</div>
</template>

<script setup>
	definePageMeta({
		layout: "main",
	});

	const participants = useParticipants();
	const errorMessage = ref("");
	const isLoading = ref(false);

	const { data: _participantsData, status: _participantsStatus, execute: LoadParticipants } = await useFetch(
		"/api/participants",
		{
			method: "GET",
			immediate: false,
			watch: false,
		}
	);

	const ToParticipantDetails = (participantID) => {
		navigateTo(`/admin/participants/${participantID}`);
	};

	try {
			await LoadParticipants();

			if (_participantsData.value?.error) {
				throw new Error(_participantsData.value?.error);
			}

		participants.value = _participantsData.value?.data;
		} catch (err) {
			console.error("Error while loading participants", err.message);

			participants.value = [];
			errorMessage.value = err.message;

			setTimeout(() => {
				errorMessage.value = "";
			}, 3000);
	}
</script>

<style scoped>
	.participant-card:hover {
		cursor: pointer;
		background-color: #f5f5f5;
		/* border: 1px solid; */
	}
</style>
