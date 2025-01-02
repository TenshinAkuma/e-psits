<template>
	<Dialog
		dialogId="evaluateParticipant"
		dialogTitle="Evaluate Participant"
		openButtonStyle="btn btn-outline-dark fw-bold"
		ref="evaluateParticipantRef">
		<template #ButtonLabel>
			<i class="bi bi-plus-lg" /> Evaluate participant
		</template>

		<template #Body>
			<div class="text-start">
				<p class="text-dark lh-sm">
					Provide scores based on the evaluation criteria to
					assess the participant’s achievement.
				</p>
				<form id="evaluateParticipant">
					<select class="form-select border-secondary mb-2" required>
						<option value="" selected hidden>
							Choose participant
						</option>
						<option
							v-for="participant in participants"
							:key="participant.id"
							:value="participant.id">
							{{
								`${participant.participants.first_name} ${participant.participants.last_name}`
							}}
						</option>
					</select>
					<p
						class="text-secondary lh-sm"
						style="font-size: 0.8rem">
						Only registered participants can be evaluated.
					</p>

					<hr>
					<p class="fw-bold mb-1">Evaluation Form</p>
					<p
						class="text-secondary lh-sm"
						style="font-size: 0.8rem">
						Enter a score between 0 and 100. Ensure the score
						reflects the participant’s performance for the
						given criterion.
					</p>

					<div v-for="criterion in eventCriteria" :key="criterion.id" class="mb-3">
						<label class="mb-1 fs-7" data-bs-toggle="tooltip" data-bs-title="Default tooltip" style="cursor: pointer;">{{ criterion.name }}</label>
						<div class="input-group">
							<span class="input-group-text border-secondary bg-secondary bg-opacity-10">{{ `${criterion.rating}%` }}</span>
							<input
								type="number"
								class="form-control border-secondary" placeholder="Score" required/>
						</div>
					</div>
				</form>
			</div>
		</template>

		<template #Submit>
			<button
				type="button"
				form="evaluateParticipant"
				class="btn btn-primary px-5">
				Submit score
			</button>
		</template>
	</Dialog>
</template>

<script setup>
	const evaluateParticipantRef = ref(null);
	const registeredParticipants = useParticipantRegistrations();
	const eventCriteria = useEventCriteria();

	const eventScore = ref({
		registration_id: null,
	});

	const participants = computed(() => {
		return registeredParticipants.value?.filter(
			(participant) =>
				participant.registration_status.toLowerCase() ===
				"registered"
		);
	});
</script>
