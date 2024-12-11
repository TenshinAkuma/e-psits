<template>
	<div>
		<div class="d-flex justify-content-between align-items-center gap-3">
			<h4 class="fw-bold m-0">COORDINATORS</h4>
		</div>

		<hr />

		<div
			v-if="status === 'success'"
			class="table-responsive rounded-3"
			style="height: 576px">
			<table class="table table-hover table-borderless">
				<thead class="table-secondary">
					<tr>
						<th scope="col">Name</th>
						<th scope="col">Position</th>
						<th scope="col">Email</th>
						<th scope="col">Institution</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(coordinator, index) in coordinators"
						:key="index"
						class="table-row"
						@click="NavigateToPage(coordinator.id)">
						<td>{{ coordinator.name }}</td>
						<td>{{ coordinator.position }}</td>
						<td>{{ coordinator.email }}</td>
						<td>{{ coordinator.institutions?.name }}</td>
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

	const {
		data: coordinators,
		status,
		error,
	} = await useFetch(`/api/coordinators`);

	const NavigateToPage = (id) => {
		navigateTo(`/admin/coordinators/${id}`);
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
