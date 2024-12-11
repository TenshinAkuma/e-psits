<template>
	<div class="">
		<div class="d-flex justify-content-between align-items-center gap-3">
			<h4 class="fw-bold m-0">EVENTS</h4>
			<EventsCreateModal />
		</div>

		<hr />
		<div
			v-if="status === 'success'"
			class="table-responsive rounded-3"
			style="height: 576px">
			<table class="table table-hover table-borderless">
				<thead class="table-secondary">
					<tr>
						<th scope="col">Title</th>
						<th scope="col">Category</th>
						<th scope="col">Type</th>
						<th scope="col">Date</th>
						<th scope="col">Status</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="event in events"
						:key="event.id"
						class="table-row"
						@click="ToEventDetailsPage(event.id)">
						<td>{{ event.title }}</td>
						<td>{{ event.category }}</td>
						<td>{{ event.type }}</td>
						<td>
							{{ new Date(event.date).toLocaleString() }}
						</td>
						<td>{{ event.status }}</td>
					</tr>
				</tbody>
			</table>
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
	const { data: events, status } = useFetch("/api/events");

	const ToEventDetailsPage = (id) => {
		navigateTo(`/admin/events/	${id}`);
	};
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
