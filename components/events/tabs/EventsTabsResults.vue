<template>
	<div>
		<div class="mb-3">
			<ResultsCreate />
		</div>
		<div class="table-responsive">
			<table class="table table-borderless align-middle">
				<thead>
					<tr>
						<th scope="col">Participant</th>
						<th v-for="criterion in eventCriteria" :key="criterion.id" scope="col" class="text-center">{{ criterion.name }}</th>
						<th scope="col">Total</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="participant in registeredParticipants" :key="participant.id">
						<td>{{ `${participant.participants.first_name} ${participant.participants.last_name}` }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup>
	const eventCriteria = useEventCriteria();
	const eventParticipants = useParticipantRegistrations();

	const registeredParticipants = eventParticipants.value.filter(
		(participant) => participant.registration_status.toLowerCase() === "registered"
	);

</script>
