<template>
	<section class="">
		<article
			v-if="isLoading"
			class="d-flex flex-column justify-content-center align-items-center gap-2 m-auto"
			style="height: 720px">
			<div class="spinner-border text-secondary" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
			Loading...
		</article>

		<article
			v-else-if="EventsList == null || EventsList.length <= 0"
			class="d-flex flex-column justify-content-around align-items-center gap-2 m-auto"
			style="height: 720px">
			<h4 class="fw-bold m-0">EVENTS</h4>

			<div class="d-flex flex-column align-items-center">
				<p class="text-center text-secondary fs-7 lh-sm">
					There are currently no data. Let's add some events.
				</p>
				<EventsCreate />
			</div>
		</article>

		<div v-else>
			<article
				class="d-flex justify-content-between align-items-center gap-3">
				<h4 class="fw-bold m-0">EVENTS</h4>
				<EventsCreate />
			</article>

			<hr />

			<article class="row overflow-y-auto" style="height: 720px;">
				<div
					v-for="event in EventsList"
					:key="event.id"
					class="col-lg-6 col-md-12 p-3">
					<div
						class="row event-card rounded-3 p-3" style="height: 360px;">
						<div class="col-2 text-center">
							<div class="fw-bold text-secondary">
								{{
									monthOfYEar[
										new Date(
											event.date
										).getMonth()
									]
								}}
							</div>
							<div class="fs-4 fw-bold">
								{{ new Date(event.date).getDate() }}
							</div>
						</div>
						<div
							class="col-10 d-flex flex-column justify-content-between">
							<div>
								<div
									class="d-flex justify-content-between align-items-end">
									<p class="fs-7 text-secondary">
										{{
											formatDateString(
												event.date
											)
										}}
									</p>
									<p
										class="fw-bold"
										style="font-size: 0.8rem">
										{{ event.type }}
									</p>
								</div>
								<h4 class="fw-bold mb-1">
									{{ event.title }}
								</h4>
								<p
									v-if="
										event.venue != '' ||
										event.address != ''
									">
									<span class="fw-bold">{{
										`${event.venue},` || " e"
									}}</span>
									{{ event.address }}
								</p>
								<p
									class="fs-7 text-secondary mb-0">
									{{ event.description }}
								</p>
							</div>
							<NuxtLink
								:to="`/admin/events/${event.id}v2`"
								class="btn btn-sm btn-outline-dark rounded-pill px-5 hstack gap-2"
								style="width: max-content">
								<span>View event</span>
								<i class="bi bi-arrow-right" />
							</NuxtLink>
						</div>
					</div>
				</div>
			</article>
		</div>
	</section>
</template>

<script setup>
	definePageMeta({
		layout: "main",
	});

	const EventsList = ref([]);
	const isLoading = ref(false);
	const errMsg = ref("");
	const monthOfYEar = [
		"JAN",
		"FEB",
		"MAR",
		"APR",
		"MAY",
		"JUN",
		"JUL",
		"AUG",
		"SEP",
		"OCT",
		"NOV",
		"DEC",
	];

	async function LoadData() {
		isLoading.value = true;
		const { data, error } = await $fetch("/api/events", {
			method: "GET",
			immediate: false,
			watch: false,
		});

		if (error) {
			errMsg.value = error;
			setTimeout(() => {
				errMsg.value = "";
			}, 3000);
		}

		EventsList.value = data;
		isLoading.value = false;
	}

	await LoadData();
</script>

<style scoped>
	.event-card:hover {
		cursor: pointer;
		background-color: whitesmoke;
		border: 1px solid #454545;
	}
</style>
