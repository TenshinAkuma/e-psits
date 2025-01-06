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
							{{ criteria.name }} <br />
							{{ `${criteria.rating}%` }}
						</th>
						<th scope="col" class="text-end">
							Weighted Score
						</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(participant, index) in participantScores"
						:key="participant.participant_id"
						style="height: 72px">
						<td>
							<div class="fw-bold">
								{{ `# ${index + 1}` }}
							</div>
						</td>
						<td>
							{{ getParticipant(participant.registration_id) }}
						</td>
						<td
							v-for="criteria in eventCriteria"
							:key="criteria.id"
							class="text-center text-secondary">
							<div
								class="d-flex justify-content-center align-items-center gap-2">
								<div>
									{{ participant.scores[criteria.id].score }}
								</div>
								<i
									v-if="participant.scores[criteria.id].score != null"
									class="bi bi-arrow-right" />
								<div class="text-dark">
									{{ participant.scores[criteria.id].rating }}
								</div>
								<ResultsEdit :scoreData="participant.scores[criteria.id]" class="fs-6"/>
							</div>
							<div style="font-size: .5rem;">{{ participant.scores[criteria.id] }}</div>
						</td>
						<td class="text-end fw-bold">
							{{ participant.totalScore }} pts
						</td>
						<td>
								<ResultsDelete :registrationId="participant.registration_id" class="fs-6"/>
								<div style="font-size: .5rem;">{{ participant.registration_id }}</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup>
	const eventScores = useEventScores();
	const eventCriteria = useEventCriteria();
	const participantsRegistrations = useParticipantRegistrations();

	const getParticipant = (registrationId) =>
		computed(() => {
			const participant = participantsRegistrations.value?.find(
				(participant) => participant.id == registrationId
			);

			return `${participant.participants.first_name} ${participant.participants.last_name}`;
		});


	const transformedData = computed(() => {
		const groupedData = {};

		eventScores.value?.forEach((entry) => {
			const registration_id = entry.registration_id;
			const criteria_id = entry.criteria_id;
			const score_id = entry.id;
			const score = entry.score;
			const rating = entry.event_criteria.rating;

			if (!groupedData[registration_id]) {
				groupedData[registration_id] = {
					registration_id,
					scores: {},
					totalScore: 0,
				};
			}

			groupedData[registration_id].scores[criteria_id] = {
				score_id,
				score,
				rating
			};

			// Compute totalScore dynamically
			groupedData[registration_id].totalScore = Object.values(
				groupedData[registration_id].scores
			)
				.reduce((acc, curr) => {
					return acc + parseFloat(curr.score * (curr.rating / 100));
				}, 0).toFixed(2);
		});

		// Convert grouped object to array and sort by totalScore
		return Object.values(groupedData).sort(
			(a, b) => b.totalScore - a.totalScore
		);
	});

	const participantScores = toRef(() => transformedData.value)
</script>
