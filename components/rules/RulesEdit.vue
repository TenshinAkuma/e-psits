<template>
	<Dialog
		:dialogId="`edit-rules-${ruleData?.id}`"
		dialogTitle="Update Guideline"
		openButtonStyle="btn-sm text-secondary"
		ref="editRulesRef">
		<template #ButtonLabel>
			<i class="bi bi-pencil-fill" style="font-size: 0.5rem" />
		</template>

		<template #Body>
			<form
				:id="`editRuleForm-${ruleData.id}`"
				@submit.prevent="OnSaveRulesEdit">
				<p class="text-secondary lh-sm">
					Define clear and concise guidelines to ensure a smooth
					and successful event experience for everyone involved.
				</p>

				<input
					type="text"
					class="form-control border-secondary mb-2"
					placeholder="Name"
					v-model="ruleEdit.name" />

				<p class="text-secondary lh-sm" style="font-size: 0.8rem">
					Provide a short, descriptive name for the rule. Make it
					specific and easy to reference.
				</p>

				<textarea
					name=""
					id=""
					class="form-control border-secondary mb-2"
					placeholder="Description"
					rows="6"
					style="max-height: 288px"
					v-model="ruleEdit.description" />

				<p class="text-secondary lh-sm" style="font-size: 0.8rem">
					Explain the rule in detail. Include any necessary
					context or examples to help participants understand and
					follow it.
				</p>
				<p class="fs-7 text-danger text-center m-0">
					{{ errorMessage }}
				</p>
			</form>
		</template>
		<template #Submit>
			<button
				type="submit"
				:form="`editRuleForm-${ruleData.id}`"
				class="btn btn-success hstack gap-2 px-5"
				:disabled="_rulesStatus === 'pending'">
				<span
					v-if="_rulesStatus === 'pending'"
					class="spinner-border spinner-border-sm"
					aria-hidden="true" />
				<span role="status">Save update</span>
			</button>
		</template>
	</Dialog>
</template>

<script setup>
	const props = defineProps({
		ruleData: Object,
	});

	const editRulesRef = ref(null);
	const eventRules = useEventRules();
	const errorMessage = ref("");

	const ruleEdit = ref({
		name: props.ruleData?.name,
		description: props.ruleData?.description,
	});

	const {
		data: _rulesData,
		status: _rulesStatus,
		execute: SaveRulesEdit,
	} = await useFetch(`/api/event-rules/${props.ruleData.id}`, {
		method: "PATCH",
		body: ruleEdit,
		immediate: false,
		watch: false,
	});

	const OnSaveRulesEdit = async () => {
		try {
			await SaveRulesEdit();

			if (_rulesData.value?.error) {
				throw new Error(_rulesData.value?.error);
			}

			const ruleIndex = eventRules.value?.findIndex(
				(r) => r.id === props.ruleData?.id
			);

			if (ruleIndex < 0) {
				throw new Error("Invalid rule index. Rule does not exists");
			}

			eventRules.value[ruleIndex] = _rulesData.value?.data;
			editRulesRef.value?.closeDialog();
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
