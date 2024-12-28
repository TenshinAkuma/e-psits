<template>
	<div v-if="criteriaData.success">
		<div class="d-flex justify-content-between align-items-center mb-3">
			<CriteriaCreate />
		</div>
		<div class="table-responsive rounded-3">
			<table
				class="table table-borderless align-middle"
				style="cursor: pointer">
				<thead>
					<tr>
						<th scope="col">Name</th>
						<th scope="col">Description</th>
						<th scope="col">Rating</th>
						<th scope="col"></th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="criteria in criteriaData.data"
						:key="criteria.id"
						style="height: 114px">
						<td class="fw-bold">{{ criteria.name }}</td>
						<td class="text-secondary">
							<p style="max-width: 48ch; margin: 0">
								{{ criteria.description }}
							</p>
						</td>
						<td class="fw-bold">
							<div class="w-100">
								{{ criteria.rating }}%
							</div>
						</td>
						<td>
							<CriteriaEdit :criteriaId="criteria.id" />
							<CriteriaDelete :criteriaId="criteria.id" />
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>

	<div v-else class="d-flex flex-column align-items-center p-5">
		<p class="text-center fw-bold">Event criteria is empty.</p>
		<CriteriaCreate />
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
