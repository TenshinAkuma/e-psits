<template>
	<Dialog
		:dialogId="`deleteResult-${registrationId}`"
		dialogTitle="Remove Participant Evaluation"
		openButtonStyle="btn-sm text-secondary"
		ref="deleteEvaluationRef">
		<template #ButtonLabel>
			<i class="bi bi-trash-fill" style="font-size: 0.5rem" />
		</template>

		<template #Body>
			<p>
				<b>This action will permanently delete the scores.</b>
				<br />
				Are you sure you want to delete this?
			</p>
		</template>

		<template #Submit>
			<button
				@click="OnDeleteEvaluation"
				type="button"
				class="btn btn-danger hstack gap-2 px-5"
				:disabled="_scoreStatus === 'pending'">
				<span
					v-if="_scoreStatus === 'pending'"
					class="spinner-border spinner-border-sm"
					aria-hidden="true" />
				<span role="status">Remove evaluation</span>
			</button>
		</template>
	</Dialog>
</template>

<script setup>
   const props = defineProps({
      registrationId: Number,
   });

   const deleteEvaluationRef = ref(null);
   const eventScores = useEventScores();
   const errorMessage = ref("");

   const {
      data: _scoreData,
      status: _scoreStatus,
      execute: DeleteEvaluation,
   } = await useFetch(`/api/event-results/${props?.registrationId}`, {
      method: "DELETE",
      immediate: false,
      watch: false,
   });

   const OnDeleteEvaluation = async () => {
      try {
         await DeleteEvaluation();

         if (_scoreData.value?.error) {
            throw new Error(_scoreData.value?.error);
         }

         const remainingScores = eventScores.value?.filter(
            (item) => item.registration_id != props.registrationId
         );
         eventScores.value = remainingScores;
         deleteEvaluationRef.value.closeDialog();

      } catch (error) {
         errorMessage.value = error.message;

         setTimeout(() => {
            errorMessage.value = "";
         }, 3000);
      }
   };
</script>

<style></style>
s
