export const useCreateEvent = () => {
  const loading = ref(false);
  const errorMessage = ref(null);
  const isSuccess = ref(false);
  const eventId = ref(0);

  const PostEvent = async (eventDetails) => {
    loading.value = true;
    isSuccess.value = false;

    try {
      // Call the API using Nuxt's built-in fetch
      const response = await $fetch("/api/events", {
        headers: useRequestHeaders(["cookie"]),
        method: "POST",
        body: eventDetails,
      });

      if (response.status === 201) {
        isSuccess.value = true;
        eventId.value = response.body.id;
        console.log(eventId.value);
      }
    } catch (err) {
      console.error("Error while creating event", err);
    } finally {
      loading.value = false;
    }
  };

  return {
    PostEvent,
    loading,
    errorMessage,
    isSuccess,
    eventId,
  };
};
