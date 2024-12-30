<template>
	<div>
		<div class="mb-3">
			<RulesCreate :rulesId="0" />
		</div>
		<ul class="list-group">
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
				<p
					class="fs-7 text-secondary lh-sm"
					style="max-width: 56ch">
					{{ rule.description }}
				</p>
			</li>
		</ul>
	</div>
</template>

<script setup>
	const eventRules = useEventRules();

	const { data: _rulesData, status: _rulesStatus } = await useFetch(
		"/api/event-rules",
		{
			method: "GET",
		}
	);

	eventRules.value = _rulesData.value?.data;
</script>

<style></style>
