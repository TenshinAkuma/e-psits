<template>
	<div>
		<Dialog
			id="editCriteria"
			dialogTitle="Edit Criteria"
			ref="editCriteriaDialog">
			<template #ButtonLabel>
				<i
					class="bi bi-pencil-fill text-secondary"
					style="font-size: 0.8rem" />
			</template>

			<template #Body>
				<form id="editCriteriaForm" @submit="OnSaveCriteriaUpdate">
					<input
						type="text"
						class="form-control border-secondary mb-3"
						placeholder="Name"
						required
						v-model="newCriteria.name" />

					<textarea
						class="form-control border-secondary mb-3"
						placeholder="Description"
						rows="3"
						style="resize: vertical; max-height: 216px"
						required
						v-model="newCriteria.description" />
					<hr />

					<p class="fw-bold text-secondary mb-1">
						Rating percentage
					</p>
					<div class="input-group mb-2">
						<input
							type="number"
							class="form-control border-secondary"
							placeholder="Rating"
							:max="maxRating"
							min="0"
							step="5"
							required
							v-model="newCriteria.rating" />
						<span
							class="input-group-text bg-secondary bg-opacity-25 rounded-end border-secondary">
							<i class="bi bi-percent" />
						</span>
					</div>

					<p
						class="text-secondary lh-sm"
						style="font-size: 0.8rem">
						Specify the weight of this criterion in percentage
						(%). This value determines how much this criterion
						contributes to the overall score.
						<b
							>Ensure the total weight of all criteria adds
							up to 100% for accurate scoring.</b
						>
					</p>
				</form>
			</template>

			<template #Submit>
				<button
					type="submit"
					form="editCriteriaForm"
					class="btn btn-success px-5 hstack gap-2"
					:disabled="saveCriteriaStatus === 'pending'">
					<span
						v-if="saveCriteriaStatus === 'pending'"
						class="spinner-border spinner-border-sm"
						aria-hidden="true" />
					<span>Save</span>
				</button>
			</template>
		</Dialog>
	</div>
</template>

<script setup>
	const props = defineProps({
		criteriaId: Number,
	});
	const eventID = useRoute().params.eventID;
	const editCriteriaDialog = ref(null);

	const { data: criteriaData, status: GetCriteria } = await useFetch(
		`/api/events/${eventID}/criteria/${props.criteriaId}`,
		{
			method: "GET",
		}
	);

	const newCriteria = ref({
		name: criteriaData.value.criteria.name,
		description: criteriaData.value.criteria.description,
		rating: criteriaData.value.criteria.rating,
	});

	const {
		data: saveCriteriaData,
		status: saveCriteriaStatus,
		execute: SaveCriteria,
	} = await useFetch(`/api/events/${eventID}/criteria/${props.criteriaId}`, {
		method: "PATCH",
		body: newCriteria,
		immediate: false,
		watch: false,
	});

	const OnSaveCriteriaUpdate = async () => {
		try {
			await SaveCriteria();
			if (!saveCriteriaData.value.success) {
				throw new Error(saveCriteriaData.value.message);
			}
			editCriteriaDialog.value.closeDialog();
		} catch (err) {
			console.error(
				"Error occurred while updating criteria",
				err.value
			);
		}
	};

	const { data: weightData } = await useFetch(
		`/api/events/${eventID}/criteria/weight`,
		{
			method: "GET",
		}
	);

	const maxRating = computed(() => {
		if (weightData.value) {
			return 100 - weightData.value.totalRating;
		}
		return 100;
	});
</script>
