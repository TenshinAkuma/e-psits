<template>
	<div>
		<p class="fw-bold text-secondary">BASIC INFORMATION</p>
		<div v-if="!IsEditingDescription">
			<div class="d-flex justify-content-between mb-1">
				<div class="fw-bold text-secondary">Brief Description</div>
				<button
					class="btn btn-sm d-flex align-items-center"
					@click="StartEditingDescription">
					<Icon name="material-symbols:edit-outline-rounded" />
				</button>
			</div>
			<div class="text-dark" read>
				{{ EventDescription }}
			</div>
		</div>

		<form v-else>
			<textarea
				class="form-control border-secondary p-2 mb-3"
				style="max-height: 216px; resize: vertical"
				rows="4"
				v-model="newDescription" />
			<div class="d-flex justify-content-end gap-2">
				<button
					class="btn btn-outline-secondary"
					@click="
						() =>
							(IsEditingDescription =
								!IsEditingDescription)
					">
					Cancel
				</button>
				<button class="btn btn-success">Save</button>
			</div>
		</form>
	</div>
</template>

<script setup>
	const props = defineProps({
		EventDescription: String,
	});

	const newDescription = ref("");
	const IsEditingDescription = ref(false);

	const StartEditingDescription = () => {
		newDescription.value = props.EventDescription;
		IsEditingDescription.value = true;
	};
</script>

<style></style>
