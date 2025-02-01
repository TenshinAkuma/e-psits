<template>
	<Dialog
		:dialogId="`edit-criteria-${criteria.id}`"
		dialogTitle="Edit Criteria"
		ref="editCriteriaRef">
		<template #ButtonLabel>
			<i class="bi bi-pencil-fill text-secondary fs-7" />
		</template>

		<template #Body>
			<p
				class="bg-warning bg-opacity-10 fs-7 text-center text-warning border border-warning rounded-3 p-2">
				<i
					class="bi bi-exclamation-circle-fill text-warning me-2" />
				<b>WARNING!</b>
				Updating event criteria will reset all event results.
			</p>
			<form
				:id="`edit-criteria-form-${criteria.id}`"
				@submit.prevent="OnSaveCriteriaEdit">
				<label class="mb-1">Name</label>
				<input
					type="text"
					class="form-control border-secondary mb-3"
					placeholder="Name"
					required
					v-model="newCriteria.name" />

				<label class="mb-1">Description</label>
				<textarea
					class="form-control border-secondary mb-3"
					placeholder="Description"
					rows="3"
					style="resize: vertical; max-height: 216px"
					required
					v-model="newCriteria.description" />
				<hr />

				<p class="fw-bold text-secondary mb-1">Rating percentage</p>
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

				<p class="text-secondary lh-sm" style="font-size: 0.8rem">
					Specify the weight of this criterion in percentage (%).
					This value determines how much this criterion
					contributes to the overall score.
					<b
						>Ensure the total weight of all criteria adds up
						to 100% for accurate scoring.</b
					>
				</p>

				<div
					v-if="errorMessage"
					class="fs-7 text-center text-danger">
					Internal server error. Please try again later.
				</div>
			</form>
		</template>

		<template #Submit>
			<button
				type="submit"
				:form="`edit-criteria-form-${criteria.id}`"
				class="btn btn-success hstack gap-3"
				:disabled="isLoading">
				<span
					v-if="isLoading"
					class="spinner-border spinner-border-sm"
					aria-hidden="true"></span>
				<i v-else class="bi bi-floppy2-fill"></i>
				<span role="status">Save edit</span>
			</button>
		</template>
	</Dialog>
</template>

<script setup>
	let editCriteriaRef = ref(null);

	const props = defineProps({
		criteria: {
			type: Object,
			required: true,
		},
	});

	const emit = defineEmits(["onEdit"]);

	const eventId = useRoute().params.eventId;
	const criteriaData = toRef(props, "criteria");
	const maxRating = ref();
	const isLoading = ref(false);
	const errorMessage = ref("");

	const newCriteria = ref({
		name: criteriaData.value?.name,
		description: criteriaData.value?.description,
		rating: criteriaData.value?.rating,
	});

	const { data: _criteria, execute: SaveCriteriaEdit } = await useFetch(
		`/api/event-criteria/${criteriaData.value?.id}`,
		{
			method: "PATCH",
			body: newCriteria,
			immediate: false,
			watch: false,
		}
	);

	const OnSaveCriteriaEdit = async () => {
		isLoading.value = true;
		try {
			await SaveCriteriaEdit();
			if (_criteria.value.error) {
				throw new Error(_criteria.value?.error);
			}

			emit("onEdit");
			editCriteriaRef.value.closeDialog();
		} catch (err) {
			errorMessage.value = err.message;
			setTimeout(() => {
				errorMessage.value = "";
			}, 3000);
		} finally {
			isLoading.value = false;
		}
	};

	const GetMaxRating = async () => {
		try {
			const { data: _maxRating, error } = await $fetch(
				`/api/event-criteria/max-rating`,
				{
					method: "GET",
					query: {
						eventId: eventId,
					},
				}
			);

			if (error) {
				throw new Error(error);
			}

			maxRating.value = _maxRating + criteriaData.value?.rating;
		} catch (err) {
			errorMessage.value = err.message;

			setTimeout(() => {
				errorMessage.value = "";
			}, 3000);
		}
	};

	await GetMaxRating();
</script>
