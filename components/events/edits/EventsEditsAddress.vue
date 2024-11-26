<template>
	<div>
		<div class="d-flex justify-content-between">
			<div class="fw-bold text-secondary">Address</div>
			<button
				class="btn btn-sm d-flex align-items-center text-secondary"
				@click="ToggleEdit">
				<Icon name="material-symbols:edit-outline-rounded" />
			</button>
		</div>
		<div v-if="!IsEditingAddress" class="text-secondary">
			{{ newAddress || `To be announced` }}
		</div>

		<form v-else>
			<input
				type="text"
				v-model="newAddress"
				class="form-select border-secondary p-2 mb-3 w-100" />
			<div class="d-flex justify-content-end gap-2">
				<button
					class="btn btn-outline-secondary"
					:onclick="ToggleEdit">
					Cancel
				</button>
				<button class="btn btn-success">Save</button>
			</div>
		</form>
	</div>
</template>

<script setup>
	const props = defineProps({
		EventAddress: String,
	});

	const newAddress = ref();
	const IsEditingAddress = ref(false);

	const ToggleEdit = () => {
		IsEditingAddress.value = !IsEditingAddress.value;
		if (IsEditingAddress.value) {
			newAddress.value = props.EventAddress;
		}
	};
</script>

<style></style>
