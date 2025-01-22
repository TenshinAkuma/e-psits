<template>
	<div class="">
		<div class="d-flex justify-content-between align-items-center gap-3">
			<h4 class="fw-bold m-0">EVENTS</h4>
			<EventsCreateModal />
		</div>

		<hr />
		<div
			v-if="_eventsStatus == 'success'"
			class="row g-3 overflow-y-auto"
			style="height: 720px">
			<div
				v-for="event in events"
				:key="event.id"
				class="event-card col-6 rounded-3 p-3">
				<div class="row" style="height: 252px">
					<div class="col-2 text-center">
						<div class="fw-bold text-secondary">
							{{
								daysOfWeek[
								new Date(event.date).getDay()
								]
							}}
						</div>
						<div class="fs-4 fw-bold">
							{{ new Date(event.date).getDate() }}
						</div>
					</div>

					<div class="col-10 d-flex flex-column justify-content-between">
						<div>
							<div
							class="d-flex justify-content-between align-items-end">
							<p class="fs-7 text-secondary">
								{{ formatDateString(event.date) }}
							</p>

							<p class="fw-bold" style="font-size: 0.8rem">
								{{ event.type }}
							</p>
						</div>
						
						<h4 class="fw-bold mb-1">
								{{ event.title }}
							</h4>
						<p
							v-if="
								event.venue != '' || event.address != ''
							">
							<span class="fw-bold"
								>{{ `${event.venue},` || " e" }}
							</span>
							{{ event.address }}
						</p>
						<p class="fs-7 text-secondary mb-0">
							{{ event.description }}
						</p>
						</div>

						<NuxtLink :to="`/admin/events/${event.id}`" class="btn btn-sm btn-outline-dark rounded-pill px-5 hstack gap-2"
						style="width: max-content;">
							<span>View event</span>
							<i class="bi bi-arrow-right" />
						</NuxtLink>
					</div>
				</div>
			</div>
		</div>
		<div
			v-else
			class="d-flex flex-column justify-content-center align-items-center gap-2 m-auto"
			style="height: 576px">
			<div class="spinner-border text-secondary" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
			Loading...
		</div>
	</div>
</template>

<script setup>
	definePageMeta({
		layout: "main",
	});

	const events = useEvents();

	const errorMessage = ref("");
	const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

	const {
		data: _eventsData,
		status: _eventsStatus,
		execute: LoadEvents,
	} = await useFetch("/api/events", {
		method: "GET",
		immediate: false,
		watch: false,
	});

	const ToEventDetailsPage = async (id) => {
		await navigateTo(`/admin/events/	${id}`);
	};

	try {
		await LoadEvents();

		if (_eventsData.value?.errorMessage) {
			throw new Error("Error while loading events.");
		}

		events.value = _eventsData.value?.data;
	} catch (err) {
		console.error(err.message);
	}
</script>

<style scoped>
	.event-card:hover {
		cursor: pointer;
		background-color: #f5f5f5;
	}
</style>
