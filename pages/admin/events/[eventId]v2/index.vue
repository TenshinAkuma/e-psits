<template>
	<div>
		<h1 class="fw-bold m-0">{{ EventDetails.title }}</h1>
		<br />
		<EventsTabs activeTab="details" />
		<div>
			<br />
			<h4 class="fw-bold">Event Details</h4>
			<br />
			<dl class="row">
				<dt class="col-sm-2">Schedule</dt>
				<dd class="col-sm-10">
					<p>
						{{ formatDate(EventDetails.date) || "No data provided." }}
						<br />
						{{ formatTime(EventDetails.date) || "No time provided"}}
					</p>
				</dd>

				<dt class="col-sm-2">Category</dt>
				<dd class="col-sm-10">
					<p>
						{{ EventDetails.category || "No category available."}}
					</p>
				</dd>

				<dt class="col-sm-2">Attendance</dt>
				<dd class="col-sm-10">
					<p>
						{{ EventDetails.type }} <br />
						<NuxtLink
							v-if="
								EventDetails.type.toLowerCase() ==
								'virtual'
							"
							:to="`/admin/events/${eventId}v2/edit`"
							class="fst-italic"
							>{{
								EventDetails.link ||
								"Provide virtual link."
							}}</NuxtLink
						>
					</p>
				</dd>

				<dt
					v-if="EventDetails.type.toLowerCase() == 'in-person'"
					class="col-sm-2">
					Location
				</dt>
				<dd
					v-if="EventDetails.type.toLowerCase() == 'in-person'"
					class="col-sm-10">
					<p>
						{{ EventDetails.venue || "No data provided."}} <br />
						{{ EventDetails.address || "No data provided."}}
					</p>
				</dd>

				<dt class="col-sm-2">Registration period</dt>
				<dd class="col-sm-10">
					<p v-if="EventDetails.type.toLowerCase() == 'in-person'">
						{{ formatDate(EventDetails.registration_start)}}
						<i class="bi bi-arrow-right mx-2" />
						{{ formatDate(EventDetails.registration_end)}}
					</p>
					<p v-else>No data provided.</p>
				</dd>

				<dt class="col-sm-2">Description</dt>
				<dd class="col-sm-10">
					{{ EventDetails.description || "No data provided."}}
				</dd>
			</dl>
			<br />
			<br />
			<NuxtLink
				:to="`/admin/events/${eventId}v2/settings`"
				class="btn btn-success px-3">
				<i class="bi bi-pencil fs-7 me-3" />
				Edit details
			</NuxtLink>
		</div>
	</div>
</template>

<script setup>
	definePageMeta({
		layout: "main",
	});

	const eventId = useRoute().params.eventId;
	const EventDetails = useEventDetails();
	const errorMessage = ref("");

	const { data: _eventData, execute: LoadEvent } = await useFetch(
		`/api/events/${eventId}`,
		{
			method: "GET",
			immediate: false,
			watch: false,
		}
	);

	const { data: _participantData, execute: LoadParticipants } =
		await useFetch(`/api/events/${eventId}/participants`, {
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

		errorMessage.value = "Internal server error. Please try again later.";
		setTimeout(() => {
			errorMessage.value = "";
		}, 3000);
	}
</script>
