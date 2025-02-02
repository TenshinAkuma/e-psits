<template>
	<Dialog
		:dialogId="`create-institution-participant-${InstitutionData.id}`"
		dialogTitle="Add new participant"
		openButtonStyle="btn btn-outline-dark"
		ref="createInstitutionParticipantRef">
		<template #ButtonLabel>
			<i class="bi bi-plus-lg" /> Add new participant
		</template>

		<template #Body>
			<form
				:id="`create-institution-participant-form-${InstitutionData.id}`"
				@submit.prevent="SaveCreate">
				<label class="fw-bold">Name</label>
				<div class="hstack gap-2 mb-3">
					<input
						type="text"
						class="form-control border-secondary"
						placeholder="First name"
						v-model="newParticipant.first_name"
						required/>
					<input
						type="text"
						class="form-control border-secondary"
						placeholder="Last name"
						v-model="newParticipant.last_name"
						required/>
				</div>
				<div class="hstack gap-2 mb-3">
					<div class="w-75">
						<label class="fw-bold">Email</label>
						<input
							type="email"
							class="form-control border-secondary"
							placeholder="participant@mail"
							v-model="newParticipant.email" required/>
					</div>
					<div class="w-75">
						<label class="fw-bold">Contact number</label>
						<input
							type="text"
							class="form-control border-secondary"
							placeholder="09987654321"
							v-model="newParticipant.phone_number" />
					</div>
				</div>
				<div class="hstack gap-2 mb-3">
					<div class="w-75">
						<label class="fw-bold">Address</label>
						<input
							type="text"
							class="form-control border-secondary"
							placeholder="City, Province"
							v-model="newParticipant.address" />
					</div>
					<div class="w-25">
						<label class="fw-bold">Sex</label>
						<select
							class="form-select border-secondary"
							v-model="newParticipant.sex">
							<option value="Male" selected>Male</option>
							<option value="Female">Female</option>
						</select>
					</div>
				</div>
				<div class="hstack gap-2 mb-3">
					<div class="w-25">
						<label class="fw-bold">Year level</label>
						<input
							type="number"
							max="5"
							min="1"
							class="form-control border-secondary"
							placeholder="1"
							v-model="newParticipant.year_level"/>
					</div>
					<div class="w-75">
						<label class="fw-bold">Course</label>
						<input
							type="text"
							class="form-control border-secondary"
							placeholder="Information technology"
							v-model="newParticipant.course"/>
					</div>
				</div>
			</form>

			<p v-if="errMsg" class="text-center text-danger fs-7">
				{{ errMsg }}
			</p>
		</template>

		<template #Submit>
			<button
				type="submit"
				:form="`create-institution-participant-form-${InstitutionData.id}`"
				class="btn btn-primary hstack gap-3"
				:disabled="isLoading">
				<span
					v-if="isLoading"
					class="spinner-border spinner-border-sm"
					aria-hidden="true" />
				<span role="status">Add participant</span>
			</button>
		</template>
	</Dialog>
</template>

<script setup>
	let createInstitutionParticipantRef = ref(null);
	const props = defineProps({
		institution: {
			type: Object,
			required: true,
		},
	});

	const emit = defineEmits(["onCreate"]);

	const InstitutionData = toRef(props, "institution");
	const isLoading = ref(false);
	const errMsg = ref("");

	const newParticipant = ref({
		first_name: "",
		last_name: "",
		email: "",
		phone_number: "",
		sex: "Male",
		address: "",
		year_level: 1,
		course: "",
		institution_id: InstitutionData.value?.id,
	});

	async function SaveCreate() {
		console.log("click");
		isLoading.value = true;
		const { error } = await $fetch(`/api/institution-participants`, {
			method: "POST",
			body: newParticipant.value,
		});

		if (error) {
			console.error("Error saving participant: ", error);
			errMsg.value = error;
			setTimeout(() => {
				errMsg.value = "";
			});
		}

		emit("onCreate");
		isLoading.value = false;
		createInstitutionParticipantRef.value?.closeDialog();
	}
</script>

<style></style>
