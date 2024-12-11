<template>
	<div class="">
		<div class="d-flex justify-content-between align-items-center gap-3">
			<h4 class="fw-bold m-0">INSTITUTIONS</h4>
			<button class="btn btn-sm btn-primary">Add institution</button>
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
						<th scope="col">Email</th>
						<th scope="col">Address</th>
						<th scope="col">Coordinator</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(institution, index) in institutions"
						:key="index"
						class="table-row"
						@click="NavigateToPage(institution.id)">
						<td>{{ institution.name }}</td>
						<td>{{ institution.email }}</td>
						<td>{{ institution.address }}</td>
						<td>
							<div>
								{{ institution.coordinators.name }}
							</div>
							<p
								style="font-size: 0.9rem"
								class="text-secondary">
								{{ institution.coordinators.email }}
							</p>
						</td>
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

	const { data: institutions, status } = useFetch(`/api/institutions`);

	const NavigateToPage = (institutionID) => {
		navigateTo(`/admin/institutions/${institutionID}`);
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
