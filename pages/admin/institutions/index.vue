<template>
	<section class="">
		<article
			class="d-flex justify-content-between align-items-center gap-3">
			<h4 class="fw-bold m-0">INSTITUTIONS</h4>
			<!-- TODO: Insert add institution here -->
		</article>

		<hr />

		<article
			v-if="isLoading"
			class="d-flex flex-column justify-content-center align-items-center gap-2 m-auto"
			style="height: 720px">
			<div class="spinner-border text-secondary" role="status">
				<span role="status">Loading institutions...</span>
			</div>
		</article>

		<article
			v-else-if="
				 InstitutionsData == null || InstitutionsData.length <= 0
			"
			class="d-flex flex-column justify-content-center align-items-center gap-2 m-auto"
			style="height: 720px">
			<!-- TODO: Insert add institution here -->
			<p class="text-secondary fs-7">
				There are currently no data. Let's add some institutions.
			</p>
		</article>

		<article v-else class="row g-2 overflow-y-auto pb-3" style="height: 720px">
			<div
				v-for="institution in InstitutionsData"
				:key="institution.id"
				class="col-6 p-1">
				<div
					class="institution-card d-flex flex-column justify-content-between p-4 rounded-3"
					style="height: 240px">
					<div class="d-flex justify-content-between">
						<h4 class="fw-bold lh-sm" style="max-width: 32ch">
							{{ institution.name }}
						</h4>
						<i class="bi bi-three-dots-vertical" />
					</div>
					<div>
						<p class="hstack gap-2 m-0">
							<i class="bi bi-envelope text-secondary" />
							<span>{{ institution.email }}</span>
						</p>
						<p class="hstack gap-2 m-0">
							<i class="bi bi-geo-alt text-secondary"></i>
							<span>{{ institution.address }}</span>
						</p>
					</div>
					<br/>
					<br/>
					<NuxtLink
						:to="`/admin/institutions/${institution.id}`"
						class="btn btn-sm btn-outline-dark rounded-pill px-5"
						style="width: max-content">
						<span>See institution</span
						><i class="bi bi-arrow-right" />
					</NuxtLink>
				</div>
			</div>
		</article>
	</section>
</template>

<script setup>
	definePageMeta({
		layout: "main",
	});

	const InstitutionsData = ref([]);
	const isLoading = ref(false);
	const errorMsg = ref("");

	async function LoadData() {
		isLoading.value = true;
		const { data, error } = await $fetch(`/api/institutions`, {
			method: "GET",
		});

		if (error) {
			console.error("Error loading institutions: ", error);
			errorMsg.value = error;

			setTimeout(() => {
				errorMsg.value = "";
			}, 3000);

			InstitutionsData.value = null;
			isLoading.value = false;
			return;
		}

		InstitutionsData.value = data;
		isLoading.value = false;
	}

	await LoadData();
</script>

<style scoped>
	.institution-card:hover {
		cursor: pointer;
		background-color: whitesmoke;
		border: 1px solid #454545;
	}
</style>
