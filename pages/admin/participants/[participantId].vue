<template>
	<div v-if="_participantStatus === 'pending'">
		<div class="spinner-border" role="status">
			<span class="visually-hidden">Loading...</span>
		</div>
	</div>

	<div v-else class="row">
		<div class="col-3 p-2">
			<div class="border border-secondary rounded-3 p-3">
				<Avatar
					:id="participant.id"
					:name="`${participant.first_name} ${participant.last_name}`"
					:gender="`${participant.sex}`"
					size="144px"
					class="mb-2 justify-content-center" />
				<ParticipantsEditsNameStatus />

				<hr />
				<p class="fw-bold">Personal Information</p>
				<ParticipantsEditsSex/>
				<ParticipantsEditsDob />
				<ParticipantsEditsAddress />

				<hr />
				<p class="fw-bold">Contact Information</p>
				<ParticipantsEditsEmail />
				<ParticipantsEditsPhoneNumber />

				<hr />

				<p class="fw-bold">Academic Information</p>
				<ParticipantsEditsSchool />
				<ParticipantsEditsYearCourse />
			</div>
		</div>

		<div class="col-9">
			<div class="p-2">
				<ParticipantsEventsSection />
			</div>
		</div>
	</div>
</template>

<script setup>
	definePageMeta({
		layout: "main",
	});

	const participantId = useRoute().params.participantId;
	const participant = useParticipantDetails();
	const errorMessage = ref("");

	const {
		data: _participantData,
		status: _participantStatus,
		execute: LoadParticipant,
	} = await useFetch(`/api/participants/${participantId}`, {
		method: "GET",
		immediate: false,
		watch: false,
	});

	try {
		await LoadParticipant();

		if (_participantData.value?.error) {
			throw new Error(_participantData.value?.error);
		}

		participant.value = _participantData.value?.data;
	} catch (err) {
		console.error("Error while loading participant details.");

		errorMessage.value = err.message;

		setTimeout(() => {
			errorMessage.value = "";
		}, 3000);
	}
</script>
