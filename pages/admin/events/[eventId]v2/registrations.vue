<template>
	<div>
		<h1 class="fw-bold m-0">{{ EventDetails.title }}</h1>
		<br />
		<EventsTabs activeTab="registrations" />

		<div
			v-if="isLoading"
			class="d-flex flex-column justify-content-center align-items-center"
			style="height: 360px">
			<p>Loading data...</p>
			<div class="spinner-border" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
		</div>

		<div v-else>
			<br />
			<h4 class="fw-bold">Event Registrations</h4>
			<br />
			<table class="table table-hover table-bordered align-middle">
				<thead>
					<tr>
						<th scope="col">Name</th>
						<th scope="col">Email</th>
						<th scope="col">Institution</th>
						<th scope="col" class="text-center">
							Paid Amount
						</th>
						<th scope="col">Status</th>
						<th scope="col" class="text-center">Actions</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="registration in EventRegistrations"
						:key="registration.id"
						style="height: 56px">
						<td>
							{{
								`${registration.participants.first_name} ${registration.participants.last_name}`
							}}
						</td>
						<td>
							{{
								registration.participants.email || "NDA"
							}}
						</td>
						<td>
							{{
								registration.participants.institutions
									.name || "NDA"
							}}
						</td>
						<td class="text-center">
							{{ `₱ ${registration.amount}` }}
						</td>
						<td>
							{{
								registration.registration_status ||
								"NDA"
							}}
						</td>
						<td>
							<div
								class="d-flex justify-content-center gap-2">
								<RegistrationsEdit
									:registration="registration"
									@onSaveEdit="HandleReload()" />
								<RegistrationsDelete
                           :registration="registration"
                           @onDelete="HandleReload()" />
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
	const EventRegistrations = useEventRegistrations();
	const EventDetails = useEventDetails();
	const isLoading = ref(false);
	const errorMessage = ref("");

	const { data: _eventDetails, execute: LoadEvent } = await useFetch(
		`/api/events/${eventId}`,
		{
			method: "GET",
			immediate: false,
			watch: false,
		}
	);

	const { data: _registrationData, execute: LoadRegistrations } =
		await useFetch(`/api/event-registrations/${eventId}`, {
			method: "GET",
			immediate: false,
			watch: false,
		});

	const InitializeData = async () => {
		isLoading.value = true;
		try {
			await LoadEvent();
			await LoadRegistrations();

			if (_registrationData.value?.error) {
				throw new Error(_registrationData.value?.error);
			}

			EventDetails.value = _eventDetails.value?.data;
			EventRegistrations.value = _registrationData.value?.data;
		} catch (err) {
			console.error(err.message);

			errorMessage.value =
				"Internal server error. Please try again later.";
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

	table tbody tr:hover {
		background-color: whitesmoke;
		cursor: pointer;
	}
</style>
