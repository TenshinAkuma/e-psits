<template>
	<div class="p-3">
		<div class="d-flex justify-content-start align-items-center gap-3">
			<h4 class="fw-bold m-0">Events</h4>
			<NuxtLink
				to="/admin/events/create"
				class="btn btn-outline-primary btn-sm rounded-pill px-4"
				>Create event
			</NuxtLink>
		</div>

		<hr />
		<div
			v-if="!loading"
			class="table-responsive rounded-3"
			style="height: 576px">
			<table class="table table-hover table-borderless">
				<thead class="table-light">
					<tr>
						<th scope="col">Title</th>
						<th scope="col">Category</th>
						<th scope="col">Modality</th>
						<th scope="col">Date</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="event in events"
						:key="event.id"
						class="table-row"
						@click="toEventDetails(event.id)">
						<td>{{ event.title }}</td>
						<td>{{ event.category }}</td>
						<td>{{ event.modality }}</td>
						<td>{{ event.date }}</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div
			v-else
			class="d-flex justify-content-center align-items-center m-auto">
			<div class="spinner-border text-secondary" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
		</div>
	</div>
</template>

<script setup>
	definePageMeta({
		layout: "main",
	});

	const EventId = useRoute().params.eventID;
	const { events, loading, GetAllEvents } = useEvents();

	const toEventDetails = (eventID) => {
		navigateTo(`/admin/events/${eventID}`);
	};

	onMounted(() => {
		GetAllEvents();
	});
</script>

<style scoped>
	.table-row:hover {
		cursor: pointer;
	}

	table thead tr th {
		position: sticky;
		top: 0;
		z-index: 1;
	}
</style>
