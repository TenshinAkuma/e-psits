<template>
  <div>
    <div class="d-flex justify-content-between align-items-center">
      <h3 class="fw-bold m-0">Event details</h3>
      <NuxtLink
        :to="`/admin/events/${eventID}/update`"
        class="btn btn-sm btn-outline-danger d-flex align-items-center gap-2"
        ><Icon name="material-symbols:edit-outline-rounded" />Edit</NuxtLink
      >
    </div>
    <hr />
    <div class="row gx-5">
      <div class="col-9">
        <!-- event title -->
        <div class="fs-2 fw-bold">{{ event.title }}</div>

        <!-- loading state -->
        <div v-if="loading" class="d-flex justify-content-center pt-5 mt-5">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>

        <!-- loaded state -->
        <div v-else>
          <dl class="row">
            <dt class="col-2">Description:</dt>
            <dd class="col-10">{{ event.description }}</dd>

            <dt class="col-2">Category:</dt>
            <dd class="col-10">{{ event.category }}</dd>

            <dt class="col-2">Modality:</dt>
            <dd class="col-10">{{ event.modality }}</dd>

            <dt class="col-2">Date:</dt>
            <dd class="col-10">{{ event.date }}</dd>

            <dt class="col-2">Time:</dt>
            <dd class="col-10">{{ event.time }}</dd>

            <dt class="col-2">Venue:</dt>
            <dd class="col-10">{{ event.venue }}</dd>

            <dt class="col-2">Address:</dt>
            <dd class="col-10">{{ event.address }}</dd>

            <dt class="col-2">Registration:</dt>
            <dd class="col-10">
              {{ (event.registration_start, event.registration_end) }}
            </dd>
          </dl>
        </div>
      </div>

      <div class="col-3">
        <ul class="list-unstyled vstack gap-2">
          <li class="fw-bold">Document and forms</li>
          <li
            class="forms text-secondary hstack justify-content-between align-items-center"
          >
            Guidelines <Icon name="material-symbols:download-rounded" />
          </li>
          <li
            class="forms text-secondary hstack justify-content-between align-items-center"
          >
            Judging criteria <Icon name="material-symbols:download-rounded" />
          </li>
          <li
            class="forms text-secondary hstack justify-content-between align-items-center"
          >
            Registration form <Icon name="material-symbols:download-rounded" />
          </li>
        </ul>
        <hr />
        <ul class="list-unstyled vstack gap-2">
          <li class="fw-bold">Quick actions</li>
          <li
            class="forms text-secondary hstack justify-content-between align-items-center"
          >
            View results <Icon name="material-symbols:arrow-outward-rounded" />
          </li>
          <li
            class="forms text-secondary hstack justify-content-between align-items-center"
          >
            Create another event
            <Icon name="material-symbols:arrow-outward-rounded" />
          </li>
          <li
            class="forms text-secondary hstack justify-content-between align-items-center"
          >
            FAQs
            <Icon name="material-symbols:arrow-outward-rounded" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
	definePageMeta({
		layout: "main",
	});

	const route = useRoute();
	const eventID = route.params.eventID;
	const { event, loading, getEvent } = useGetEvent();

	onMounted(() => {
		getEvent(eventID);
	});
</script>

<style scoped>
	.list-group-item {
		font-size: 0.9rem !important;
	}

	.forms {
		cursor: pointer;
	}

	.forms:hover {
		color: black !important;
	}
</style>
