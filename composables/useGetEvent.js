export const useGetEvent = () => {
  const event = ref({});
  const loading = ref(false);

  const getEvent = async (eventID) => {
    loading.value = true;

    try {
      const response = await $fetch(`/api/events/${eventID}`, {
        headers: useRequestHeaders(["cookie"]),
        method: "GET",
      });

      event.value = response.body;
    } catch (err) {
      console.log("Failed to fetch events", err);
    } finally {
      loading.value = false;
    }
  };

  return {
    event,
    loading,
    getEvent,
  };
};
