<template>
	<div>
		<button
			class="btn btn-outline-primary"
			id="createCriteriaBtn"
			data-bs-toggle="modal"
			data-bs-target="#createCriteria">
			Add criteria
		</button>
		<div
			class="modal"
			id="createCriteria"
			data-bs-backdrop="static"
			data-bs-keyboard="false"
			tabindex="-1"
			aria-labelledby="createCriteriaBtn"
			aria-hidden="true"
			ref="createCriteriaRef">
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<h5
							class="modal-title fw-bold"
							id="staticBackdropLabel">
							ADD NEW CRITERIA
						</h5>
						<button
							type="button"
							class="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"></button>
					</div>

					<div class="modal-body">
						<p class="text-secondary lh-sm">
							Define the criteria that will be used to
							evaluate participants during the event.
							Please provide clear details to ensure
							accurate assessments.
						</p>
						<form @submit="OnAddCriteria" id="AddNewCriteria">
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
								style="
									resize: vertical;
									max-height: 216px;
								"
								required
								v-model="newCriteria.description" />
							<hr />
							<p
								class="text-secondary lh-sm"
								style="font-size: 0.8rem">
								Specify the weight of this criterion in
								percentage (%). This value determines
								how much this criterion contributes to
								the overall score.
								<b>
									Ensure the total weight of all
									criteria adds up to 100% for
									accurate scoring.
								</b>
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
						</form>
						{{ maxRating }}
					</div>

					<div class="modal-footer">
						<button
							type="button"
							data-bs-dismiss="modal"
							class="btn btn-outline-secondary border-0">
							Cancel
						</button>
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
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	const createCriteriaRef = ref(null);
	let createCriteria;

	const eventID = useRoute().params.eventID;

	const newCriteria = ref({
		name: "",
		description: "",
		rating: 0,
		event_id: eventID,
	});

	const {
		data: criteriaData,
		status,
		execute: AddCriteria,
	} = await useFetch(`/api/events/${eventID}/criteria`, {
		method: "POST",
		body: newCriteria,
		immediate: false,
		watch: false,
	});

	const OnAddCriteria = async () => {
		try {
			await AddCriteria();
			if (!criteriaData.value.success) {
				console.error(criteriaData.value.error);
			}

			closeModal();
		} catch {
			console.error("An error occurred while adding criteria.");
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

	const closeModal = () => {
		if (createCriteria) {
			createCriteria.hide();
		}
	};

	onMounted(() => {
		// Access the global `bootstrap` object to initialize the Modal
		if (createCriteriaRef.value) {
			createCriteria = new bootstrap.Modal(createCriteriaRef.value);
		}
	});
</script>
