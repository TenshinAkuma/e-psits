<template>
	<section class="">
		<article
			class="d-flex justify-content-between align-items-center gap-3">
			<h4 class="fw-bold m-0">EVENT RESULTS</h4>
		</article>

		<br />
		<br />

		<article
			v-if="isLoading"
			class="d-flex flex-column justify-content-center align-items-center gap-2 m-auto"
			style="height: 576px">
			<div class="spinner-border text-secondary" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
			Loading...
		</article>

		<article
			v-else-if="EventsList == null || EventsList.length <= 0"
			class="d-flex flex-column justify-content-center align-items-center gap-2 m-auto"
			style="height: 576px">
			<p class="text-center text-secondary fs-7 lh-sm">
				There are currently no data.
			</p>
		</article>

		<div v-else>
			<article class="table-responsive">
				<table class="table align-middle table-bordered">
					<thead>
						<tr>
							<th scope="col">Event</th>
							<th scope="col">Number of Participants</th>
							<th scope="col">Action</th>
						</tr>
					</thead>
					<tbody>
						<tr
							v-for="event in EventsList"
							:key="event.id"
							style="height: 56px">
							<td>
								{{ event.title }}
							</td>
							<td>
								{{
									GetParticipantCount(
										event.event_registrations
									)
								}}
							</td>
							<td>
								<NuxtLink
									:to="`/admin/events/${event.id}v2/results`">
									View results
								</NuxtLink>
							</td>
						</tr>
					</tbody>
				</table>
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

	async function LoadData() {
		isLoading.value = true;
		const { data, error } = await $fetch("/api/results", {
			method: "GET",
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

	const GetParticipantCount = (participants) => {
		return participants.length;
	};
</script>

<style scoped>
	.event-card:hover {
		cursor: pointer;
		background-color: whitesmoke;
		border: 1px solid #454545;
	}
</style>
