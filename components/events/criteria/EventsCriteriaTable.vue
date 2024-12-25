<template>
	<div>
		<div class="table-responsive rounded-3">
			<table class="table align-middle" style="cursor: pointer">
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
						v-for="criteria in criteriaData.criteria"
						:key="criteria.id"
						style="height: 56px">
						<td class="fw-bold">{{ criteria.name }}</td>
						<td class="text-secondary">
							{{ criteria.description }}
						</td>
						<td class="fw-bold">{{ criteria.rating }}%</td>
						<td class="hstack">
							<button type="button " class="btn">
								<i
									class="bi bi-pencil-fill"
									style="font-size: 0.8rem" />
							</button>
							<EventsCriteriaDelete
								:criteriaId="criteria.id" />
						</td>
					</tr>
				</tbody>
			</table>
		</div>
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
