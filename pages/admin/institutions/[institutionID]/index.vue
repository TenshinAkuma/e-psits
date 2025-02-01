@ -0,0 +1,51 @@
<template>
	<article
		v-if="isLoading"
		class="d-flex flex-column justify-content-center align-items-center"
		style="height: 720px">
		<p>Loading institution...</p>
		<div class="spinner-border" role="status">
			<span class="visually-hidden">Loading...</span>
		</div>
	</article>

	<section v-else>
		<article>
			<h1 class="fw-bold">{{ InstitutionData.name }}</h1>
		</article>

		<br />
		<InstitutionsTabs activeTab="details" />
		<br />

		<h4 class="fw-bold mb-3">Institution Info</h4>

		<dl class="row">
			<dt class="col-sm-2">Address</dt>
			<dd class="col-sm-10">
				{{ InstitutionData.address }}
			</dd>

			<dt class="col-sm-2">Email</dt>
			<dd class="col-sm-10">
				{{ InstitutionData.email }}
			</dd>

			<dt class="col-sm-2">Telephone num.</dt>
			<dd class="col-sm-10">
				{{ InstitutionData.contact_number }}
			</dd>
		</dl>

		<br />
		<h4 class="fw-bold mb-3">Institution Coordinator</h4>

		<div class="d-flex align-items-center gap-2">
			<Avatar
			:id="`institution-coordinator-${InstitutionData.coordinator_id}`"
			:gender="InstitutionData.coordinators.sex"
			size="72px" />
			<p class="lh-sm m-0">
				<span class="fw-bold fs-5">{{ GetFullname() }}</span> <br>
				<span	span class="">{{ InstitutionData.coordinators.position }}</span>
			</p>
		</div>

		<br />

		<dl class="row">
			<dt class="col-sm-2">Email</dt>
			<dd class="col-sm-10">
				{{ InstitutionData.coordinators.email }}
			</dd>
			<dt class="col-sm-2">Contact num.</dt>
			<dd class="col-sm-10">
				{{ InstitutionData.coordinators.contact_number }}
			</dd>
		</dl>

		<br />
		<br />
		<br />
		<NuxtLink class="btn btn-success px-3">
			<i class="bi bi-pencil fs-7 me-3" />
			Edit details
		</NuxtLink>
	</section>
</template>

<script setup>
	definePageMeta({
		layout: "main",
	});

	const institutionId = useRoute().params.institutionId;
	const InstitutionData = ref({});
	const isLoading = ref(false);
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

	const GetFullname = () =>
		`${InstitutionData.value?.coordinators.first_name} ${InstitutionData.value?.coordinators.last_name}`;
</script>
