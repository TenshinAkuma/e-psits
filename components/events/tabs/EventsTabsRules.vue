<template>
	<div
		v-if="eventRules.length === 0 || eventRules == null"
		class="d-flex flex-column justify-content-center align-items-center"
		style="height: 576px">
		<p class="fs-7">Event guidelines are empty.</p>
		<RulesCreate />
	</div>

	<div v-else>
		<div class="hstack gap-3 mb-3">
			<RulesCreate />
		</div>
		<ul class="list-group overflow-y-auto" style="max-height: 576px">
			<li
				v-for="rule in eventRules"
				:key="rule.id"
				class="list-group-item p-3">
				<div class="d-flex justify-content-between">
					<p class="fw-bold m-0">{{ rule.name }}</p>
					<div class="hstack gap-2">
						<RulesEdit :ruleData="rule" />
						<RulesDelete :ruleId="rule.id" />
					</div>
				</div>
				<p class="fs-7 text-secondary lh-sm">
					{{ rule.description }}
				</p>
			</li>
		</ul>
	</div>
</template>

<script setup>
	const eventRules = useEventRules();
	const eventID = useRoute().params.eventID;

	const { data: _rulesData, status: _rulesStatus } = await useFetch(
		`/api/event-rules/${eventID}`,
		{
			method: "GET",
		}
	);

	eventRules.value = _rulesData.value?.data;
</script>
