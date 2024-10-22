export const useEvents = () => {
  const events = useState("events", () => []);
  const loading = ref(false);

  const fetchEvents = async () => {
    loading.value = true;

    try {
      const response = await $fetch("/api/events", {
        headers: useRequestHeaders(["cookie"]),
        method: "GET",
      });

      events.value = response.body;
      console.log(events.value);
    } catch (err) {
      console.log("Failed to fetch events:", err);
    } finally {
      loading.value = false;
    }
  };

  return {
    events,
    loading,
    fetchEvents,
  };
};
