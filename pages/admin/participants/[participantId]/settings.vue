<template>
	<article
		v-if="isLoading"
		class="d-flex flex-column justify-content-center align-items-center"
		style="height: 576px">
		<p>Loading data...</p>
		<div class="spinner-border" role="status">
			<span class="visually-hidden">Loading...</span>
		</div>
	</article>

	<section v-else>
		<article class="d-flex justify-content-between align-items-center">
			<div class="d-flex align-items-center gap-2">
				<Avatar
					:id="`participant-${participantId}`"
					:name="GetFullname()"
					:gender="ParticipantData.sex"
					size="144px" />

				<div>
					<h1 class="fw-bold m-0">{{ GetFullname() }}</h1>
					<p class="hstack gap-3 m-0">
						<i
							class="bi bi-envelope-fill text-secondary fs-7" />
						<span>{{ ParticipantData.email }}</span>
					</p>
					<p class="hstack gap-3 m-0">
						<i
							class="bi bi-building-fill text-secondary fs-7" />
						<NuxtLink
							:to="`/admin/institutions/${ParticipantData.institution_id}`"
							>{{
								ParticipantData.institutions.name
							}}</NuxtLink
						>
					</p>
				</div>
			</div>

			<!-- <button class="btn btn-primary fw-bold">
				<i class="bi bi-plus-lg me-3"/>
				<span>Register participant</span>
			</button> -->
		</article>

		<br />
		<ParticipantsTabs activeTab="settings" />
		<br />

		<section class="col-lg-8 col-md-12">
			<h4 class="fw-bold">Edit Participant Info</h4>
			<hr />

			<form
				:id="`edit-participant-form-${participantId}`"
				@submit.prevent="OnSaveEdit">
				<dl class="row gy-2">
					<dt class="col-sm-4">Name</dt>
					<dd class="col-sm-4 d-flex gap-2">
						<input
							type="text"
							class="form-control border-secondary"
							v-model="ParticipantEdit.first_name"
							required />
					</dd>
					<dd class="col-sm-4 d-flex gap-2">
						<input
							type="text"
							class="form-control border-secondary"
							v-model="ParticipantEdit.last_name"
							required />
					</dd>

					<dt class="col-sm-4">Date of birth</dt>
					<dd class="col-sm-8 d-flex gap-2">
						<input
							type="date"
							class="form-control border-secondary"
							v-model="ParticipantEdit.dob" />
					</dd>

					<dt class="col-sm-4">Sex</dt>
					<dd class="col-sm-8 d-flex gap-2">
						<select
							class="form-select border-secondary"
							v-model="ParticipantEdit.sex">
							<option value="Male">Male</option>
							<option value="Female">Female</option>
						</select>
					</dd>

					<dt class="col-sm-4">Address</dt>
					<dd class="col-sm-8">
						<input
							type="text"
							class="form-control border-secondary"
							v-model="ParticipantEdit.address" />
					</dd>

					<dt class="col-sm-4">Email</dt>
					<dd class="col-sm-8">
						<input
							type="email"
							class="form-control border-secondary"
							v-model="ParticipantEdit.email"
							required />
					</dd>

					<dt class="col-sm-4">Contact number</dt>
					<dd class="col-sm-8">
						<input
							type="text"
							class="form-control border-secondary"
							v-model="ParticipantEdit.phone_number" />
					</dd>

					<dt class="col-sm-4">Institution</dt>
					<dd class="col-sm-8">
						<select
							class="form-select border-secondary"
							v-model="ParticipantEdit.institution_id"
							required>
							<option
								v-for="institution in institutionOptions"
								:key="institution.id"
								:value="institution.id">
								{{ institution.name }}
							</option>
						</select>
					</dd>

					<dt class="col-sm-4">Year level & Course</dt>
					<dd class="col-sm-2">
						<input
							type="number"
							max="5"
							min="1"
							class="form-control border-secondary"
							v-model="ParticipantEdit.year_level" />
					</dd>
					<dd class="col-sm-6">
						<input
							type="text"
							class="form-control border-secondary"
							v-model="ParticipantEdit.course" />
					</dd>
				</dl>
				<br />
				<br />
				<article class="d-flex justify-content-end">
					<button
						type="submit"
						:form="`edit-participant-form-${participantId}`"
						class="d-flex align-items-center btn btn-success gap-3 px-3"
						:disabled="isSaving">
						<span
							v-if="isSaving"
							class="spinner-border spinner-border-sm"
							aria-hidden="true"></span>
						<span role="status">Save edit</span>
					</button>
				</article>
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
						<b>Delete this participant</b> <br />
						<span
							>Once this participant is deleted, it cannot be
							undone.</span
						>
					</p>
					<ParticipantsDelete :participant="ParticipantData" />
				</div>
			</article>
		</section>
	</section>
</template>

<script setup>
	definePageMeta({
		layout: "main",
	});

	const participantId = useRoute().params.participantId;
	const ParticipantData = ref({});
	const institutionOptions = ref([]);
	const isLoading = ref(false);
	const isSaving = ref(false);
	const errorMessage = ref();

	const LoadData = async () => {
		isLoading.value = true;
		const { data, error } = await $fetch(
			`/api/participants/${participantId}`,
			{
				method: "GET",
			}
		);

		const { data: institutions, error: institutionsError } = await $fetch(
			`/api/institutions/options`,
			{
				method: "GET",
			}
		);

		if (error || institutionsError) {
			console.error("Error while loading data");
			errorMessage.value = "Internal server error. Please try again.";
			setTimeout(() => {
				errorMessage.value = "";
			}, 3000);
		}

		ParticipantData.value = data;
		institutionOptions.value = institutions;
		isLoading.value = false;
	};

	await LoadData();

	const ParticipantEdit = ref({
		first_name: ParticipantData.value?.first_name,
		last_name: ParticipantData.value?.last_name,
		dob: ParticipantData.value?.dob,
		sex: ParticipantData.value?.sex,
		address: ParticipantData.value?.address,
		email: ParticipantData.value?.email,
		phone_number: ParticipantData.value?.phone_number,
		institution_id: ParticipantData.value?.institution_id,
		year_level: ParticipantData.value?.year_level,
		course: ParticipantData.value?.course,
	});

	const OnSaveEdit = async () => {
		isSaving.value = true;
		const { error } = await $fetch(`/api/participants/${participantId}`, {
			method: "PATCH",
			body: ParticipantEdit.value,
		});
		if (error) {
			console.error("Error while updating participant info", error);
			errorMessage.value = "Internal server error. Please try again.";
			setTimeout(() => {
				errorMessage.value = "";
			}, 3000);
			return;
		}
		isSaving.value = false;
		navigateTo(`/admin/participants/${participantId}`);
	};

	const GetFullname = () =>
		`${ParticipantData.value?.first_name} ${ParticipantData.value?.last_name}`;
</script>

<style></style>
