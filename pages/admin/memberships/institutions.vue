<template>
	<section>
		<h1 class="fw-bold m-0">PSITS MEMBERS</h1>

		<br />
		<MembershipsTabs activeTab="institutions" />
		<br />

		<div
			v-if="isLoading"
			class="d-flex flex-column justify-content-center align-items-center"
			style="height: 576px">
			<p>Loading data...</p>
			<div class="spinner-border" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
		</div>

		<div
			v-else-if="
				InstitutionMembers == null || InstitutionMembers.length <= 0
			"
			class="d-flex flex-column justify-content-evenly align-items-center"
			style="height: 576px">
			<h4 class="fw-bold m-0">Institution Members</h4>
			<p class="text-secondary text-center fs-7 lh-sm">
				No data available. <br />
				Please add some institutions.
			</p>
			<MembershipInstitutionsCreate />
		</div>

		<section v-else>
			<div class="d-flex justify-content-between align-item-center">
				<h4 class="fw-bold m-0">Institution Members</h4>
				<MembershipInstitutionsCreate />
			</div>
			<br />

			<div class="table-responsive">
				<table class="table table-bordered align-middle">
					<thead>
						<tr>
							<th scope="col">Name</th>
							<th scope="col">Email</th>
							<th scope="col">Institution</th>
							<th scope="col" class="text-center">
								Membership status
							</th>
							<th scope="col" class="text-center">
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						<tr
							v-for="institution in InstitutionMembers"
							:key="institution.id"
							style="min-height: 56px">
							<td>
								<NuxtLink
									:to="`/admin/institutions/${institution.id}`"
									class="fw-bold text-decoration-none">
									{{ institution.name }}
								</NuxtLink>
							</td>
							<td>{{ institution.email }}</td>
							<td>
								{{
									`${institution.coordinators.first_name} ${institution.coordinators.last_name}`
								}}
							</td>
							<td class="text-center">
								{{ institution.membership_status }}
							</td>
							<td>
								<div
									class="d-flex justify-content-center align-items-center">
									<MembershipInstitutionsEdit
										:institution="institution"
										@onEdit="HandleReload" />
									<MembershipInstitutionsDelete
										:institution="institution"
										@onDelete="HandleReload" />
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>
	</section>
</template>

<script setup>
	definePageMeta({
		layout: "main",
	});

	const InstitutionMembers = ref([]);
	const isLoading = ref(false);
	const errMsg = ref("");

	async function LoadData() {
		isLoading.value = true;
		const { data, error } = await $fetch(`/api/membership-institutions`, {
			method: "GET",
		});

		if (error) {
			console.error("Error institution members: ", error);
		}

		InstitutionMembers.value = data;
		isLoading.value = false;
	}

	await LoadData();

	async function HandleReload() {
		await LoadData();
	}
</script>
