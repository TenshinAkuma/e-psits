<template>
	<div class="w-100">
		<div>
			<div
				v-if="!isEditing"
				class="d-flex justify-content-between align-items-center">
				<h2 class="fw-bold mb-0">
					{{ ParticipantName }}
				</h2>
				<div class="hstack gap-2">
					<button
						type="button"
						class="btn btn-sm btn-outline-success"
						@click="ToggleEdit">
						Edit
					</button>
					<button
						type="button"
						class="btn btn-sm btn-outline-danger">
						Remove
					</button>
				</div>
			</div>

			<form
				v-else
				id="editNameStatusForm"
				class="hstack align-items-center gap-2 mb-2">
				<input
					type="text"
					class="form-control border-secondary w-100 border p-2 me-3 fw-bold"
					v-model="newName" />

				<button type="submit " class="btn btn-sm btn-success">
					Save
				</button>
				<button
					type="button"
					class="btn btn-sm btn-outline-secondary"
					@click="ToggleEdit">
					Cancel
				</button>
			</form>

			<div class="d-flex align-items-center gap-2">
				<div
					v-if="!isEditing"
					:class="`px-3 py-2 rounded-pill badge ${registrationStatus(
						ParticipantStatus
					)}`"
					style="font-size: 0.7rem">
					{{ ParticipantStatus }}
				</div>

				<select
					v-else
					form="editNameStatusForm"
					class="form-select border-secondary"
					style="width: max-content"
					v-model="newStatus">
					<option :value="newStatus" selected disabled hidden>
						{{ newStatus }}
					</option>
					<option
						v-for="(status, index) in statuses"
						:key="index"
						value="status">
						{{ status }}
					</option>
				</select>

				<div class="text-secondary">
					<b>{{ ParticipantName }}</b> will participate on
					<a
						:href="`/admin/events/${ParticipantEventId}`"
						class="link-secondary link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover fw-bold">
						{{ ParticipantEvent }}
					</a>
					event.
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	const props = defineProps({
		ParticipantName: String,
		ParticipantStatus: String,
		ParticipantEvent: String,
		ParticipantEventId: Number,
	});

	const newName = ref();
	const newStatus = ref();
	const isEditing = ref(false);

	const ToggleEdit = () => {
		isEditing.value = !isEditing.value;
		if (isEditing) {
			newName.value = props.ParticipantName;
			newStatus.value = props.ParticipantStatus;
		}
	};

	const statuses = ["Registered", "Cancelled", "Pending"];

	const registrationStatus = (status) => {
		switch (status) {
			case "Registered":
				return "text-bg-primary";
			case "Cancelled":
				return "text-bg-danger";
			default:
				return "text-bg-secondary";
		}
	};
</script>

<style></style>
