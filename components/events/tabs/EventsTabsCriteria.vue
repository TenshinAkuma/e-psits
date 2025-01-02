<template>
	<div
		v-if="eventCriteria == null || criteriaLength == 0"
		class="d-flex flex-column justify-content-center align-items-center"
		style="height: 576px">
		<p class="fs-7">Event criteria is empty.</p>
		<CriteriaCreate />
	</div>

	<div v-else>
		<div class="d-flex justify-content-between align-items-center mb-3">
			<CriteriaCreate />
		</div>
		<div class="table-responsive overflow-y-auto" style="height: 576px">
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
						v-for="criteria in eventCriteria"
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
								<CriteriaEdit :criteria="criteria" />
								<CriteriaDelete
									:criteriaId="criteria.id" />
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup>
	const eventID = useRoute().params.eventID;
	const eventCriteria = useEventCriteria();

	const criteriaLength = computed(() => eventCriteria.value?.length);
</script>
