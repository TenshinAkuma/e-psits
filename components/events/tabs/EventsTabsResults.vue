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
							v-for="criteria in criteriaColumns"
							:key="criteria"
							scope="col"
							class="text-center">
							{{
								`${criteria.name} - ${criteria.rating}%`
							}}
						</th>
						<th scope="col">Total</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(row, index) in transformedData"
						:key="row.registration_id">
						<td>{{ index + 1 }}</td>
						<td>{{ row.participantName }}</td>
						<td
							v-for="criteria in criteriaColumns"
							:key="criteria"
							class="">
							<div
								class="d-flex justify-content-center align-items-center text-secondary gap-3 mx-auto">
								<span>{{
									row.scores[criteria.name].score
								}}</span>
								<i class="bi bi-arrow-right" />
								<span class="text-dark">{{
									computeRating(
										row.scores[criteria.name]
											.score,
										row.scores[criteria.name]
											.rating
									)
								}}</span>
							</div>
						</td>
						<td>
							<div class="fw-bold">
								{{ `${row.totalScore} pts` }}
							</div>
						</td>
						<td class="d-flex justify-content-end">
							<button class="btn btn-sm">
								<i class="bi bi-trash-fill text-secondary" style="font-size: .5rem;"/>
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		{{ transformedData }}
	</div>
</template>

<script setup>
	const eventScores = useEventScores();

	const criteriaColumns = computed(() => {
		// Use a Map to ensure unique criteria based on the name
		const criteriaSet = new Map();

		eventScores.value?.forEach((entry) => {
			const scoreId = entry.id;
			const name = entry.event_criteria.name.trim();
			const rating = entry.event_criteria.rating;

			// Only add if the name is not already in the Map
			if (!criteriaSet.has(name)) {
				criteriaSet.set(name, { scoreId, name, rating });
			}
		});

		// Convert the Map values into an array
		return Array.from(criteriaSet.values());
	});

	const transformedData = computed(() => {
		const groupedData = {};

		eventScores.value?.forEach((entry) => {
			const registrationId = entry.registration_id;
			const participantName = `${entry.event_registrations.participants.last_name}, ${entry.event_registrations.participants.first_name}`;
			const criteriaName = entry.event_criteria.name.trim();
			const scoreId = entry.id;
			const score = entry.score;
			const rating = entry.event_criteria.rating;

			if (!groupedData[registrationId]) {
				groupedData[registrationId] = {
					participantName,
					scores: {},
					scoreIdArray: [],
					totalScore: 0,
				};
			}

			groupedData[registrationId].scores[criteriaName] = {
				scoreId,
				criteriaName,
				score,
				rating,
			};

			// Collect all scoreIds for this registration
			groupedData[registrationId].scoreIdArray.push(scoreId);

			groupedData[registrationId].totalScore = Object.values(
				groupedData[registrationId].scores
			).reduce((acc, curr) => {
				return (
					acc +
					parseFloat(computeRating(curr.score, curr.rating))
				);
			}, 0);
		});

		return Object.values(groupedData).sort(
			(a, b) => b.totalScore - a.totalScore
		); // Convert grouped object to array
	});

	const computeRating = (score, rating) => {
		return (score * (rating / 100)).toFixed(2);
	};
</script>
