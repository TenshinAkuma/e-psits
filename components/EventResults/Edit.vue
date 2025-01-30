<template>
  <Dialog
    :dialogId="`edit-result-${scoreData.id}`"
    :dialogTitle="`Edit ${scoreData.participant_name}'s score on ${scoreData.name}`"
    openButtonStyle="btn-link"
    ref="editScoresRef"
  >
    <template #ButtonLabel>
      {{ `${scoreData.points}` }}
    </template>

    <template #Body>
      <form
        :id="`edit-result-form-${scoreData.id}`"
        class="text-start fs-6"
        @submit.prevent="OnSaveEvaluationEdit"
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
              {{ `${scoreData.rating}%` }}
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
        :form="`edit-result-form-${scoreData.id}`"
        class="btn btn-success hstack gap-2"
        :disabled="isLoading"
      >
        <span
          v-if="isLoading"
          class="spinner-border spinner-border-sm"
          aria-hidden="true"
        />
        <span role="status">Save edit</span>
      </button>
    </template>
  </Dialog>
</template>

<script setup>
	let editScoresRef = ref(null);
	const props = defineProps({
		score: {
			type: Object,
			required: true
		},
	});

	const emit = defineEmits(["onEdit"]);

	const scoreData = toRef(props, "score");
	const points = ref();
	const isLoading = ref(false);
	const errorMessage = ref("");

	const result = ref({
		score: scoreData.value?.score,
	});

	const { data: _scoreData, execute: SaveEvaluationEdit } = await useFetch(
		`/api/event-results/${scoreData.value?.id}`,
		{
			method: "PATCH",
			body: result,
			immediate: false,
			watch: false,
		}
	);

	const OnSaveEvaluationEdit = async () => {
		isLoading.value = true;
		try {
			await SaveEvaluationEdit();

			if (_scoreData.value?.error) {
				throw new Error(_scoreData.value?.error);
			}

			emit("onEdit");
			editScoresRef.value?.closeDialog();
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

	const GetPoints = () => parseFloat((result.value?.score * (scoreData.value?.rating / 100)).toFixed(2));
</script>

<style></style>
