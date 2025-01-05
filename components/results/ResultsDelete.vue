<template>
	<Dialog :dialogId="`deleteResult-${registrationId}`" dialogTitle="Remove Participant Evaluation" openButtonStyle="btn-sm text-secondary">
      <template #ButtonLabel>
         <i class="bi bi-trash-fill" style="font-size: .5rem;"/>
      </template>

      <template #Body>
         <b>This action will permanently delete the scores.</b> <br />
				Are you sure you want to delete this?
            {{ scores }}
      </template>

      <template #Submit>
         <button class="btn btn-danger">Remove evaluation</button>
      </template>
   </Dialog>
</template>

<script setup>
   const props = defineProps({
      registrationId: Number,
   });

   const eventScores = useEventScores()

   const scores = computed(() => {
      return eventScores.value?.filter((score) => score.registration_id == props.registrationId)
   })
</script>

<style></style>
