<template>
  <div>
    <h1 class="fw-bold m-0">{{ EventDetails.title }}</h1>
    <br />
    <EventsTabs activeTab="criteria" />

    <div
      v-if="isLoading"
      class="d-flex flex-column justify-content-center align-items-center"
      style="height: 360px"
    >
      <p>Loading data...</p>
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div
      v-else-if="EventCriteria.length <= 0 || EventCriteria == null"
      class="d-flex flex-column justify-content-center align-items-center"
      style="height: 432px"
    >
      <h4 class="fw-bold m-0">Event Criteria</h4>
      <br />
      <br />
      <br />
      <p class="text-secondary text-center fs-7 lh-sm">
        No data available. <br />
        Please add event criteria.
      </p>
      <EventCriteriaCreate :event="EventDetails" @onCreate="HandleReload" />
    </div>

    <div v-else>
      <br />
      <div class="d-flex justify-content-between align-items-center gap-3">
        <h4 class="fw-bold m-0">Event Criteria for Judging</h4>
        <EventCriteriaCreate
          v-if="_maxRating.data != 0"
          :event="EventDetails"
          @onCreate="HandleReload"
        />
		  <NuxtLink v-else :to="`/admin/events/${eventId}v2/results`"
      class="bg-success bg-opacity-25 border border-success rounded-3 fs-7 text-success px-3 py-2">
			Ready to evaluate participants.
		  </NuxtLink>
      </div>
      <br />
      <div class="table-responsive">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Code</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col" class="text-center">Rating %</th>
              <th scope="col" class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(criteria, index) in EventCriteria"
              :key="criteria.id"
              style="height: 56px"
            >
              <td>
                {{ index + 1 }}
              </td>
              <td>
                {{ criteria.name }}
              </td>
              <td style="width: 360px">
                {{ criteria.description }}
              </td>
              <td class="text-center">
                {{ `${criteria.rating}%` }}
              </td>
              <td>
                <div class="d-flex justify-content-center align-items-center">
                  <EventCriteriaEdit
                    :criteria="criteria"
                    @onEdit="HandleReload"
                  />
                  <EventCriteriaDelete
                    :criteria="criteria"
                    @onDelete="HandleReload"
                  />
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
	const EventCriteria = ref([]);
	const EventDetails = ref({});
	const isLoading = ref(false);
	const errorMessage = ref("");

	const { data: _maxRating, refresh: LoadMaxRating } = await useFetch(
		`/api/event-criteria/max-rating`,
		{
			method: "GET",
			query: { eventId },
		}
	);

	const InitializeData = async () => {
		isLoading.value = true;
		try {
			await LoadMaxRating();
			const { data: _eventData, error: _eventError } = await $fetch(
				`/api/events/${eventId}`,
				{
					method: "GET",
				}
			);

			if (_eventError) {
				throw new Error(_eventError);
			}

			const { data: _criteriaData, error: _criteriaError } = await $fetch(
				`/api/event-criteria/${eventId}/`,
				{
					method: "GET",
				}
			);

			if (_criteriaError) {
				throw new Error(_criteriaError);
			}

			EventDetails.value = _eventData;
			EventCriteria.value = _criteriaData;
		} catch (err) {
			console.error(err.message);
			errorMessage.value = "Internal server error. Please try again later.";
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
