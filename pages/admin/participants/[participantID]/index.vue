<template>
	<div>
		<div v-if="status === 'success'">
			<div class="d-flex align-items-center gap-3">
				<div
					class="ratio ratio-1x1 border rounded-circle border overflow-hidden"
					style="width: 144px">
					<img
						src="public\img\undraw_wait_in_line_o2aq.svg"
						alt="profile_image"
						class="h-100 w-100" />
				</div>
				<ParticipantsEditsNameStatus
					:ParticipantName="participant.name"
					:ParticipantStatus="participant.registration_status"
					:ParticipantEvent="participant.events.title"
					:ParticipantEventId="participant.event_id" />
			</div>

			<hr />
			<div class="row">
				<div class="col-4">
					<p class="fw-bold">PERSONAL INFORMATION</p>

					<ParticipantsEditsDob
						:ParticipantDob="participant.dob" />

					<ParticipantsEditsAddress
						:ParticipantAddress="participant.address" />

					<hr />
					<p class="fw-bold">CONTACT INFORMATION</p>

					<ParticipantsEditsEmail
						:ParticipantEmail="participant.email" />

					<ParticipantsEditsPhoneNumber
						:ParticipantPhoneNumber="
							participant.phone_number
						" />
					<hr />

					<p class="fw-bold">ACADEMIC INFORMATION</p>
					<div class="fw-bold text-secondary">School</div>
					<p class="text-dark">
						{{ participant.school }}
					</p>
					<div class="fw-bold text-secondary">
						Year level & Course
					</div>
					<p class="text-dark">
						{{ `${participant.year}, ${participant.course}` }}
					</p>
				</div>
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
