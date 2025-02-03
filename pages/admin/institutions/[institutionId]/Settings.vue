<template>
	<article
		v-if="isLoading"
		class="d-flex flex-column justify-content-center align-items-center"
		style="height: 576px">
		<p>Loading institution...</p>
		<div class="spinner-border" role="status">
			<span class="visually-hidden">Loading...</span>
		</div>
	</article>

	<section v-else class="pb-5">
		<article>
			<h1 class="fw-bold">{{ InstitutionData.name }}</h1>
		</article>

		<br />
		<InstitutionsTabs activeTab="settings" />
		<br />

		<section class="col-lg-8 col-md-12">
			<h4 class="fw-bold">Edit Institution Info</h4>
			<hr />

			<form
				:id="`institution-edit-form-${InstitutionData.id}`"
				@submit.prevent="SaveInstitutionEdit">
				<dl class="row g-2">
					<dt class="col-sm-3">Name</dt>
					<dd class="col-sm-9">
						<input
							type="text"
							class="form-control border-secondary"
							v-model="institutionEdit.name" />
					</dd>

					<dt class="col-sm-3">Address</dt>
					<dd class="col-sm-9">
						<input
							type="text"
							class="form-control border-secondary"
							v-model="institutionEdit.address" />
					</dd>

					<dt class="col-sm-3">Email</dt>
					<dd class="col-sm-9">
						<input
							type="email"
							class="form-control border-secondary"
							v-model="institutionEdit.email" />
					</dd>

					<dt class="col-sm-3">Telephone num.</dt>
					<dd class="col-sm-9">
						<input
							type="text"
							class="form-control border-secondary"
							v-model="institutionEdit.contact_number" />
					</dd>
				</dl>
				<div class="d-flex justify-content-end">
					<button
						type="submit"
						:form="`institution-edit-form-${InstitutionData.id}`"
						class="d-flex align-items-center btn btn-success gap-3 px-3"
						:disabled="isSavingInstitution">
						<span
							v-if="isSavingInstitution"
							class="spinner-border spinner-border-sm"
							aria-hidden="true"></span>
						<span role="status">Save edit</span>
					</button>
				</div>
			</form>

			<br />
			<br />

			<h4 class="fw-bold">Edit Coordinator Info</h4>
			<hr />

			<form
				:id="`coordinator-edit-form-${InstitutionData.coordinator_id}`"
				@submit.prevent="SaveCoordinatorEdit">
				<dl class="row g-2">
					<dt class="col-sm-3">Name</dt>
					<dd class="col-sm-5">
						<input
							type="text"
							class="form-control border-secondary"
							v-model="coordinatorEdit.first_name" />
					</dd>
					<dd class="col-sm-4">
						<input
							type="text"
							class="form-control border-secondary"
							v-model="coordinatorEdit.last_name" />
					</dd>

					<dt class="col-sm-3">Position</dt>
					<dd class="col-sm-9">
						<input
							type="text"
							class="form-control border-secondary"
							v-model="coordinatorEdit.position" />
					</dd>

					<dt class="col-sm-3">Email</dt>
					<dd class="col-sm-9">
						<input
							type="email"
							class="form-control border-secondary"
							v-model="coordinatorEdit.email" />
					</dd>

					<dt class="col-sm-3">Contact num.</dt>
					<dd class="col-sm-9">
						<input
							type="text"
							class="form-control border-secondary"
							v-model="coordinatorEdit.contact_number" />
					</dd>
				</dl>
				<div class="d-flex justify-content-end">
					<button
						type="submit"
						:form="`coordinator-edit-form-${InstitutionData.coordinator_id}`"
						class="d-flex align-items-center btn btn-success gap-3 px-3"
						:disabled="isSavingCoordinator">
						<span
							v-if="isSavingCoordinator"
							class="spinner-border spinner-border-sm"
							aria-hidden="true"></span>
						<span role="status">Save edit</span>
					</button>
				</div>
			</form>

			<br />
			<br />
			<br />
			<article>
				<h4 class="fw-bold">Danger Zone</h4>
				<hr />

				<div
					class="d-flex justify-content-between align-items-center bg-danger bg-opacity-10 border border-danger rounded rounded-3 p-4">
					<p class="m-0">
						<b>Delete this institution</b> <br />
						<span
							>Once this institution is deleted, it cannot be
							undone.</span
						>
					</p>
					<InstitutionsDelete :institution="InstitutionData" />
				</div>
			</article>
		</section>
	</section>
</template>

<script setup>
	definePageMeta({
		layout: "main",
	});

	const institutionId = useRoute().params.institutionId;
	const InstitutionData = ref({});
	const isLoading = ref(false);
	const isSavingInstitution = ref(false);
	const isSavingCoordinator = ref(false);
	const errorMsg = ref("");

	async function LoadData() {
		isLoading.value = false;
		const { data, error } = await $fetch(
			`/api/institutions/${institutionId}`,
			{ method: "GET" }
		);

		if (error) {
			console.error("Error loading institution data: ", error);
			errorMsg.value = error;

			setTimeout(() => {
				errorMsg.value = "";
			}, 3000);
		}

		InstitutionData.value = data;
		isLoading.value = false;
	}

	await LoadData();

	const institutionEdit = ref({
		name: InstitutionData.value?.name,
		address: InstitutionData.value?.address,
		email: InstitutionData.value?.email,
		contact_number: InstitutionData.value?.contact_number,
	});

	const coordinatorEdit = ref({
		first_name: InstitutionData.value?.coordinators.first_name,
		last_name: InstitutionData.value?.coordinators.last_name,
		position: InstitutionData.value?.coordinators.position,
		email: InstitutionData.value?.coordinators.email,
		contact_number: InstitutionData.value?.coordinators.contact_number,
		sex: InstitutionData.value?.coordinators.sex,
	});

	async function SaveInstitutionEdit() {
		isSavingInstitution.value = true;
		const { error } = await $fetch(
			`/api/institutions/${InstitutionData.value?.id}`,
			{
				method: "PATCH",
				body: institutionEdit.value,
			}
		);

		if (error) {
			errorMsg.value = error;
			setTimeout(() => {
				errorMsg.value = "";
			}, 3000);
		}
		await LoadData();
		isSavingInstitution.value = false;
	}

	async function SaveCoordinatorEdit() {
		isSavingCoordinator.value = true;
		const { error } = await $fetch(
			`/api/coordinators/${InstitutionData.value?.coordinator_id}`,
			{
				method: "PATCH",
				body: coordinatorEdit.value,
			}
		);

		if (error) {
			errorMsg.value = error;
			setTimeout(() => {
				errorMsg.value = "";
			}, 3000);
		}
		await LoadData();
		isSavingCoordinator.value = false;
	}

	const GetFullname = () =>
		`${InstitutionData.value?.coordinators.first_name} ${InstitutionData.value?.coordinators.last_name}`;
</script>
