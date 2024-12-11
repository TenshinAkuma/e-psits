<template>
	<div v-if="coordinator != null">
		<div v-if="status === 'success'">
			<div class="col-4">
				<div
					class="ratio ratio-1x1 border rounded-circle border overflow-hidden mx-auto mb-3"
					style="width: 144px">
					<img
						src="https://avatar.iran.liara.run/public/28"
						alt="profile_image"
						class="h-100 w-100" />
				</div>
				<div class="h2 fw-bold text-center m-0">
					{{ coordinator.name }}
				</div>
				<div class="text-center text-secondary">
					{{ coordinator.position }} <br />
					{{ coordinator.institutions.name }}
				</div>
				<hr />
				<p class="fw-bold">Contact Information</p>
				<div class="fw-bold text-secondary">Email</div>
				<p class="text-dark">{{ coordinator.email }}</p>

				<div class="fw-bold text-secondary">Contact number</div>
				<p class="text-dark">{{ coordinator.contact_number }}</p>
			</div>
		</div>
	</div>
</template>

<script setup>
	definePageMeta({
		layout: "main",
	});

	const coordinatorID = useRoute().params.coordinatorID;

	const {
		data: coordinator,
		status,
		error,
	} = await useFetch(`/api/coordinators/${coordinatorID}`);
</script>
