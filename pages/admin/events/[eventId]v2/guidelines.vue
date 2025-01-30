<template>
	<div>
		<h1 class="fw-bold m-0">{{ EventDetails.title }}</h1>
		<br />
		<EventsTabs activeTab="guidelines" />

		<div
			v-if="isLoading"
			class="d-flex flex-column justify-content-center align-items-center"
			style="height: 432px">
			<p>Loading data...</p>
			<div class="spinner-border" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
		</div>

		<div
			v-else-if="EventRules.length <= 0 || EventRules == null"
			class="d-flex flex-column justify-content-center align-items-center"
			style="height: 432px">
			<h4 class="fw-bold m-0">Event Guidelines</h4>
			<br />
			<br />
			<br />
			<p class="text-secondary text-center fs-7 lh-sm">
				No data available. <br />
				Please add event guidelines.
			</p>
			<EventRulesCreate
				:event="EventDetails"
				@onCreate="HandleReload" />
		</div>

		<div v-else>
			<br />
			<div
				class="d-flex justify-content-between align-items-center gap-3">
				<h4 class="fw-bold m-0">Event Guidelines</h4>
				<EventRulesCreate
					:event="EventDetails"
					@onCreate="HandleReload" />
			</div>
			<br />
			<div class="table-responsive">
				<table class="table table-bordered">
					<thead>
						<tr>
							<th scope="col">Code</th>
							<th scope="col">Name</th>
							<th scope="col">Description</th>
							<th scope="col" class="text-center">
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						<tr
							v-for="(rule, index) in EventRules"
							:key="rule.id"
							style="height: 56px">
							<td>
								{{ index + 1 }}
							</td>
							<td>
								{{ rule.name }}
							</td>
							<td style="max-width: 360px">
								{{ rule.description }}
							</td>
							<td>
								<div
									class="d-flex justify-content-center">
									<EventRulesEdit
										:rule="rule"
										@onEdit="HandleReload" />
									<EventRulesDelete
										:rule="rule"
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
	const EventRules = ref([]);
	const EventDetails = ref({});
	const isLoading = ref(false);
	const errorMessage = ref("");

	const InitializeData = async () => {
		isLoading.value = true;
		try {
			const { data: _eventData, error: _eventError } = await $fetch(
				`/api/events/${eventId}`,
				{
					method: "GET",
				}
			);

			if (_eventError) {
				throw new Error(_eventError);
			}

			const { data: _rulesData, error: _rulesError } = await $fetch(
				`/api/event-rules/${eventId}/`,
				{
					method: "GET",
				}
			);

			if (_rulesError) {
				throw new Error(_rulesError);
			}

			EventDetails.value = _eventData;
			EventRules.value = _rulesData;
		} catch (err) {
			console.error(err.message);
			errorMessage.value =
				"Internal server error. Please try again later.";
			setTimeout(() => {
				errorMessage.value = "";
			}, 3000);
		} finally {
			isLoading.value = false;
		}
	};

	await InitializeData();

	const HandleReload = async () => {
		console.log("Event guideline saved.");
		await InitializeData();
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
