<template>
	<Dialog
		:dialogId="`delete-rule-${ruleData.id}`"
		:dialogTitle="`Delete ${ruleData.name}`"
		openButtonStyle="btn-sm text-secondary"
		ref="deleteRuleRef">
		<template #ButtonLabel>
			<i class="bi bi-trash-fill fs-7" />
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
				:id="`deleteRule-${ruleData}`"
				@click="OnDeleteRule"
				type="button"
				class="btn btn-danger d-flex gap-2"
				:disabled="isSaving">
				<span
					v-if="isSaving"
					class="spinner-border spinner-border-sm"
					aria-hidden="true" />
					<i v-else class="bi bi-trash-fill"></i>
					<span role="status">Confirm delete</span>
			</button>
		</template>
	</Dialog>
</template>

<script setup>
	let deleteRuleRef = ref(null);

	const props = defineProps({
		rule: {
			type: Object,
			required: true,
		},
	});

	const emit = defineEmits(["onDelete"]);

	const ruleData = toRef(props, "rule");
	const isSaving = ref(false);
	const errorMessage = ref("");

	const { data: _rulesData, execute: DeleteRule } = await useFetch(
		`/api/event-rules/${ruleData.value?.id}`,
		{
			method: "DELETE",
			immediate: false,
			watch: false,
		}
	);

	const OnDeleteRule = async () => {
		isSaving.value = true;
		try {
			await DeleteRule();

			if (_rulesData.value?.error) {
				throw new Error(_rulesData.value?.error);
			}

			emit("onDelete");
			deleteRuleRef.value?.closeDialog();
		} catch (err) {
			console.error(err.message);

			errorMessage.value = err.message;
			setTimeout(() => {
				errorMessage.value = "";
			}, 3000);
		} finally {
			isSaving.value = false;
		}
	};
</script>

<style></style>
