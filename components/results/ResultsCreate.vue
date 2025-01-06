<template>
	<Dialog
		dialogId="evaluateParticipant"
		dialogTitle="Evaluate Participant"
		openButtonStyle="btn btn-outline-dark fw-bold"
		ref="evaluateParticipantRef">
		<template #ButtonLabel>
			<i class="bi bi-plus-lg" /> Evaluate participant
		</template>

		<template #Body>
			<form
				id="evaluateParticipant"
				@submit.prevent="OnSaveEvaluation">
				<p class="text-dark lh-sm">
					Provide scores based on the evaluation criteria to
					assess the participant’s score.
				</p>
				<select
					class="form-select border-secondary mb-2"
					v-model="evaluation.registration_id"
					required>
					<option value="0" selected hidden>
						Choose participant
					</option>
					<option
						v-for="participant in participants"
						:key="participant.id"
						:value="participant.id">
						{{
							`${participant.participants.first_name} ${participant.participants.last_name}`
						}}
					</option>
				</select>
				<p class="text-secondary lh-sm" style="font-size: 0.8rem">
					Note: Only registered participants can be evaluated.
				</p>

				<hr />
				<p class="fw-bold mb-1">Evaluation Form</p>
				<p class="text-secondary lh-sm" style="font-size: 0.8rem">
					Enter a score between 0 and 100. Ensure the score
					reflects the participant’s performance for the given
					criterion.
				</p>

				<div
					v-for="criterion in eventCriteria"
					:key="criterion.id"
					class="mb-3">
					<label class="mb-1 fs-7">{{ criterion.name }}</label>
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
								v-model="evaluation.scores[criterion.id]"
								:disabled="evaluation.registration_id === 0"
								min="0"
								max="100"
								required />
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
				form="evaluateParticipant"
				class="btn btn-primary hstack gap-2 px-5"
				:disabled="_resultStatus === 'pending'">
				<span
					v-if="_resultStatus === 'pending'"
					class="spinner-border spinner-border-sm"
					aria-hidden="true" />
				<span role="status">Submit evaluation</span>
			</button>
		</template>
	</Dialog>
</template>

<script setup>
	const evaluateParticipantRef = ref(null);
	const registeredParticipants = useParticipantRegistrations();
	const eventCriteria = useEventCriteria();
	const eventScores = useEventScores();
	const errorMessage = ref("");

	const evaluation = ref({
		registration_id: 0,
		scores: {},
	});

	const participants = computed(() => {
		return registeredParticipants.value?.filter(
			(participant) =>
				participant.registration_status.toLowerCase() ===
				"registered"
		);
	});

	const payload = computed(() => {
		if (evaluation.value.registration_id === 0) {
			return [];
		}

		return Object.entries(evaluation.value?.scores).map(
			([criteria_id, score]) => ({
				registration_id: evaluation.value.registration_id,
				criteria_id,
				score,
			})
		);
	});

	const {
		data: _resultData,
		status: _resultStatus,
		execute: SaveEvaluation,
	} = await useFetch(`/api/event-results`, {
		method: "POST",
		body: payload,
		immediate: false,
		watch: false,
	});

	const OnSaveEvaluation = async () => {
		try {
			if (payload.value.length === 0) {
				throw new Error("No evaluation data to save.");
			}

			await SaveEvaluation();

			if (_resultData.value?.error) {
				throw new Error(_resultData.value.error);
			}

			eventScores.value?.push(..._resultData.value.data);
			resetInput();
			evaluateParticipantRef.value.closeDialog();

		} catch (error) {
			console.error(error);

			errorMessage.value = error.message;

			setTimeout(() => {
				errorMessage.value = "";
			}, 3000);
		}
	};

	// A function to reset the `scores` property of `evaluation.value` to an empty object
	const resetInput = () => {
		if (evaluation?.value) { // Check if `evaluation` and `evaluation.value` exist
			evaluation.value.scores = {}; // Safely reset `scores` to an empty object
			evaluation.value.registration_id = 0;
		}
	};

</script>
