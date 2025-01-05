<template>
	<Dialog :dialogId="`editResult-${registrationId}`" dialogTitle="Remove Participant Evaluation" openButtonStyle="btn-sm text-secondary">
      <template #ButtonLabel>
         <i class="bi bi-trash-fill" style="font-size: .5rem;"/>
      </template>

      <template #Body>
         <p>{{ participant }}</p>
         <form>
            <div
					v-for="criterion in eventCriteria"
					:key="criterion.id"
					class="mb-3">
					<label class="mb-1 fs-7">{{ criterion.name }}</label>
					<div class="hstack gap-2">
						<div class="input-group">
							<span
								class="input-group-text border-secondary bg-secondary bg-opacity-10"
								>{{ `${criterion.rating}%` }}</span
							>
							<input
								type="number"
								class="form-control border-secondary"
								placeholder="Score"
								v-model="evaluationEdit.scores[criterion.id]"
								min="0"
								max="100"
								required />
						</div>
					</div>
				</div>
         </form>
         {{ scores }}
      </template>
   </Dialog>
</template>

<script setup>
   const props = defineProps({
      registrationId: Number,
   });

   const evaluationEdit = ref({
      scores: {},
      registration_id: props.registrationId
   })

   const eventScores = useEventScores();
   const participantsRegistrations = useParticipantRegistrations()
   const eventCriteria = useEventCriteria()

   const participant = computed(() => {
      return participantsRegistrations.value?.find(
         (participant) =>
            participant.id == props.registrationId
      );
   })

   const scores = computed(() => {
      return eventScores.value?.filter((score) => score.registration_id == props.registrationId)
   })
</script>

<style></style>
