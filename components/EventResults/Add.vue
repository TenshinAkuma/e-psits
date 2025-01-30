<template>
   <Dialog
     :dialogId="`add-result-${scoreData.participant_id}-${scoreData.event_id}-${criteriaData.id}`"
     :dialogTitle="`Edit ${scoreData.participant_name}'s score on ${scoreData.name}`"
     openButtonStyle="btn text-secondary"
     ref="addScoreRef"
   >
     <template #ButtonLabel>
      <i class="bi bi-plus-square"></i>
     </template>
 
     <template #Body>
       <form
         :id="`edit-result-form-${scoreData.participant_id}-${scoreData.event_id}-${criteriaData.id}`"
         class="text-start fs-6"
         @submit.prevent="OnAddScore"
       >
         <div class="d-flex align-items-center gap-3">
           <input
             type="number"
             class="form-control border-secondary"
             placeholder="Score"
             min="0"
             max="100"
             v-model="result.score"
             required
           />
           <span>
             <i class="bi bi-arrow-right" />
           </span>
           <div class="d-flex gap-2">
             <div class="input-group-text border-secondary fw-bold" style="width: 114px;">
               {{ `${GetPoints()} pts` }}
             </div>
             <div
               class="input-group-text border-secondary bg-secondary bg-opacity-10"
             >
               {{ `${criteriaData.rating}%` }}
             </div>
           </div>
         </div>
       </form>
       <p class="fs-7 text-danger text-center m-0">
         {{ errorMessage }}
       </p>
     </template>
 
     <template #Submit>
       <button
         type="submit"
         :form="`edit-result-form-${scoreData.participant_id}-${scoreData.event_id}-${criteriaData.id}`"
         class="btn btn-success hstack gap-2"
         :disabled="isLoading"
       >
         <span
           v-if="isLoading"
           class="spinner-border spinner-border-sm"
           aria-hidden="true"
         />
         <span role="status">Add score</span>
       </button>
     </template>
   </Dialog>
 </template>
 
 <script setup>
   let addScoreRef = ref(null);
   const props = defineProps({
      score: {
         type: Object,
         required: true
      },
      criteria: {
         type: Object,
         required: true,
      }
   });

   const emit = defineEmits(["onAdd"]);

   const scoreData = toRef(props, "score");
   const criteriaData = toRef(props, "criteria");
   const points = ref();
   const isLoading = ref(false);
   const errorMessage = ref("");

   const result = ref({
      participant_id: scoreData.value?.participant_id,
      event_id: scoreData.value?.event_id,
      criteria_id: criteriaData.value?.id,
      score: 0,
   });

   const { data: _scoreData, execute: AddScore } = await useFetch(
      `/api/event-results/add`,
      {
         method: "POST",
         body: result,
         immediate: false,
         watch: false,
      }
   );

   const OnAddScore = async () => {
      isLoading.value = true;
      try {
         await AddScore();

         if (_scoreData.value?.error) {
            throw new Error(_scoreData.value?.error);
         }

         emit("onAdd");
         addScoreRef.value?.closeDialog();
      } catch (err) {
         console.error(err);

         errorMessage.value = err.message;
         setTimeout(() => {
            errorMessage.value = "";
         }, 3000);
      } finally {
         isLoading.value = false;
      }
   };

   const GetPoints = () => {
      if (!result.value?.score) {
         return 0;
      }

      return parseFloat((result.value?.score * (criteriaData.value?.rating / 100)).toFixed(2));
   }
</script>
 