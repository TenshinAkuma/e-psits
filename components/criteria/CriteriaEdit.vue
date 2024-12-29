<template>
	<div>
		<Dialog
			:dialogId="`editCriteria-${criteria.id}`"
			dialogTitle="Edit Criteria"
			ref="editCriteriaDialog">
			<template #ButtonLabel>
				<i
					class="bi bi-pencil-fill text-secondary"
					style="font-size: 0.8rem" />
			</template>

			<template #Body>
				<form
					:id="`editCriteriaForm-${criteria.id}`"
					@submit.prevent="OnSaveCriteriaUpdate">
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

					<div
						v-if="errorMessage != ''"
						class="fs-7 text-center text-danger">
						{{ errorMessage }}
					</div>
					{{ criteria }}
				</form>
			</template>

			<template #Submit>
				<button
					type="submit"
					:form="`editCriteriaForm-${criteria.id}`"
					class="btn btn-success px-5 hstack gap-2"
					:disabled="_criteriaStatus === 'pending'">
					<span
						v-if="_criteriaStatus === 'pending'"
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
		criteria: Object,
	});

	const eventCriteria = useEventCriteria();
	const eventID = useRoute().params.eventID;
	const editCriteriaDialog = ref(null);
	const errorMessage = ref("");

	const newCriteria = ref({
		name: props.criteria?.name,
		description: props.criteria?.description,
		rating: props.criteria?.rating,
	});

	const {
		data: _criteria,
		status: _criteriaStatus,
		execute: SaveCriteria,
	} = await useFetch(
		`/api/events/${eventID}/criteria/${props.criteria?.id}`,
		{
			method: "PATCH",
			body: newCriteria,
			immediate: false,
			watch: false,
		}
	);

	const OnSaveCriteriaUpdate = async () => {
		await SaveCriteria();
		if (_criteria.value.error) {
			errorMessage.value = _criteria.value.error;
			console.log(errorMessage.value);
			setTimeout(() => {
				errorMessage.value = "";
			}, 3000);
			return;
		}

		const criteriaIndex = eventCriteria.value?.findIndex(
			(c) => c.id === props.criteria?.id
		);

		if (criteriaIndex < 0) {
			errorMessage.value = "Could not find criteria.";

			setTimeout(() => {
				errorMessage.value = "";
			}, 3000);
			return;
		}

		eventCriteria.value[criteriaIndex] = _criteria.value?.data;
		editCriteriaDialog.value.closeDialog();
	};

	const maxRating = computed(() => {
		if (eventCriteria.value.length == 0 || eventCriteria.value == null) {
			return 0;
		}

		return (
			100 -
			eventCriteria.value?.reduce(
				(total, criteria) => total + criteria.rating,
				0
			)
		);
	});
</script>
