<template>
	<Dialog
		:dialogId="`edit-participant-registration-${registrationData.id}`"
		:dialogTitle="`Edit ${GetFullname()}'s registration data.`"
		openButtonStyle="btn-sm"
		ref="editParticipantRegistrationRef">
		<template #ButtonLabel>
			<i class="bi bi-pencil-fill fs-7 text-secondary" />
		</template>

		<template #Body>
			<form
				class="text-start"
				:id="`edit-participant-registration-${registrationData.id}`"
				@submit.prevent="OnSaveRegistrationEdit">
				<label>Amount</label>
				<div class="input-group mb-3">
					<span
						class="input-group-text border-secondary bg-secondary bg-opacity-25 fw-bold"
						>₱</span
					>
					<input
						type="number"
						class="form-control border-secondary"
						min="0"
						v-model="registrationEdit.amount" />
				</div>

				<label>Status</label>
				<select
					class="form-select border-secondary"
					v-model="registrationEdit.registration_status">
					<option
						v-for="(status, index) in RegistrationStatuses"
						:key="index"
						:value="status">
						{{ status }}
					</option>
				</select>
			</form>
		</template>

		<template #Submit>
			<button
				type="submit"
				:form="`edit-participant-registration-${registrationData.id}`"
				class="btn btn-success hstack gap-3"
				:disabled="isLoading">
				<span
					v-if="isLoading"
					class="spinner-border spinner-border-sm"
					aria-hidden="true"></span>
				<i v-else class="bi bi-floppy2-fill" />
				<span role="status">Save edit</span>
			</button>
		</template>
	</Dialog>
</template>

<script setup>
	let editParticipantRegistrationRef = ref(null);

	const props = defineProps({
		registration: {
			type: Object,
			required: true,
		},
	});
	const emit = defineEmits(["onEdit"]);

	const { RegistrationStatuses } = useInputOptions();

	const registrationData = toRef(props, "registration");
	const errorMessage = ref("");
	const isLoading = ref(false);

	const registrationEdit = ref({
		amount: registrationData.value?.amount,
		registration_status: registrationData.value?.registration_status,
	});

	const OnSaveRegistrationEdit = async () => {
		isLoading.value = true;
		const { data, error } = await $fetch(
			`/api/participant-events/${registrationData.value?.id}`,
			{
				method: "PATCH",
				body: registrationEdit.value,
			}
		);

		if (error) {
			console.error(error);
			errorMessage.value = error;
			setTimeout(() => {
				errorMessage.value = "";
				isLoading.value = false;
			}, 3000);
			return;
		}

		emit("onEdit");
		editParticipantRegistrationRef.value.closeDialog();
		isLoading.value = false;
	};

	const GetFullname = () =>
		`${registrationData.value?.participants.first_name} ${registrationData.value?.participants.last_name}`;
</script>

<style></style>
