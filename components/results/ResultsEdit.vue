<template>
	<Dialog
		:dialogId="`editResult-${score.score_id}`"
		dialogTitle="Edit Participant Evaluation"
		openButtonStyle="btn-sm text-secondary">
		<template #ButtonLabel>
			<i class="bi bi-pencil-fill" style="font-size: 0.5rem" />
		</template>

		<template #Body>
			<p class="text-start text-dark lh-sm fs-6">
				Update <b>{{ `${getParticipantName}'s` }}</b> score on
				<b>{{ `${eventScore.event_criteria.name}.` }}</b>
			</p>
			<form :id="`editResultForm-${score.score_id}`">
				<div class="hstack gap-2">
					<div class="input-group">
						<span
							class="input-group-text border-secondary bg-secondary bg-opacity-10">
							{{ `${eventScore.event_criteria.rating}%` }}
						</span>
						<input
							type="number"
							class="form-control border-secondary"
							placeholder="Score"
							v-model="evaluationEdit.score"
							min="0"
							max="100"
							required />
					</div>
				</div>
			</form>
		</template>

		<template #Submit>
			<button
				type="submit"
				:form="`editResultForm-${score.score_id}`"
				class="btn btn-success px-5">
				Save
			</button>
		</template>
	</Dialog>
</template>

<script setup>
   const props = defineProps({
      score: Object,
   });

   const evaluationEdit = ref({
      score: props.score.score,
      score_id: props.score.score_id,
   });

   const eventScores = useEventScores();
   const participantsRegistrations = useParticipantRegistrations();

   const eventScore = computed(() => {
      return eventScores.value?.find((e) => e.id == props.score?.score_id);
   });

   const getParticipantName = computed(() => {
      const registration_id = eventScore.value?.registration_id;

      const participant = participantsRegistrations.value?.find(
         (p) => p.id == registration_id
      );

      return `${participant.participants.first_name} ${participant.participants.last_name}`;
   });
</script>

<style></style>
