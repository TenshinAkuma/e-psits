<template>
	<section>
		<h4 class="fw-bold m-0">PSITS MEMBERS</h4>

		<div
			v-if="isLoading"
			class="d-flex flex-column justify-content-center align-items-center"
			style="height: 360px">
			<p>Loading data...</p>
			<div class="spinner-border" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
		</div>

		<div
			v-else-if="StudentMembers == null || StudentMembers.length <= 0"
			class="d-flex flex-column justify-content-center align-items-center"
			style="height: 432px">
			<h4 class="fw-bold m-0">Event Registrations</h4>
			<br />
			<br />
			<br />
			<p class="text-secondary text-center fs-7 lh-sm">
				No data available. <br />
				Please register some participants.
			</p>
			<EventRegistrationsCreate
				:event="EventDetails"
				@onRegister="HandleReload" />
		</div>

		<section v-else>
			<br />
			<MembershipsTabs activeTab="students" />
			<br />

			<div class="d-flex justify-content-between align-item-center">
				<h4 class="fw-bold m-0">Student Members</h4>
				<MembershipStudentsCreate />
			</div>
			<br />

			<div class="table-responsive">
				<table class="table table-bordered align-middle">
					<thead>
						<tr>
							<th scope="col">Name</th>
							<th scope="col">Email</th>
							<th scope="col">Institution</th>
							<th scope="col" class="text-center">Membership status</th>
							<th scope="col" class="text-center">
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						<tr
							v-for="student in StudentMembers"
							:key="student.id"
							style="height: 56px">
							<td>
								<NuxtLink
									:to="`/admin/participants/${student.id}`"
									class="fw-bold text-decoration-none">
									{{
										`${student.first_name} ${student.last_name}`
									}}
								</NuxtLink>
							</td>
							<td>{{ student.email }}</td>
							<td>
								<NuxtLink :to="`/admin/institutions/${student.institution_id}`"
								class="text-dark">
									{{ student.institutions.name }}
								</NuxtLink>
							</td>
							<td class="text-center">{{ student.membership_status }}</td>
							<td>
								<div
									class="d-flex justify-content-center align-items-center">
									<MembershipStudentsEdit
										:student="student"
										@onEdit="HandleReload" />
									<MembershipStudentsDelete
										:participant="student"
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

	const StudentMembers = ref([]);
	const isLoading = ref(false);
	const errMsg = ref("");

	async function LoadData() {
		isLoading.value = true;
		const { data, error } = await $fetch(`/api/membership-participants`, {
			method: "GET",
		});

		if (error) {
			console.error("Error participant members: ", error);
		}

		StudentMembers.value = data;
		isLoading.value = false;
	}

	await LoadData();

	async function HandleReload() {
		await LoadData();
	}
</script>
