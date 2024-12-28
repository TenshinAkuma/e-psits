<template>
	<div v-if="criteriaData.success">
		<div class="d-flex justify-content-between align-items-center mb-3">
			<CriteriaCreate />
		</div>
		<div class="table-responsive rounded-3">
			<table class="table table-borderless align-middle">
				<thead>
					<tr>
						<th scope="col">Criteria</th>
						<th scope="col">Rating</th>
						<th scope="col"></th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="criteria in criteriaData.data"
						:key="criteria.id"
						style="height: 114px">
						<td>
							<p class="fw-bold mb-1">
								{{ criteria.name }}
							</p>
							<p
								class="fs-7 lh-sm text-secondary"
								style="max-width: 56ch">
								{{ criteria.description }}
							</p>
						</td>
						<td class="fw-bold">
							<div class="w-100">
								{{ criteria.rating }}%
							</div>
						</td>
						<td>
							<div class="d-flex justify-content-end">
								<CriteriaEdit
									:criteriaId="criteria.id" />
								<CriteriaDelete
									:criteriaId="criteria.id" />
							</div>
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
