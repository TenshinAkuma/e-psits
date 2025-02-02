<template>
	<article
		v-if="isLoading"
		class="d-flex flex-column justify-content-center align-items-center"
		style="height: 720px">
		<p>Loading event...</p>
		<div class="spinner-border" role="status">
			<span class="visually-hidden">Loading...</span>
		</div>
	</article>

	<section v-else>
		<article>
			<h1 class="fw-bold m-0">{{ EventDetails.title }}</h1>
		</article>

		<br />
		<EventsTabs activeTab="details" />
		<br />

		<h4 class="fw-bold mb-3">Event Details</h4>

		<dl class="row">
			<dt class="col-sm-2">Schedule</dt>
			<dd class="col-sm-10">
				<p>
					{{
						formatDate(EventDetails.date) ||
						"No data provided."
					}}
					<br />
					{{
						formatTime(EventDetails.date) ||
						"No time provided"
					}}
				</p>
			</dd>

			<dt class="col-sm-2">Category</dt>
			<dd class="col-sm-10">
				<p>
					{{ EventDetails.category || "No category available." }}
				</p>
			</dd>

			<dt class="col-sm-2">Attendance</dt>
			<dd class="col-sm-10">
				<p>
					{{ EventDetails.type }} <br />
					<NuxtLink
						v-if="
							EventDetails.type.toLowerCase() == 'virtual'
						"
						:to="`/admin/events/${eventId}v2/edit`"
						class="fst-italic"
						>{{
							EventDetails.link || "Provide virtual link."
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
					{{ EventDetails.venue || "No data provided." }}
					<br />
					{{ EventDetails.address || "No data provided." }}
				</p>
			</dd>

			<dt class="col-sm-2">Registration period</dt>
			<dd class="col-sm-10">
				<p v-if="EventDetails.type.toLowerCase() == 'in-person'">
					{{ formatDate(EventDetails.registration_start) }}
					<i class="bi bi-arrow-right mx-2" />
					{{ formatDate(EventDetails.registration_end) }}
				</p>
				<p v-else>No data provided.</p>
			</dd>

			<dt class="col-sm-2">Description</dt>
			<dd class="col-sm-10">
				{{ EventDetails.description || "No data provided." }}
			</dd>
		</dl>
	</section>
</template>

<script setup>
	definePageMeta({
		layout: "main",
	});

	const eventId = useRoute().params.eventId;
	const EventDetails = ref({});
	const isLoading = ref(false);
	const errorMessage = ref("");

	const LoadData = async () => {
		isLoading.value = true;
		const { data, error } = await $fetch(`/api/events/${eventId}`, {
			method: "GET",
		});

		if (error) {
			console.error("Error fetching event: ", error);

			errorMessage.value = "Internal server error. Please try again.";
			setTimeout(() => {
				errorMessage.value = "";
			}, 3000);
		}

		EventDetails.value = data;
		isLoading.value = false;
	};

	await LoadData();
</script>
