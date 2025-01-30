<template>
	<Dialog
		:dialogId="`delete-score-${scoreData.participant_id}`"
		:dialogTitle="`Delete ${scoreData.participant_name}'s Scores`"
		openButtonStyle="btn-sm text-secondary"
		ref="deleteScoresRef">
		<template #ButtonLabel>
			<i class="bi bi-trash-fill" style="font-size: 0.5rem" />
		</template>

		<template #Body>
			<p class="text-start">
				<b>This action will permanently delete the scores.</b>
				<br />
				Are you sure you want to delete this?
			</p>
		</template>

		<template #Submit>
			<button
				:id="`delete-score-form-${scoreData.participant_id}`"
				@click="OnDeleteScores"
				type="button"
				class="btn btn-danger hstack gap-3"
				:disabled="isLoading">
				<span
					v-if="isLoading"
					class="spinner-border spinner-border-sm"
					aria-hidden="true"></span>
				<i v-else class="bi bi-trash-fill"></i>
				<span role="status">Delete scores</span>
			</button>
		</template>
	</Dialog>
</template>

<script setup>
   let deleteScoresRef = ref(null);
   const props = defineProps({
      score: {
         type: Object,
         required: true,
      },
   });

   const emit = defineEmits(["onDelete"])

   const scoreData = toRef(props, "score");
   const isLoading = ref(false)
   const errorMessage = ref("");

   const {
      data: _scoreData,
      execute: DeleteScores,
   } = await useFetch(`/api/event-results/${scoreData.value?.participant_id}`, {
      method: "DELETE",
      immediate: false,
      watch: false,
   });

   const OnDeleteScores = async () => {
      isLoading.value = true;
      try {
         await DeleteScores();

         if (_scoreData.value?.error) {
            throw new Error(_scoreData.value?.error);
         }
         emit("onDelete")
         deleteScoresRef.value.closeDialog();
      } catch (error) {
         errorMessage.value = error.message;

         setTimeout(() => {
            errorMessage.value = "";
         }, 3000);
      } finally {
         isLoading.value = false;
      }
   };
</script>
