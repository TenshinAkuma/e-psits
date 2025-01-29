<template>
	<div>
		<Dialog
			:dialogId="`create-rules-${event.id}`"
			dialogTitle="Add New Event Guideline"
			openButtonStyle="btn-outline-dark fw-bold hstack gap-2"
			ref="createRulesRef">
			<template #ButtonLabel>
				<i class="bi bi-plus-lg" /> Add new guideline
			</template>

			<template #Body>
				<form :id="`create-rules-form-${event.id}`"
				@submit.prevent="OnAddRule"
				class="text-start">
					<p class="text-secondary lh-sm">
						Define clear and concise guidelines to ensure a
						smooth and successful event experience for
						everyone involved.
					</p>

					<input
						type="text"
						class="form-control border-secondary mb-2"
						placeholder="Name"
						v-model="newRule.name" required />

					<p
						class="text-secondary lh-sm"
						style="font-size: 0.8rem">
						Provide a short, descriptive name for the rule.
						Make it specific and easy to reference.
					</p>

					<textarea
						name=""
						id=""
						class="form-control border-secondary mb-2"
						placeholder="Description"
						rows="5"
						style="max-height: 288px"
						v-model="newRule.description" required />

					<p
						class="text-secondary lh-sm"
						style="font-size: 0.8rem">
						Explain the rule in detail. Include any necessary
						context or examples to help participants
						understand and follow it.
					</p>
					<p class="fs-7 text-danger text-center m-0">
						{{ errorMessage }}
					</p>
				</form>
			</template>
			<template #Submit>
				<button
					type="submit"
					:form="`create-rules-form-${event.id}`"
					class="btn btn-primary hstack gap-3"
					:disabled="isSaving">
					<span
						v-if="isSaving"
						class="spinner-border spinner-border-sm"
						aria-hidden="true" />
					<span role="status">Add guideline</span>
				</button>
			</template>
		</Dialog>
	</div>
</template>

<script setup>
	let createRulesRef = ref(null);
	const props = defineProps({
		event: {
			type: Object,
			required: true,
		},
	});
	const emit = defineEmits(["onCreate"]);

	const eventData = toRef(props, "event");
	const isSaving = ref(false);
	const errorMessage = ref("");

	const newRule = ref({
		event_id: eventData.value?.id,
		name: "",
		description: "",
	});

	const { data: _rulesData, execute: AddRule } = await useFetch("/api/event-rules",
		{
			method: "POST",
			body: newRule,
			immediate: false,
			watch: false,
		});

	const OnAddRule = async () => {
		isSaving.value = true;
		try {
			if (newRule.name == "" || newRule.description == "") {
				throw new Error("Invalid inputs.")
			}

			await AddRule();

			if (_rulesData.value?.error) {
				throw new Error(_rulesData.value?.error);
			}

			resetInput();
			emit("onCreate");
			createRulesRef.value?.closeDialog();
		} catch (err) {
			console.error("Error while adding event guideline", err.message);
			errorMessage.value = err.message;
			setTimeout(() => {
				errorMessage.value = "";
			}, 3000);
		} finally {
			isSaving.value = false;
		}
	};

	const resetInput = () => {
		newRule.value.name = "";
		newRule.value.description = "";
	};
</script>

<style></style>
