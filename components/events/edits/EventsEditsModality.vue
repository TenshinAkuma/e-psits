<template>
	<div>
		<div v-if="!IsEditingModality">
			<div class="d-flex justify-content-between mb-1">
				<div class="fw-bold text-secondary">Modality</div>
				<button
					class="btn btn-sm d-flex align-items-center text-secondary"
					@click="StartEditingModality">
					<Icon name="material-symbols:edit-outline-rounded" />
				</button>
			</div>
			<div class="text-dark">{{ EventModality }}</div>
		</div>

		<form v-else>
			<select
				v-model="newModality"
				class="form-select border-secondary p-2 mb-3 w-100">
				<option :value="newModality" selected disabled>
					{{ newModality }}
				</option>
				<option
					v-for="(mode, index) in eventModality"
					:key="index"
					:value="mode">
					{{ mode.toString() }}
				</option>
			</select>
			<div class="d-flex justify-content-end gap-2">
				<button
					class="btn btn-outline-secondary"
					@click="
						() => (IsEditingModality = !IsEditingModality)
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
		EventModality: String,
	});

	const newModality = ref("");
	const IsEditingModality = ref(false);

	const StartEditingModality = () => {
		newModality.value = props.EventModality;
		IsEditingModality.value = true;
	};

	const eventModality = ["In-person", "Virtual"];
</script>

<style></style>
