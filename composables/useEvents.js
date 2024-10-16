export const useEvents = () => {
  const events = useState("events", () => []);
  const loading = ref(false);
  const error = ref(null);

  const fetchEvents = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch("/api/events", {
        headers: useRequestHeaders(["cookie"]),
      });

      events.value = response.body;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  return {
    events,
    loading,
    error,
    fetchEvents,
  };
};
