<template>
	<div>
		<button
			type="button"
			:id="`dialog-btn-${dialogId}`"
			:class="['btn', openButtonStyle]"
			data-bs-toggle="modal"
			:data-bs-target="`#dialog-${dialogId}`">
			<slot name="ButtonLabel">
				<span>{{ openButtonLabel }}</span></slot
			>
		</button>
		<div
			class="modal"
			:id="`dialog-${dialogId}`"
			tabindex="-1"
			:aria-labelledby="`dialog-btn-${dialogId}`"
			aria-hidden="true"
			ref="dialogRef">
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<slot name="Title">
							<h5 class="modal-title fw-bold">
								{{ dialogTitle }}
							</h5>
						</slot>
						<button
							type="button"
							class="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<slot name="Body">
							<p>Modal body text goes here.</p>
						</slot>
					</div>
					<div class="modal-footer">
						<button
							type="button"
							class="btn"
							data-bs-dismiss="modal">
							Cancel
						</button>
						<slot name="Submit">
							<button
								type="button"
								class="btn btn-primary"
								@click="closeDialog">
								Save changes
							</button>
						</slot>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	const props = defineProps({
		dialogId: "dialogId",
		dialogTitle: "Dialog Title",
		openButtonLabel: "Open Dialog",
		openButtonStyle: "btn-outline-primary",
	});

	const dialogRef = ref(null);
	let dialogComponent = null;

	const closeDialog = () => {
		if (dialogComponent) {
			dialogComponent.hide();
		}
	};

	const openDialog = () => {
		if (dialogComponent) {
			dialogComponent.show();
		}
	};

	onMounted(() => {
		if (dialogRef.value) {
			dialogComponent = new bootstrap.Modal(dialogRef.value);
		}
	});

	defineExpose({
		closeDialog,
		openDialog,
	});
</script>

<style></style>
