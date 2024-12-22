<template>
	<div class="table-responsive rounded-3">
		<table class="table table-borderles align-middle">
			<thead class="table-secondary">
				<tr>
					<th scope="col">Name</th>
					<th scope="col">Description</th>
					<th scope="col">Rating</th>
					<th scope="col"></th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="criteria in criteriaData.criteria"
					:key="criteria.id"
					style="height: 72px">
					<td class="h5 fw-bold">{{ criteria.name }}</td>
					<td class="text-secondary">
						{{ criteria.description }}
					</td>
					<td class="h5 fw-bold">{{ criteria.rating }}%</td>
					<td>
						<div class="hstack gap-2">
							<button
								class="btn btn-success hstack gap-2 ms-auto">
								<i class="bi bi-pen-fill" />
							</button>
							<button class="btn btn-danger">
								<i class="bi bi-trash-fill" />
							</button>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup>
	const eventID = useRoute().params.eventID;
	const { data: criteriaData, status } = await useFetch(
		`/api/events/${eventID}/criteria`,
		{
			method: "GET",
		}
	);
</script>

<style></style>
