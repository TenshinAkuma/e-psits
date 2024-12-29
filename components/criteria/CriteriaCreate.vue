<template>
	<Dialog
		dialogId="createCriteria"
		dialogTitle="Add New Criteria"
		openButtonStyle="btn-outline-dark fw-bold"
		ref="createCriteriaRef">
		<template #ButtonLabel>
			<i class="bi bi-plus" /> Add new criteria
		</template>

		<template #Body>
			<p class="text-secondary lh-sm">
				Define the criteria that will be used to evaluate
				participants during the event. Please provide clear details
				to ensure accurate assessments.
			</p>
			<form @submit.prevent="OnAddCriteria" id="AddNewCriteria">
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
			</form>
		</template>

		<template #Submit>
			<button
				type="submit"
				form="AddNewCriteria"
				class="d-flex align-items-center btn btn-primary gap-2"
				:disabled="status === 'pending'">
				<span
					v-if="status === 'pending'"
					class="spinner-border spinner-border-sm"
					aria-hidden="true" />
				<span role="status">Add criteria</span>
			</button>
		</template>
	</Dialog>
</template>

<script setup>
	const createCriteriaRef = ref(null);

	const eventCriteria = useEventCriteria();
	const eventID = useRoute().params.eventID;
	const errorMessage = ref("");

	const newCriteria = ref({
		name: "",
		description: "",
		rating: 0,
		event_id: eventID,
	});

	const {
		data: _criteria,
		status,
		execute: AddCriteria,
	} = await useFetch(`/api/events/${eventID}/criteria`, {
		method: "POST",
		body: newCriteria,
		immediate: false,
		watch: false,
	});

	const OnAddCriteria = async () => {
		await AddCriteria();
		if (_criteria.value?.error) {
			errorMessage.value = _criteria.value?.error;

			setTimeout(() => {
				errorMessage.value = "";
			}, 3000);

			return;
		}

		eventCriteria.value?.push(_criteria.value.data);
		resetInput();
		createCriteriaRef.value.closeDialog();
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

	const resetInput = () => {
		newCriteria.value.name = "";
		newCriteria.value.description = "";
		newCriteria.value.rating = 0;
	};
</script>
