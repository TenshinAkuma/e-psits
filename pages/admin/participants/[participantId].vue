<template>
	<div v-if="_participantStatus === 'success'" class="row">
			<div class="col-3">
				<Avatar :id="participant.id"
				:name="`${participant.first_name} ${participant.last_name}`"
				:gender="`${participant.sex}`"
				size="144px" class="mb-2 mx-auto"/>
				<ParticipantsEditsNameStatus/>

				<hr />
				<p class="fw-bold">Personal Information</p>

				<ParticipantsEditsDob :ParticipantDob="participant.dob" />

				<ParticipantsEditsAddress/>

				<hr />
				<p class="fw-bold">Contact Information</p>

				<ParticipantsEditsEmail
					:ParticipantEmail="participant.email" />

				<ParticipantsEditsPhoneNumber
					:ParticipantPhoneNumber="participant.phone_number" />

				<hr />

				<p class="fw-bold">Academic Information</p>

				<ParticipantsEditsSchool
					:ParticipantSchool="participant.school" />

				<ParticipantsEditsYearCourse/>
			</div>
			{{ participant }}
		</div>

		<div v-else>
			<div class="spinner-border" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
		</div>
</template>

<script setup>
	definePageMeta({
		layout: "main",
	});

	const participantId = useRoute().params.participantId;
	const participant = useParticipantDetails();
	const errorMessage = ref("")

	const { data: _participantData, status: _participantStatus, execute: LoadParticipant } = useFetch(
		`/api/participants/${participantId}`,
		{
			method: "GET",
			immediate: false,
			watch: false
		}
	);

	try {
		await LoadParticipant();

		if (_participantData.value?.error) {
			throw new Error(_participantData.value?.error)
		}

		participant.value = _participantData.value?.data
	} catch (err) {
		console.error("Error while loading participant details.")

		errorMessage.value = err.message

		setTimeout(() => {
			errorMessage.value = ""
		}, 3000)
	}


</script>
