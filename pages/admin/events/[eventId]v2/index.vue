<template>
	<div>
		<h1 class="fw-bold m-0">{{ EventDetails.title }}</h1>
		<br />
		<EventsTabs activeTab="details" />
		<div>
			<br />
			<h4 class="fw-bold">Event Details</h4>
			<br />
			<div class="row">
				<div class="col-8">
					<dl class="row">
						<dt class="col-sm-3">Schedule</dt>
						<dd class="col-sm-9">
							<p>
								{{ formatDate(EventDetails.date) }}
								<br />
								{{ formatTime(EventDetails.date) }}
							</p>
						</dd>

						<dt class="col-sm-3">Category</dt>
						<dd class="col-sm-9">
							<p>
								{{ EventDetails.category }}
							</p>
						</dd>

						<dt class="col-sm-3">Attendance</dt>
						<dd class="col-sm-9">
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
							v-if="
								EventDetails.type.toLowerCase() ==
								'in-person'
							"
							class="col-sm-3">
							Location
						</dt>
						<dd
							v-if="
								EventDetails.type.toLowerCase() ==
								'in-person'
							"
							class="col-sm-9">
							<p>
								{{ EventDetails.venue }} <br />
								{{ EventDetails.address }}
							</p>
						</dd>

						<dt class="col-sm-3">Registration period</dt>
						<dd
							v-if="
								EventDetails.type.toLowerCase() ==
								'in-person'
							"
							class="col-sm-9">
							<p>
								{{
									formatDate(
										EventDetails.registration_start
									)
								}}
								<i class="bi bi-arrow-right mx-2" />
								{{
									formatDate(
										EventDetails.registration_end
									)
								}}
							</p>
						</dd>

						<dt class="col-sm-3">Description</dt>
						<dd class="col-sm-9">
							{{ EventDetails.description }}
						</dd>
					</dl>
					<br />
					<br />
					<NuxtLink
						:to="`/admin/events/${eventId}v2/edit`"
						class="btn btn-success px-3">
						<i class="bi bi-pencil fs-7 me-3" />
						Edit details
					</NuxtLink>
				</div>
			</div>
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
