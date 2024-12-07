<template>
	<div class="w-100">
		<div>
			<div
				v-if="!isEditing"
				class="d-flex justify-content-center align-items-start gap-2">
				<h2 class="fw-bold mb-0">
					{{ ParticipantName }}
				</h2>

				<button
					type="button"
					class="btn btn-sm d-flex align-items-center text-secondary"
					@click="ToggleEdit">
					<Icon name="material-symbols:edit-outline-rounded" />
				</button>
			</div>

			<form
				v-else
				@submit.prevent="OnSaveNewNameStatus"
				id="editNameStatusForm"
				class="mb-2">
				<input
					type="text"
					class="form-control border-secondary w-100 border p-2 mb-3 fw-bold"
					v-model="participant.name" />

				<div class="d-flex justify-content-end gap-2">
					<button
						type="submit "
						class="d-flex align-items-center btn btn-sm btn-success fw-bold gap-2"
						:disabled="status === 'pending'">
						<span
							v-if="status === 'pending'"
							class="spinner-border spinner-border-sm"
							aria-hidden="true" />
						<span role="status">Save</span>
					</button>
					<button
						type="button"
						class="btn btn-sm btn-outline-secondary"
						@click="ToggleEdit">
						Cancel
					</button>
				</div>
			</form>

			<!-- <div class="d-flex align-items-center gap-2">
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
					v-model="participant.registration_status">
					<option
						:value="participant.registration_status"
						selected
						disabled
						hidden>
						{{ participant.registration_status }}
					</option>
					<option
						v-for="(status, index) in statuses"
						:key="index"
						:value="status">
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
			</div> -->
		</div>
	</div>
</template>

<script setup>
	const participantID = useRoute().params.participantID;
	const ParticipantName = defineModel("ParticipantName");

	const participant = ref({
		name: ParticipantName.value,
	});

	const isEditing = ref(false);

	const { status, error, execute, refresh } = await useFetch(
		`/api/participants/${participantID}`,
		{
			method: "PATCH",
			body: participant,
			immediate: false,
			watch: false,
		}
	);

	const OnSaveNewNameStatus = async () => {
		try {
			await execute();
			if (status.value == "success") {
				ToggleEdit();
				ParticipantName.value = participant.value.name;
			}
		} catch (err) {
			console.log(err, error.value);
		}
	};

	const ToggleEdit = () => {
		isEditing.value = !isEditing.value;
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
