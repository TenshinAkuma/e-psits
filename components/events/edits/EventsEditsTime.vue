<template>
	<div>
		<div class="d-flex justify-content-between">
			<div class="fw-bold text-secondary">Time</div>
			<button
				class="btn btn-sm d-flex align-items-center text-secondary"
				@click="ToggleEdit">
				<Icon name="material-symbols:edit-outline-rounded" />
			</button>
		</div>
		<div v-if="!IsEditingTime">
			{{
				new Date(props.EventTime).toLocaleTimeString([], {
					hour: "2-digit",
					minute: "2-digit",
				})
			}}
		</div>

		<form v-else>
			<input
				type="time"
				v-model="newTime"
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
		EventTime: {
			type: String,
		},
	});

	const newTime = ref();
	const IsEditingTime = ref(false);

	const ToggleEdit = () => {
		IsEditingTime.value = !IsEditingTime.value;
		if (IsEditingTime.value) {
			// Parse the string into a Date object
			const eventDate = new Date(props.EventTime);

			// Extract and format time as HH:MM
			const hours = eventDate.getHours().toString().padStart(2, "0");
			const minutes = eventDate
				.getMinutes()
				.toString()
				.padStart(2, "0");
			newTime.value = `${hours}:${minutes}`;
		}
	};
</script>

<style></style>
