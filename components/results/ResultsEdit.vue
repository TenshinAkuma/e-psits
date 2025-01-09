<template>
	<Dialog
		:dialogId="`editResult-${scoreData.score_id}`"
		dialogTitle="Edit Participant Evaluation"
		openButtonStyle="btn-sm text-secondary"
      ref="editScoresRef">
		<template #ButtonLabel>
			<i class="bi bi-pencil-fill" style="font-size: 0.5rem" />
		</template>

		<template #Body>
			<p class="text-start text-dark lh-sm">
				Update <b>{{ `${getParticipantName}'s` }}</b> score on
				<b>{{ `${eventScore.event_criteria.name}.` }}</b>
			</p>
			<form :id="`editResultForm-${scoreData.score_id}`" class="mb-3" @submit.prevent="OnSaveEvaluationEdit">
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
         {{ evaluationEdit.score }}
         <p class="fs-7 text-danger text-center m-0">
				{{ errorMessage }} 
			</p>
		</template>

		<template #Submit>
			<button
				type="submit"
				:form="`editResultForm-${scoreData.score_id}`"
				class="btn btn-success hstack gap-2 px-5"
            :disabled="_scoreStatus === 'pending'">
				<span
					v-if="_scoreStatus === 'pending'"
					class="spinner-border spinner-border-sm"
					aria-hidden="true" />
				<span role="status">Save evaluation</span>
			</button>
		</template>
	</Dialog>
</template>

<script setup>
   const props = defineProps({
      scoreData: Object,
   });

   const score_data = toRef(() => props.scoreData)

   const evaluationEdit = ref({
      // score: toRef(() => props.scoreData.score)
      score: props.scoreData.score
   });


   const editScoresRef = ref(null)
   const eventScores = useEventScores();
   const participantsRegistrations = useParticipantRegistrations();
   const errorMessage = ref("")

   const eventScore = computed(() => {
      return eventScores.value?.find((e) => e.id == score_data.value?.score_id);
   });

   const getParticipantName = computed(() => {
      const registration_id = eventScore.value?.registration_id;

      const participant = participantsRegistrations.value?.find(
         (p) => p.id == registration_id
      );

      return `${participant.participants.first_name} ${participant.participants.last_name}`;
   });

   const {
      data: _scoreData,
      status: _scoreStatus,
      execute: SaveEvaluationEdit,
   } = await useFetch(`/api/event-results/${score_data.value?.score_id}`, {
      method: "PATCH",
      body: evaluationEdit,
      immediate: false,
      watch: false,
   });

   const OnSaveEvaluationEdit = async () => {
      try {
         await SaveEvaluationEdit();

         if (_scoreData.value?.error) {
            throw new Error(_scoreData.value?.error);
         }

         const scoreIndex = eventScores.value?.findIndex(
            (s) => s.id == score_data.value?.score_id
         );

         if (scoreIndex < 0 || scoreIndex == null) {
            throw new Error("Score data does not exists.")
         }

         eventScores.value[scoreIndex] = _scoreData.value?.data;
         console.log(eventScores.value[scoreIndex])
         editScoresRef.value?.closeDialog();
      } catch (err) {
         console.error(err);

         errorMessage.value = err.message;
         setTimeout(() => {
            errorMessage.value = "";
         }, 3000);
      }
   };
</script>

<style></style>
