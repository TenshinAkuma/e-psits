<template>
	<div>
		<Dialog
			dialogId="createRules"
			dialogTitle="Add New Event Guideline"
			openButtonStyle="btn-outline-dark fw-bold"
			ref="createRulesRef">
			<template #ButtonLabel>
				<i class="bi bi-plus-lg" /> Add new guideline
			</template>

			<template #Body>
				<form id="createRuleForm" @submit.prevent="OnCreateRule">
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
					form="createRuleForm"
					class="btn btn-primary hstack gap-2 px-5"
					:disabled="_rulesStatus === 'pending'">
					<span
						v-if="_rulesStatus === 'pending'"
						class="spinner-border spinner-border-sm"
						aria-hidden="true" />
					<span role="status">Add criteria</span>
				</button>
			</template>
		</Dialog>
	</div>
</template>

<script setup>
	const createRulesRef = ref(null);
	const eventID = useRoute().params.eventID;
	const eventRules = useEventRules();
	const errorMessage = ref("");

	const newRule = ref({
		event_id: eventID,
		name: "",
		description: "",
	});

	const {
		data: _rulesData,
		status: _rulesStatus,
		execute: CreateRule,
	} = await useFetch("/api/event-rules", {
		method: "POST",
		body: newRule,
		immediate: false,
		watch: false,
	});

	const OnCreateRule = async () => {
		try {
			if (newRule.name == "" || newRule.description == "") {
				throw new Error("Invalid inputs.")
			}

			await CreateRule();

			if (_rulesData.value.error) {
				throw new Error(_rulesData.value.error);
			}

			eventRules.value?.push(_rulesData.value?.data);
			resetInput();
			createRulesRef.value?.closeDialog();
		} catch (err) {
			console.error("Error while adding event guideline", err.message);

			errorMessage.value = err.message;

			setTimeout(() => {
				errorMessage.value = "";
			}, 3000);
		}
	};

	const resetInput = () => {
		newRule.value.name = "";
		newRule.value.description = "";
	};
</script>

<style></style>
