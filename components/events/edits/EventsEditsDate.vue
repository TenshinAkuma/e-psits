<template>
	<div>
		<div class="d-flex justify-content-between">
			<div class="fw-bold text-secondary">Date</div>
			<button
				class="btn btn-sm d-flex align-items-center text-secondary"
				@click="ToggleEdit">
				<Icon name="material-symbols:edit-outline-rounded" />
			</button>
		</div>
		<div v-if="!IsEditingDate">{{ formatDateString(EventDate) }}</div>

		<form v-else>
			<input
				v-model="newDate"
				type="date"
				class="form-control border-secondary p-2 mb-3 w-100" />
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
		EventDate: { type: String },
	});

	const newDate = ref();
	const IsEditingDate = ref(false);

	const ToggleEdit = () => {
		IsEditingDate.value = !IsEditingDate.value;
		if (IsEditingDate.value) {
			// Convert EventDate to YYYY-MM-DD format (if not already)
			const date = new Date(props.EventDate);
			newDate.value = isNaN(date.getTime())
				? "" // Handle invalid dates gracefully
				: date.toISOString().split("T")[0]; // Extract YYYY-MM-DD
		}
	};
</script>

<style></style>
