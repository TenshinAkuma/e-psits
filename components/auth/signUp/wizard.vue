<template>
	<div>
		<nav>
			<div
				class="nav nav-pills d-flex justify-content-around mb-5"
				id="nav-tab"
				role="tablist">
				<!-- Navigation Buttons -->
				<div
					v-for="(label, index) in labels"
					:key="index"
					class="vstack align-items-center fw-bold gap-2">
					<button
						:class="[
							'nav-link rounded-circle',
							{ active: currentStep === index },
						]"
						:id="`nav-tab-${index}`"
						data-bs-toggle="tab"
						:data-bs-target="`#nav-step-${index}`"
						type="button"
						role="tab"
						:aria-controls="`nav-step-${index}`"
						:aria-selected="currentStep === index"
						disabled>
						<!-- Slot for the label -->
						{{ index + 1 }}
					</button>

					<slot :name="`label-${label}`" />
				</div>
			</div>
		</nav>
		<div
			class="tab-content"
			id="nav-tabContent"
			:style="{ height: height }">
			<!-- Tab Content -->
			<div
				v-for="(label, index) in labels"
				:key="index"
				:class="[
					'tab-pane fade',
					{ 'show active': currentStep === index },
				]"
				:id="`nav-step-${index}`"
				role="tabpanel"
				:aria-labelledby="`nav-tab-${index}`"
				tabindex="0">
				<!-- Slot for the step content -->
				<slot :name="`step-${label}`" />
			</div>
		</div>
		<div class="d-flex justify-content-end gap-2">
			<button
				v-if="currentStep != 0"
				type="button"
				@click="previousStep"
				class="btn btn-outline-secondary">
				Previous
			</button>
			<button
				v-if="currentStep != labels.length - 1"
				@click="nextStep"
				type="button"
				class="btn btn-primary">
				Next
			</button>
			<button
				v-if="currentStep == labels.length - 1"
				type="submit"
				:form="formName"
				class="btn btn-primary">
				Create account
			</button>
		</div>
	</div>
</template>

<script setup>
	const props = defineProps({
		labels: Array,
		height: String,
		formName: String,
	});

	// Current step state
	const currentStep = ref(0);

	const previousStep = () => {
		if (currentStep.value > 0) {
			currentStep.value--;
		}
	};

	const nextStep = () => {
		if (currentStep.value < props.labels.length - 1) {
			currentStep.value++;
		}
	};
</script>

<style></style>
