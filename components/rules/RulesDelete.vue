<template>
	<Dialog
		:dialogId="`deleteRule-${ruleId}`"
		dialogTitle="Delete Guideline"
		openButtonStyle="btn-sm text-secondary"
		ref="deleteRuleRef">
		<template #ButtonLabel>
			<i class="bi bi-trash-fill" style="font-size: 0.5rem" />
		</template>

		<template #Body>
			<p class="m-0">
				<strong>This action cannot be undone</strong> <br />
				<span class="text-secondary">
					Are you sure to remove this guideline?
				</span>
			</p>
			<p class="fs-7 text-danger text-center my-2">
				{{ errorMessage }}
			</p>
		</template>

		<template #Submit>
			<button
				@click="OnDeleteRule"
				type="button"
				class="btn btn-danger hstack gap-2 px-5"
				:disabled="_rulesStatus === 'pending'">
				<span
					v-if="_rulesStatus === 'pending'"
					class="spinner-border spinner-border-sm"
					aria-hidden="true" />
				<span role="status">Delete</span>
			</button>
		</template>
	</Dialog>
</template>

<script setup>
	const props = defineProps({
		ruleId: Number,
	});

	const deleteRuleRef = ref(null);
	const eventRules = useEventRules();
	const errorMessage = ref("");

	const {
		data: _rulesData,
		status: _rulesStatus,
		execute: DeleteRule,
	} = await useFetch(`/api/event-rules/${props.ruleId}`, {
		method: "DELETE",
		immediate: false,
		watch: false,
	});

	const OnDeleteRule = async () => {
		try {
			console.log("click");
			await DeleteRule();

			if (_rulesData.value?.error) {
				throw new Error(_rulesData.value?.error);
			}

			const ruleIndex = eventRules.value?.findIndex(
				(r) => r.id === props.ruleId
			);

			if (ruleIndex < 0) {
				throw new Error(
					"Invalid event rule id. Rule does not exists"
				);
			}

			eventRules.value?.splice(ruleIndex, 1);
			deleteRuleRef.value?.closeDialog();
		} catch (err) {
			console.error(err.message);

			errorMessage.value = err.message;
			setTimeout(() => {
				errorMessage.value = "";
			}, 3000);
		}
	};
</script>

<style></style>
