<template>
  <div>
    <h1 class="fw-bold m-0">{{ EventDetails.title }}</h1>
    <br />
    <EventsTabs activeTab="registrations" />

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
			v-else-if="EventRegistrations.length <= 0 || EventRegistrations == null"
			class="d-flex flex-column justify-content-center align-items-center"
			style="height: 432px">
			<h4 class="fw-bold m-0">Event Registrations</h4>
			<br />
			<br />
			<br />
			<p class="text-secondary text-center fs-7 lh-sm">
				No data available. <br />
				Please register some participants.
			</p>
			<EventRegistrationsCreate :event="EventDetails" @onRegister="HandleReload"/>
		</div>

    <div v-else>
      <br />
      <div class="d-flex justify-content-between align-items-center gap-3">
        <h4 class="fw-bold m-0">Event Registrations</h4>
        <EventRegistrationsCreate :event="EventDetails" @onRegister="HandleReload"/>
      </div>
      <br />
      <table class="table table-bordered align-middle">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Institution</th>
            <th scope="col" class="text-center">Paid Amount</th>
            <th scope="col">Status</th>
            <th scope="col" class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="registration in EventRegistrations"
            :key="registration.id"
            style="min-height: 56px"
          >
            <td>
              <NuxtLink
                :to="`/admin/participants/${registration.participant_id}`"
                >{{
						`${registration.participants.first_name} ${registration.participants.last_name}`
					}}
</NuxtLink
              >
            </td>
            <td>
              {{ registration.participants.email || "NDA" }}
            </td>
            <td>
              <NuxtLink
                :to="`/admin/institutions/${registration.participants.institution_id}`">
                {{ registration.participants.institutions.name }}
              </NuxtLink>
            </td>
            <td class="text-center">
              {{ `₱ ${registration.amount}` }}
            </td>
            <td>
              {{ registration.registration_status || "NDA" }}
            </td>
            <td>
              <div class="d-flex justify-content-center">
                <EventRegistrationsEdit
                  :registration="registration"
                  @onSaveEdit="HandleReload()"
                />
                <EventRegistrationsDelete
                  :registration="registration"
                  @onDelete="HandleReload()"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
	definePageMeta({
		layout: "main",
	});

	const eventId = useRoute().params.eventId;
	const EventRegistrations = ref([]);
	const EventDetails = ref({});
	const isLoading = ref(false);
	const errorMessage = ref("");

	const InitializeData = async () => {
		isLoading.value = true;
		try {
			// await LoadEvent();
			// await LoadRegistrations();

			const { data: _eventData, error: _eventError } = await $fetch(`/api/events/${eventId}`, {
				method: "GET",
			});

			if (_eventError) {
				throw new Error(_eventError);
			}

			const { data: _registrationData, error: _registrationError } = await $fetch(`/api/event-registrations/${eventId}/`, {
				method: "GET",
			});

			if (_registrationError) {
				throw new Error(_registrationError);
			}

			EventDetails.value = _eventData;
			EventRegistrations.value = _registrationData;
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
		console.log("Registration edit saved.");
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
