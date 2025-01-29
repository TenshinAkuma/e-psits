<template>
	<Dialog
		:dialogId="`create-result-${eventData.id}`"
		dialogTitle="Evaluate Participant"
		openButtonStyle="btn btn-outline-dark fw-bold hstack gap-2"
		ref="createResultRef">
		<template #ButtonLabel>
			<i class="bi bi-plus-lg" /> Evaluate participant
		</template>

		<template #Body>
			<form v-if="participantOptions.length != 0"
				:id="`create-result-form-${eventData.id}`"
				@submit.prevent="OnSaveEvaluation">
				<p class="text-dark lh-sm">
					Provide scores based on the evaluation criteria to
					assess the participant’s score.
				</p>
				<select
					class="form-select border-secondary mb-2"
					v-model="result.participant_id"
					required>
					<option value="0" selected hidden>
						Choose participant
					</option>
					<option
						v-for="participant in participantOptions"
						:key="participant.participant_id"
						:value="participant.participant_id">
						{{
							`${participant.participants.first_name} ${participant.participants.last_name}`
						}}
					</option>
				</select>

				<p class="text-secondary lh-sm" style="font-size: 0.8rem">
					Note: Only registered participants can be evaluated.
				</p>

				<hr />
				<div v-if="criteriaList.length > 0">
					<p class="fw-bold mb-1">Evaluation Form</p>
					<p
						class="text-secondary lh-sm"
						style="font-size: 0.8rem">
						Enter a score between 0 and 100. Ensure the score
						reflects the participant’s performance for the
						given criterion.
					</p>

					<div
						v-for="criterion in criteriaList"
						:key="criterion.id"
						class="mb-3">
						<label class="mb-1 fs-7">{{
							criterion.name
						}}</label>
						<div class="hstack gap-2">
							<div class="input-group">
								<span
									class="input-group-text border-secondary bg-secondary bg-opacity-10"
									>{{ `${criterion.rating}%` }}</span
								>
								<input
									type="number"
									class="form-control border-secondary"
									placeholder="Score"
									v-model="
										result.scores[criterion.id]
									"
									:disabled="
										result.participant_id === 0
									"
									min="0"
									max="100"
									required />
							</div>
						</div>
					</div>
				</div>
				<div
					v-else
					class="d-flex justify-content-center fs-7 gap-1">
					<div>No criteria available yet.</div>
					<div
						@click="GoToCriteria"
						class="nav-link text-primary">
						Create some criteria.
					</div>
				</div>
			</form>

			<div v-else class="d-flex justify-content-center fs-7 gap-1">
				<div>No registered participant yet.</div>
				<div
					@click="GoToRegistration"	
					class="nav-link text-primary">
					Register a participant.
				</div>
			</div>

			<p class="fs-7 text-danger text-center m-0">
				{{ errorMessage }}
			</p>
		</template>

		<template #Submit>
			<button v-if="participantOptions.length == 0"
			class="btn btn-outline-primary"
			@click="GoToRegistration">
				Register a participant
			</button>
			<button v-else-if="criteriaList.length == 0"
			class="btn btn-outline-primary"
			@click="GoToCriteria">
				Create a criteria
			</button>
			<button v-else
				type="submit"
				:form="`create-result-form-${eventData.id}`"
				class="btn btn-primary hstack gap-3"
				:disabled="isLoading">
				<span
					v-if="isLoading"
					class="spinner-border spinner-border-sm"
					aria-hidden="true" />
				<i v-else class="bi bi-floppy2-fill" />
				<span role="status">Submit evaluation</span>
			</button>
		</template>
	</Dialog>
</template>

<script setup>
	let createResultRef = ref(null);

	const props = defineProps({
		event: {
			type: Object,
			required: true,
		},
	});

	const emit = defineEmits(["onCreate"]);

	const eventData = toRef(props, "event");
	const participantOptions = ref([]);
	const criteriaList = ref([]);
	const isLoading = ref(false);
	const errorMessage = ref("");

	const result = ref({
		participant_id: 0,
		scores: {},
	});

	const InitializedData = async () => {
		isLoading.value = true;
		try {
			const { data: _participantData, error: _participantError } =
				await $fetch(
					`/api/event-registrations/${eventData.value?.id}`,
					{
						method: "GET",
					}
				);
			const { data: _criteriaData, error: _criteriaError } =
				await $fetch(`/api/event-criteria/${eventData.value?.id}`, {
					method: "GET",
				});

			if (_participantError || _criteriaError) {
				throw new Error(_participantError || _criteriaError);
			}

			participantOptions.value = _participantData.filter((participant) => participant.registration_status.toLowerCase() === "registered");

			criteriaList.value = _criteriaData;
		} catch (err) {
			console.error(err.message);
			errorMessage.value = err.message;
			setTimeout(() => {
				errorMessage.value = "";
			}, 3000);
		} finally {
			isLoading.value = false;
		}
	};

	await InitializedData();

	const payload = computed(() => {
		if (result.value.participant_id === 0) {
			return [];
		}

		return Object.entries(result.value?.scores).map(
			([criteria_id, score]) => ({
				participant_id: result.value?.participant_id,
				event_id: eventData.value?.id,
				criteria_id: parseInt(criteria_id, 10),
				score,
			})
		);
	});

	const { data: _resultData, execute: SaveEvaluation } = await useFetch(
		`/api/event-results`,
		{
			method: "POST",
			body: payload,
			immediate: false,
			watch: false,
		}
	);

	const OnSaveEvaluation = async () => {
		isLoading.value = true;
		try {
			if (payload.value.length === 0) {
				console.warn("No evaluation data to save.");
				errorMessage.value = "Invalid input. Please try again.";
				setTimeout(() => {
					errorMessage.value = "";
				}, 3000);
			}

			await SaveEvaluation();

			if (_resultData.value?.error) {
				throw new Error(_resultData.value.error);
			}

			emit("onCreate");
			resetInput();
			createResultRef.value.closeDialog();
		} catch (error) {
			console.error(error);

			errorMessage.value = error.message;

			setTimeout(() => {
				errorMessage.value = "";
			}, 3000);
		} finally {
			isLoading.value = false;
		}
	};

	// A function to reset the `scores` property of `evaluation.value` to an empty object
	const resetInput = () => {
		if (result?.value) {
			// Check if `evaluation` and `evaluation.value` exist
			result.value.scores = {}; // Safely reset `scores` to an empty object
			result.value.participant_id = 0;
		}
	};

	const GoToCriteria = () => {
		navigateTo(`/admin/events/${eventData.value?.id}v2/criteria`);
		createResultRef.value?.closeDialog();
	};

	const GoToRegistration = () => {
		navigateTo(`/admin/events/${eventData.value?.id}v2/registrations`);
		createResultRef.value?.closeDialog();
	};
</script>

<style scoped>
	.nav-link:hover {
		cursor: pointer;
		text-decoration: underline;
		text-underline-offset: 4px;
	}
</style>
