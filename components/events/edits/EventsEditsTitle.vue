<template>
	<div>
		<div
			v-if="!IsEditing"
			class="d-flex justify-content-between align-items-center gap-1">
			<h1 id="event-title" class="fw-bold">{{ EventTitle }}</h1>
			<button
				class="btn btn-outline-secondary"
				style="height: min-content"
				:onclick="() => (IsEditing = !IsEditing)">
				<Icon name="material-symbols:edit-outline-rounded" />
				Edit
			</button>
		</div>

		<div v-else class="d-flex justify-content-end gap-2">
			<input
				type="text"
				class="form-control border-secondary w-100 border me-3"
				v-model="EventTitle" />
			<button
				class="btn btn-outline-secondary"
				:onclick="() => (IsEditing = !IsEditing)">
				Cancel
			</button>
			<button class="btn btn-success">Save</button>
		</div>
	</div>
</template>

<script setup>
	const EventId = useRoute().params.eventID;
	const EventTitle = defineModel("EventTitle");

	const IsEditing = ref(false);
</script>

<style scoped>
	#event-title {
		cursor: pointer;
	}
</style>
