<template>
  <div>
    <h1 class="fw-bold m-0">{{ EventDetails.title }}</h1>
    <br />
    <EventsTabs activeTab="results" />

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
      v-else-if="_maxRating.data != 0"
      class="d-flex flex-column justify-content-center align-items-center"
      style="height: 432px"
    >
      <h4 class="fw-bold m-0">Event Results</h4>
      <br />
      <br />
      <br />
      <p class="text-center lh-sm">
        Please complete this event's criteria before evaluating participants
      </p>
      <button class="btn btn-outline-primary" @click="GoToCriteria">
        Create criteria <i class="bi bi-arrow-right ms-2" />
      </button>
    </div>
    
    <div
      v-else-if="EventResults.length <= 0 || EventResults == null"
      class="d-flex flex-column justify-content-center align-items-center"
      style="height: 432px"
    >
      <h4 class="fw-bold m-0">Event Results</h4>
      <br />
      <br />
      <br />
      <p class="text-secondary text-center fs-7 lh-sm">
        No participant evaluation yet.
      </p>
      <EventResultsCreate :event="EventDetails" @onCreate="HandleReload" />
    </div>

    <div v-else>
      <br />
      <div class="d-flex justify-content-between align-items-center gap-3">
        <h4 class="fw-bold m-0">Event Results</h4>
        <EventResultsCreate :event="EventDetails" @onCreate="HandleReload" />
      </div>
      <br />
      <div class="table-responsive">
        <table class="table table-bordered align-middle">
          <thead>
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">Participant</th>
              <th
                v-for="criterion in EventCriteria"
                :key="criterion.id"
                scope="col"
                class="text-center"
              >
                {{ criterion.name }}
              </th>
              <th scope="col" class="text-center">Total</th>
              <th scope="col" class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(result, index) in EventResults"
              :key="result.id"
              style="height: 56px"
            >
              <td>
                {{ `# ${index + 1}` }}
              </td>
              <td>
                {{ result.participant_name }}
              </td>
              <td
                v-for="criterion in EventCriteria"
                :key="criterion.id"
                class="text-center fs-7"
                :class="{
                  'text-secondary': result.scores[criterion.id] == null,
                }"
              >
              <EventResultsEdit
                    v-if="result.scores[criterion.id]"
                    :score="result.scores[criterion.id]"
                    @onEdit="HandleReload"/>
                    <EventResultsAdd v-else :score="result" :criteria="criterion" @onAdd="HandleReload"/>
              </td>
              <td class="text-center fw-bold">
                {{ Number(result.weightedScore.toFixed(2)) }}
              </td>
              <td class="text-center">
                <EventResultsDelete :score="result" @onDelete="HandleReload" />
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

  const { data: _maxRating } = await useFetch(`/api/event-criteria/max-rating`,
    {
      method: "GET",
      query: { eventId },
    });

  const TransformEventResults = (results) => {
    const participantAccumulator = [];

    // Loop through the results once
    results.forEach((item) => {
      const {
        id,
        participant_id,
        event_id,
        score,
        criteria_id,
        participants,
        event_criteria,
      } = item;
      const { first_name, last_name } = participants;
      const { name, rating } = event_criteria;

      // Initialize participant if not already initialized
      if (!participantAccumulator[participant_id]) {
        participantAccumulator[participant_id] = {
          event_id,
          participant_id,
          participant_name: `${first_name} ${last_name}`,
          weightedScore: 0,
          scores: {},
        };
      }

      const points = calculatePoints(score, rating);

      const participant = participantAccumulator[participant_id];

      // Only update the score if the value is different to minimize unnecessary updates
      if (participant.scores[criteria_id]?.score !== score) {
        participant.scores[criteria_id] = {
          id,
          score,
          points,
          rating,
          name,
          participant_name: `${first_name} ${last_name}`,
        };

        // Update weighted score incrementally
        participant.weightedScore += points;
      }
    });

    // Convert to an array of results
    return Object.values(participantAccumulator).sort(
      (a, b) => b.weightedScore - a.weightedScore
    );
  };

  const calculatePoints = (score, rating) => {
    return parseFloat((score * (rating / 100)).toFixed(2));
  };

  const InitializeData = async () => {
    isLoading.value = true;
    try {
      // Fetch all data concurrently
      const [
        { data: _eventData },
        { data: _criteriaData },
        { data: _resultData },
      ] = await Promise.all([
        $fetch(`/api/events/${eventId}`, { method: "GET" }),
        $fetch(`/api/event-criteria/${eventId}`, { method: "GET" }),
        $fetch(`/api/event-results/${eventId}`, { method: "GET" }),
      ]);

      // Update reactive variables
      EventDetails.value = _eventData;
      EventCriteria.value = _criteriaData;
      EventResults.value = TransformEventResults(_resultData);
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
