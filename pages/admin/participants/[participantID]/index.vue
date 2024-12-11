<template>
	<div>
		<div v-if="status === 'success'" class="row">
			<div class="col-4">
				<div
					class="ratio ratio-1x1 border rounded-circle border overflow-hidden mx-auto mb-2"
					style="width: 144px">
					<img
						src="https://avatar.iran.liara.run/public/28"
						alt="profile_image"
						class="h-100 w-100" />
				</div>
				<ParticipantsEditsNameStatus
					:ParticipantName="participant.name" />

				<hr />
				<p class="fw-bold">Personal Information</p>

				<ParticipantsEditsDob :ParticipantDob="participant.dob" />

				<ParticipantsEditsAddress
					:ParticipantAddress="participant.address" />

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

				<ParticipantsEditsYearCourse
					:ParticipantYear="participant.year"
					:ParticipantCourse="participant.course" />
			</div>
		</div>

		<div v-else>
			<div class="spinner-border" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
		</div>
	</div>
</template>

<script setup>
	definePageMeta({
		layout: "main",
	});

	const participantID = useRoute().params.participantID;

	const { data: participant, status } = useFetch(
		`/api/participants/${participantID}`,
		{
			headers: useRequestHeaders(["cookie"]),
			method: "GET",
		}
	);
</script>
