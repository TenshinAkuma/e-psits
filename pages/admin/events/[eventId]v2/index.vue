<template>
  <div>
    
  </div>
</template>

<script setup>
const eventId = useRoute().params.eventId;
const EventDetails = useEventDetails();
const errorMessage = ref("");

const {
  data: _eventData,
  status: _eventStatus,
  execute: LoadEvent,
} = await useFetch(`/api/events/${eventId}`, {
  method: "GET",
  immediate: false,
  watch: false,
});

try {
  await LoadEvent();

  if (_eventData.value?.error) {
    throw new Error(_eventData.value?.error);
  }

  EventDetails.value = _eventData.value?.data;
} catch (err) {
  console.error(err.message);

  errorMessage.value = "Error while loading event details.";
  setTimeout(() => {
    errorMessage.value = "";
  }, 3000);
}
</script>
