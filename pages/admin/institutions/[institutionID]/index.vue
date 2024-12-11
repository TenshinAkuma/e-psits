@ -0,0 +1,51 @@
<template>
	<div v-if="status === 'success'">
		<div v-if="institution != null" class="row">
			<div
				class="d-flex justify-content-between align-items-center mb-3">
				<InstitutionsEditsName
					:InstitutionName="institution.name" />
				<div class="hstack gap-2">
					<InstitutionsDelete />
					<InstitutionsCreateModal />
				</div>
			</div>
			<hr />
			<div class="col-4">
				<p class="fw-bold">School Information</p>

				<InstitutionsEditsAddress
					:InstitutionAddress="institution.address" />

				<InstitutionsEditsEmail
					:InstitutionEmail="institution.email" />

				<hr />

				<p class="fw-bold">Institution Coordinator</p>
				<div
					class="d-flex align-items-center gap-3 mb-3"
					style="cursor: pointer">
					<div
						class="ratio ratio-1x1 border rounded-circle border overflow-hidden"
						style="width: 72px">
						<img
							src="https://avatar.iran.liara.run/public/28"
							alt="profile_image"
							class="h-100 w-100" />
					</div>
					<div>
						<div class="fw-bold fs-5 lh-1">
							{{ institution.coordinators.name }}
						</div>
						<div
							class="text-secondary"
							style="font-size: 0.9rem">
							{{ institution.coordinators.position }}
						</div>
					</div>
				</div>
				<div class="text-secondary hstack gap-2 mb-2">
					<i class="bi bi-envelope"></i
					>{{ institution.coordinators.email }}
				</div>
				<div class="text-secondary hstack gap-2 mb-2">
					<i class="bi bi-telephone"></i
					>{{ institution.coordinators.contact_number }}
				</div>
			</div>
		</div>
	</div>
	<div v-else style="height: 100vh; width: 100vw">
		<div class="spinner-border" role="status">
			<span class="visually-hidden">Loading...</span>
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
