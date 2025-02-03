<template>
	<Dialog
		:dialogId="`edit-student-membership-${StudentData.id}`"
		:dialogTitle="`Update ${StudentData.first_name}'s membership.`"
		openButtonStyle="btn-sm"
		ref="editStudentMemberRef">

		<template #ButtonLabel>
			<i class="bi bi-pencil-fill fs-7 text-secondary" />
		</template>

		<template #Body>
			<form
				:id="`edit-student-membership-form-${StudentData.id}`"
				@submit.prevent="SaveMembershipUpdate">
				<label>Select membership status</label>
				<select
					class="form-select border-secondary"
					v-model="membershipUpdate.membership_status">
					<option
						v-for="(status, index) in MembershipStatuses"
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
				:form="`edit-student-membership-form-${StudentData.id}`"
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
	let editStudentMemberRef = ref(null);

	const props = defineProps({
		student: {
			type: Object,
			required: true,
		},
	});
	const emit = defineEmits(["onEdit"]);

	const { MembershipStatuses } = useInputOptions();

	const StudentData = toRef(props, "student");
	const errorMessage = ref("");
	const isLoading = ref(false);

	const membershipUpdate = ref({
		membership_status: StudentData.value?.membership_status,
	});

	async function SaveMembershipUpdate(){
		isLoading.value = true;
		const { error } = await $fetch(
			`/api/membership-participants/${StudentData.value?.id}`,
			{
				method: "PATCH",
				body: membershipUpdate.value,
			}
		);

		if (error) {
			console.error(error);
			errorMessage.value = "Internal server error. Please try again.";
			setTimeout(() => {
				errorMessage.value = "";
			}, 3000);

			isLoading.value = false;
			return;
		}

		emit("onEdit");
		editStudentMemberRef.value.closeDialog();
	};
</script>

<style></style>
