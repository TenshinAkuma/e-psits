<template>
	<div>
		<div
			v-if="!IsEditing"
			class="d-flex justify-content-between align-items-center gap-1">
			<h1 id="event-title" class="fw-bold">{{ EventTitle }}</h1>
			<button
				class="btn btn-outline-secondary"
				style="height: min-content"
				@click="StartEditing">
				Edit
			</button>
		</div>

		<form v-else class="d-flex justify-content-end gap-2">
			<input
				type="text"
				class="form-control border-secondary w-100 border p-2 me-3 fw-bold"
				style="font-size: 1.25rem"
				v-model="NewTitle" />
			<button class="btn btn-success">Save</button>
			<button
				class="btn btn-outline border-0"
				:onclick="() => (IsEditing = !IsEditing)">
				Cancel
			</button>
		</form>
	</div>
</template>

<script setup>
	// const EventId = useRoute().params.eventID;
	const props = defineProps({
		EventTitle: String,
	});

	const NewTitle = ref("");

	const IsEditing = ref(false);

	const StartEditing = () => {
		NewTitle.value = props.EventTitle;
		IsEditing.value = true;
	};

	// TODO: Create OnSaveNewTitle method
</script>

<style scoped>
	#event-title {
		cursor: pointer;
	}
</style>
