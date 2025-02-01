<template>
	<Dialog
		:dialogId="`edit-result-${scoreData.id}`"
		:dialogTitle="`Edit ${GetFullname()}'s Scores`"
		ref="editScoresRef">
		<template #ButtonLabel>
			<i class="bi bi-pencil-fill text-secondary fs-7" />
		</template>

		<template #Body>
			<form
				:id="`edit-result-form-${scoreData.id}`"
				class="text-start fs-6"
				@submit.prevent="OnSaveEvaluationEdit">
        <p class="fw-bold mb-1">Evaluation Form</p>
          <p class="text-secondary lh-sm" style="font-size: 0.8rem">
            Enter a score between 0 and 100. Ensure the score reflects the
            participant’s performance for the given criterion.
          </p>
				<div
					v-for="score in scoreData.event_scores"
					:key="score.id"
					class="mb-3">
					<label class="mb-1 fw-bold">{{
						score.event_criteria.name
					}}</label>
					<div class="hstack gap-2">
						<div class="input-group">
							<input
								type="number"
								class="form-control border-secondary"
								:placeholder="score.score"
								v-model="resultEdit[score.id]"
								min="0"
								max="100"
								required />
							<span
								class="input-group-text border-secondary bg-secondary bg-opacity-10"
								>{{
									`${score.event_criteria.rating}%`
								}}</span
							>
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
				class="btn btn-success hstack gap-3"
				:disabled="isLoading">
				<span
					v-if="isLoading"
					class="spinner-border spinner-border-sm"
					aria-hidden="true"></span>
				<i v-else class="bi bi-floppy2-fill" />
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
			required: true,
		},
	});

	const emit = defineEmits(["onEdit"]);

	const scoreData = toRef(props, "score");
	const isLoading = ref(false);
	const errorMessage = ref("");

	const resultEdit = ref({});

	const payload = computed(() => {
		return Object.entries(resultEdit.value).map(([score_id, score]) => ({
			id: Number(score_id), // Convert key to number if necessary
			score,
		}));
	});

	const OnSaveEvaluationEdit = async () => {
		isLoading.value = true;
		try {
			const { data: _scoreData, error } = await $fetch(
				`/api/event-results/${scoreData.value?.id}`,
				{
					method: "PUT",
					body: payload.value,
				}
			);

			if (error) {
				throw new Error(error);
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

	const GetFullname = () =>
		`${scoreData.value?.participants.first_name} ${scoreData.value?.participants.last_name}`;

	// const GetPoints = () =>
	// 	parseFloat(
	// 		(
	// 			result.value?.score *
	// 			(scoreData.value?.event_criteria.rating / 100)
	// 		).toFixed(2)
	//   );
</script>

<style></style>
