<template>
	<div>
		<div class="mb-3">
			<ResultsCreate />
		</div>
		<div class="table-responsive fs-7">
			<table class="table table-borderless align-middle">
				<thead>
					<tr>
						<th scope="col">Rank</th>
						<th scope="col">Participant</th>
						<th
							v-for="criteria in eventCriteria"
							:key="criteria.id"
							scope="col"
							class="text-center">
							{{
								`${criteria.name} - ${criteria.rating}%`
							}}
						</th>
						<th scope="col" class="text-end">
							Weighted Score
						</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(
							participant, index
						) in registeredParticipants"
						:key="participant.id"
						style="height: 72px">
						<td>
							<div class="fw-bold">
								{{ `# ${index + 1}` }}
							</div>
						</td>
						<td>
							{{
								`${participant.participants.first_name} ${participant.participants.last_name}`
							}}
						</td>
						<td
							v-for="criteria in eventCriteria"
							:key="criteria.id"
							class="text-center text-secondary">
							<div
								class="d-flex justify-content-center gap-2">
								<div>
									{{
										getScoreDetails(
											participant.id,
											criteria.id).value?.score
									}}
								</div>
								<i
									v-if="
										getScoreDetails(
											participant.id,
											criteria.id
										).value?.score
									"
									class="bi bi-arrow-right" />
								<div class="text-dark">
									{{
										getScoreDetails(
											participant.id,
											criteria.id).value?.computedScore
									}}
								</div>
							</div>
						</td>
						<td class="text-end fw-bold">
							{{ getTotalScore(participant.id) }} pts
						</td>
						<td>
							<ResultsDelete
								:registrationId="participant.id" />
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		{{ eventScores }}
	</div>
</template>

<script setup>
	const eventScores = useEventScores();
	const eventCriteria = useEventCriteria();
	const participantsRegistrations = useParticipantRegistrations();

	const getScoreDetails = (registrationId, criteriaId) => {
		return computed(() => {
			// Find the object that matches the registrationId and criteriaId
			const result = eventScores.value?.find(
				(item) =>
					item.registration_id === registrationId &&
					item.criteria_id === criteriaId
			);

			// If no match is found, return null
			if (!result) return null;

			// Extract the score and rating
			const { score } = result;
			const { rating } = result.event_criteria;

			// Compute the computed score
			const computedScore = (score * (rating / 100)).toFixed(2);

			// Return the score and computed score
			return {
				score,
				computedScore: parseFloat(computedScore), // Parse to ensure it's a number
			};
		});
	};


	const registeredParticipants = computed(() => {
		return participantsRegistrations.value?.filter(
			(participant) =>
				participant.registration_status.toLowerCase() ===
				"registered"
		);
	});

	const getTotalScore = (registrationId) => {
		// Use a computed property to ensure reactivity
		return computed(() => {
			// Filter the reactive eventScores array for the given registration ID
			const scores = eventScores.value?.filter(
				(p) => p.registration_id === registrationId
			);

			// Guard clause to handle undefined or empty scores
			if (!scores || scores.length === 0) return 0;

			// Calculate the total weighted score
			const totalScore = scores.reduce((total, item) => {
				const score = item.score;
				const rating = item.event_criteria.rating;
				const weightedScore = score * (rating / 100);
				return total + weightedScore;
			}, 0);

			// Return the computed total score
			return parseFloat(totalScore.toFixed(2)); // Ensure consistent decimal places
		});
	};
</script>
