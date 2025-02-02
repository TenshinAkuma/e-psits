<template>
	<div>
		<h1 class="fw-bold m-0">{{ EventDetails.title }}</h1>
		<br />
		<EventsTabs activeTab="results" />

		<div
			v-if="isLoading"
			class="d-flex flex-column justify-content-center align-items-center"
			style="height: 360px">
			<p>Loading data...</p>
			<div class="spinner-border" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
		</div>

		<div
			v-else-if="_maxRating.data != 0"
			class="d-flex flex-column justify-content-center align-items-center"
			style="height: 432px">
			<h4 class="fw-bold m-0">Event Results</h4>
			<br />
			<br />
			<br />
			<p class="text-center lh-sm">
				Please complete this event's criteria before evaluating
				participants
			</p>
			<button class="btn btn-outline-primary" @click="GoToCriteria">
				Create criteria <i class="bi bi-arrow-right ms-2" />
			</button>
		</div>

		<div
			v-else-if="EventResults == null || EventResults.length <= 0"
			class="d-flex flex-column justify-content-center align-items-center"
			style="height: 432px">
			<h4 class="fw-bold m-0">Event Results</h4>
			<br />
			<br />
			<br />
			<p class="text-secondary text-center fs-7 lh-sm">
				No participant evaluation yet.
			</p>
			<EventResultsCreate
				:event="EventDetails"
				@onCreate="HandleReload" />
		</div>

		<div v-else>
			<br />
			<div
				class="d-flex justify-content-between align-items-center gap-3">
				<h4 class="fw-bold m-0">Event Results</h4>
				<EventResultsCreate
					:event="EventDetails"
					@onCreate="HandleReload" />
			</div>
			<br />
			<div class="table-responsive">
				<table class="table table-bordered align-middle">
					<thead>
						<tr>
							<th scope="col">Rank</th>
							<th scope="col">Participant</th>
							<th
								v-for="criteria in EventCriteria"
								:key="criteria.id"
								scope="col"
								class="text-center">
								{{ criteria.name }}
							</th>
							<th scope="col" class="text-center">
								Weighted Points
							</th>
							<th scope="col" class="text-center">
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						<tr
							v-for="(result, index) in EventResults"
							:key="result.id"
							style="height: 56px">
							<td class="fw-bold">
								{{ `# ${index + 1}` }}
							</td>
							<td>
								{{
									`${result.participants.first_name} ${result.participants.last_name}`
								}}
							</td>
							<td
								v-for="scores in result.event_scores"
								:key="scores.id"
								class="text-center fs-7">
								{{ scores.score }}
							</td>
							<td class="text-center fw-bold">
								{{ `${result.weighted_points} pts` }}
							</td>
							<td>
                <div class="d-flex justify-content-center align-items-center">
                  <EventResultsEdit
                  :score="result"
                  @onEdit="HandleReload"/>
								<EventResultsDelete
									:score="result"
									@onDelete="HandleReload" />
                </div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script setup>
	definePageMeta({
		layout: "main",
	});

	const eventId = useRoute().params.eventId;
	const EventDetails = ref({});
	const EventResults = ref([]);
	const EventCriteria = ref([]);
	const isLoading = ref(false);
	const errorMessage = ref("");

	const { data: _maxRating } = await useFetch(
		`/api/event-criteria/max-rating`,
		{
			method: "GET",
			query: { eventId },
		}
	);

	const GetCriteria = (data) => [
		...new Map(
			data
				.flatMap((results) =>
					results.event_scores.map(
						(score) => score.event_criteria
					)
				)
				.map((criteria) => [criteria.id, criteria]) // Map each object by ID
		).values(),
	];

	const InitializeData = async () => {
		isLoading.value = true;
		try {
			// Fetch all data concurrently
			const [{ data: _eventData }, { data: _resultData }] =
				await Promise.all([
					$fetch(`/api/events/${eventId}`, { method: "GET" }),
					$fetch(`/api/event-results/${eventId}`, {
						method: "GET",
					}),
				]);

			// Update reactive variables
			EventDetails.value = _eventData;
			EventResults.value = _resultData;
			EventCriteria.value = GetCriteria(_resultData);
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

	await InitializeData();

	const HandleReload = async () => {
		console.log("Event data reloaded.");
		await InitializeData();
	};

	const GoToCriteria = () => {
		navigateTo(`/admin/events/${EventDetails.value?.id}v2/criteria`);
	};
</script>

<style scoped>
	.nav-link {
		color: #424242;
	}

	.nav-link.active {
		color: #242424 !important;
		font-weight: bold;
	}
</style>
