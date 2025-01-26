<template>
	<Dialog
		:dialogId="`edit-registration-${registrationData.id}`"
		dialogTitle="Edit Registration"
		openButtonStyle="btn-sm"
		ref="editRegistrationRef">
		<template #ButtonLabel>
			<i class="bi-pencil-fill fs-7 text-secondary" />
		</template>

		<template #Body>
			<form
				class="text-start"
				:id="`edit-registration-${registrationData.id}`"
				@submit.prevent="OnSaveRegistrationEdit">
				<p>{{ registration.participants.first_name }}</p>
				<label>Amount</label>
				<div class="input-group mb-3">
					<span class="input-group-text">₱</span>
					<input
						type="number"
						class="form-control bg-secondary bg-opacity-10"
						min="0"
                  v-model="registrationEdit.amount"/>
				</div>

				<label>Status</label>
				<select class="form-select bg-secondary bg-opacity-10" v-model="registrationEdit.registration_status">
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
				:form="`edit-registration-${registrationData.id}`"
				class="d-flex align-items-center btn btn-success gap-3 px-3"
				:disabled="isLoading">
				<span
					v-if="isLoading"
					class="spinner-border spinner-border-sm"
					aria-hidden="true"></span>
				<i v-else class="bi bi-floppy2-fill"></i>
				<span role="status">Save edit</span>
			</button>
		</template>
	</Dialog>
</template>

<script setup>
	let editRegistrationRef = ref(null);

	const props = defineProps({
		registration: {
			type: Object,
			required: true,
		},
	});
	const emit = defineEmits(["onSaveEdit"]);

   const { RegistrationStatuses } = useInputOptions();
   
	const registrationData = toRef(props, "registration");
	const errorMessage = ref("");
	const isLoading = ref(false);

	const registrationEdit = ref({
		amount: registrationData.value?.amount,
		registration_status: registrationData.value?.registration_status,
	});

	const { data: _registrationData, execute: SaveRegistrationEdit } =
		await useFetch(
			`/api/event-registrations/${registrationData.value?.id}`,
			{
				method: "PATCH",
				body: registrationEdit,
				immediate: false,
				watch: false,
			}
		);

	const OnSaveRegistrationEdit = async () => {
		isLoading.value = true;
		try {
			await SaveRegistrationEdit();

			if (_registrationData.value?.error) {
				throw new Error(_registrationData.value?.error);
			}

			emit("onSaveEdit");
			closeDialog();
		} catch (error) {
			console.error(error.message);
			errorMessage.value = error.message;
			setTimeout(() => {
				errorMessage.value = "";
			}, 3000);
		} finally {
			isLoading.value = false;
		}
	};

	const closeDialog = () => {
		editRegistrationRef.value.closeDialog();
	};
</script>

<style></style>
