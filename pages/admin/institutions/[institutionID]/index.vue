@ -0,0 +1,51 @@
<template>
	<div>
		<div v-if="status === 'success'" class="row">
			<div
				class="d-flex justify-content-between align-items-center mb-3 gap-5">
				<InstitutionsEditsName
					:InstitutionName="institution.name" />
				<InstitutionsDelete />
			</div>
			<hr />
			<br />
			<div class="col-4">
				<p class="fw-bold">School Information</p>

				<InstitutionsEditsAddress
					:InstitutionAddress="institution.address" />

				<InstitutionsEditsEmail
					:InstitutionEmail="institution.email" />
			</div>
		</div>
	</div>
</template>

<script setup>
	definePageMeta({
		layout: "main",
	});

	const institutionID = useRoute().params.institutionID;

	const { data: institution, status } = useFetch(
		`/api/institutions/${institutionID}`,
		{
			headers: useRequestHeaders(["cookie"]),
			method: "GET",
		}
	);
</script>
