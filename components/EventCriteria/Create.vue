<template>
	<Dialog
		:dialogId="`create-criteria-${eventId}`"
		dialogTitle="Add New Criteria"
		openButtonStyle="btn-outline-dark fw-bold"
		ref="createCriteriaRef">
		<template #ButtonLabel>
			<i class="bi bi-plus" /> Add new criteria
		</template>

		<template #Body>
			<form :id="`create-criteria-form-${eventId}`"
			@submit.prevent="OnAddCriteria">
				<p class="text-secondary lh-sm">
					Define the criteria that will be used to evaluate
					participants during the event. Please provide clear
					details to ensure accurate assessments.
				</p>
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
					<b>
						Ensure the total weight of all criteria adds up to
						100% for accurate scoring.
					</b>
				</p>
				<div v-if="errorMessage" class="text-danger fs-7 text-center">
					Internal server error. Please try again later.
				</div>
			</form>
		</template>

		<template #Submit>
			<button
				type="submit"
				:form="`create-criteria-form-${eventId}`"
				class="btn btn-primary hstack gap-3"
				:disabled="isLoading">
				<span
					v-if="isLoading"
					class="spinner-border spinner-border-sm"
					aria-hidden="true" />
				<span role="status">Add criteria</span>
			</button>
		</template>
	</Dialog>
</template>

<script setup>
	let createCriteriaRef = ref(null);

	const emit = defineEmits(["onCreate"]);

	const eventId = useRoute().params.eventId;
	const maxRating = ref();
	const isLoading = ref(false);
	const errorMessage = ref("");

	const newCriteria = ref({
		name: "",
		description: "",
		rating: 0,
		event_id: eventId,
	});

	const { data: _criteria, execute: AddCriteria } = await useFetch(
		`/api/event-criteria`,
		{
			method: "POST",
			body: newCriteria,
			immediate: false,
			watch: false,
		}
	);

	const OnAddCriteria = async () => {
		isLoading.value = true;
		try {
			await AddCriteria();

			if (_criteria.value?.error) {
				throw new Error(_criteria.value?.error);
			}

			emit("onCreate");
			resetInput();
			createCriteriaRef.value.closeDialog();
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
						eventId: eventId
					}
				}
			);

			if (error) {
				throw new Error(error);
			}

			maxRating.value = _maxRating;
		} catch (err) {
			errorMessage.value = err.message;

			setTimeout(() => {
				errorMessage.value = "";
			}, 3000);
		}
	};

	await GetMaxRating();

	const resetInput = () => {
		newCriteria.value.name = "";
		newCriteria.value.description = "";
		newCriteria.value.rating = 0;
	};
</script>
