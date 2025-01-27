<template>
	<Dialog
		:dialogId="`edit-rules-${ruleData?.id}`"
		dialogTitle="Update Guideline"
		openButtonStyle="btn-sm text-secondary"
		ref="editRulesRef">
		<template #ButtonLabel>
			<i class="bi bi-pencil-fill fs-7" />
		</template>

		<template #Body>
			<form
				:id="`edit-rule-form-${ruleData?.id}`"
				@submit.prevent="OnSaveEdit">
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
				:form="`edit-rule-form-${ruleData?.id}`"
				class="btn btn-success hstack gap-3"
				:disabled="isSaving">
				<span
					v-if="isSaving"
					class="spinner-border spinner-border-sm"
					aria-hidden="true" />
					<i v-else class="bi bi-floppy2-fill"/>
					<span role="status">Save edit</span>
			</button>
		</template>
	</Dialog>
</template>

<script setup>
	let editRulesRef = ref(null);
	const props = defineProps({
		rule: {
			type: Object,
			required: true,
		},
	});

	const emit = defineEmits(["onEdit"])

	const isSaving = ref(false);
	const errorMessage = ref("");

	const ruleData = toRef(props, "rule")

	const ruleEdit = ref({
		name: ruleData.value?.name,
		description: ruleData.value?.description,
	});

	const {
		data: _rulesData,
		execute: SaveEdit,
	} = await useFetch(`/api/event-rules/${ruleData.value?.id}`, {
		method: "PATCH",
		body: ruleEdit,
		immediate: false,
		watch: false,
	});

	const OnSaveEdit = async () => {
		isSaving.value = true;
		try {
			if (ruleEdit.value?.name == "" || ruleEdit.value?.description == "") {
				throw new Error("Invalid inputs.")
			}

			await SaveEdit();

			if (_rulesData.value?.error) {
				throw new Error(_rulesData.value?.error);
			}

			emit("onEdit");
			editRulesRef.value?.closeDialog();
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
