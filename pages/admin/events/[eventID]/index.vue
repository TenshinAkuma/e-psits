<template>
  <div>
    <h3 class="fw-bold">Event details</h3>
    <hr />
    <div class="row gx-5">
      <!-- <div class="col-9">
        <div>
          <div class="d-flex justify-content-start align-items-start">
            <div class="fs-2 fw-bold">{{ event.title }}</div>
            <NuxtLink
              :to="`/admin/events/${eventID}/update`"
              class="text-decoration-none text-secondary d-flex align-items-center gap-2 px-2"
              ><Icon
                name="material-symbols:edit-outline-rounded"
              />Edit</NuxtLink
            >
          </div>
        </div>
        <dl class="row">
          <dt class="col-2">Description:</dt>
          <dd class="col-10">{{ event.description }}</dd>
          <dt class="col-2">Category:</dt>
          <dd class="col-10">{{ event.category }}</dd>
          <dt class="col-2">Duration:</dt>
          <dd class="col-10">{{ event.duration }}</dd>
          <dt class="col-2">Date:</dt>
          <dd class="col-10">{{ event.date }}</dd>
          <dt class="col-2">Location:</dt>
          <dd class="col-10">{{ event.location }}</dd>
          <dt class="col-2">Registration:</dt>
          <dd class="col-10">
            {{
              formatRegistrationPeriod(
                event.registrationStart,
                event.registrationEnd
              )
            }}
          </dd>
        </dl>
      </div> -->
      <!-- <div class="vr"></div> -->
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
const client = useSupabaseClient();
const eventID = route.params.eventID;
const event = ref({});
const error_message = ref("");

const fetchEvent = async (eventID) => {
  const { data: _events, error } = await client
    .from("events")
    .select("*")
    .eq("id", eventID)
    .single();

  if (error) {
    console.log(error.message);
  }

  if (_events != null) {
    event.value = _events;
  } else {
    console.log("event is empty");
  }
  console.log(_events);
};

onMounted(() => {
  fetchEvent(eventID);
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
