<template>
	<div class="">
		<div class="d-flex justify-content-between align-items-center gap-3">
			<h4 class="fw-bold m-0">INSTITUTIONS</h4>
			<EventsCreateModal />
		</div>

		<hr />
		<div
			v-if="status === 'success'"
			class="table-responsive"
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

	const { data: institutions, status } = await useFetch(`/api`);
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
