export const useEvents = () => {
  const events = useState("events", () => []);
  const loading = ref(false);

  const GetAllEvents = async () => {
    loading.value = true;

    try {
      const response = await $fetch("/api/events", {
        headers: useRequestHeaders(["cookie"]),
        method: "GET",
      });

      events.value = response.body;
    } catch (err) {
      console.log("Failed to fetch events:", err);
    } finally {
      loading.value = false;
    }
  };

  return {
    events,
    loading,
    GetAllEvents,
  };
};
