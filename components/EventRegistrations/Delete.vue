<template>
	<Dialog
		:dialogId="`delete-registration-${registrationData.id}`"
		:dialogTitle="`Delete ${registrationData.participants.first_name}'s registration data.`"
		openButtonStyle="btn-sm"
		ref="deleteRegistrationRef">
		<template #ButtonLabel>
			<i class="bi bi-trash-fill fs-7 text-secondary" />
		</template>

		<template #Body>
         <p>This action cannot be undone.</p>
      </template>
		<template #Submit>
			<button
				class="btn btn-danger htsack gap-3"
				:disabled="isLoading"
            @click="OnDeleteRegistration()">
				<span
					v-if="isLoading"
					class="spinner-border spinner-border-sm"
					aria-hidden="true"></span>
				<i v-else class="bi bi-trash-fill"></i>
				<span role="status">Confirm delete</span>
			</button>
		</template>
	</Dialog>
</template>

<script setup>
   let deleteRegistrationRef = ref(null);

	const props = defineProps({
		registration: {
			type: Object,
			required: true,
		},
	});

	const emit = defineEmits(["onDelete"]);

	const registrationData = toRef(props, "registration");
	const isLoading = ref(false);
	const errorMessage = ref("");

	const { data: _registrationData, execute: DeleteRegistration } =
		await useFetch(`/api/event-registrations/${registrationData.value?.id}`, {
			method: "DELETE",
			immediate: false,
			watch: false,
		});

	const OnDeleteRegistration = async () => {
		isLoading.value = true;
		try {
			await DeleteRegistration();

			if (_registrationData.value?.error) {
				throw new Error(_registrationData.value?.error);
			}

			emit("onDelete");
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

   const closeDialog = () =>{
      deleteRegistrationRef.value?.closeDialog();
   }
</script>

<style></style>
