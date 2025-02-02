<template>
	<section class="">
		<div class="d-flex justify-content-between align-items-center gap-3">
			<h4 class="fw-bold m-0">ParticipantsList</h4>
			<ParticipantsCreate />
		</div>

		<hr />

		<article
			v-if="isLoading"
			class="d-flex flex-column justify-content-center align-items-center gap-2 m-auto"
			style="height: 720px">
			<div class="spinner-border text-secondary" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
			Loading ParticipantsList
		</article>

		<article
			v-else-if="
				ParticipantsList == null || ParticipantsList.length <= 0
			"
			class="d-flex flex-column justify-content-around align-items-center gap-2 m-auto"
			style="height: 720px">
			<h4 class="fw-bold m-0">ParticipantsList</h4>

			<div class="d-flex flex-column align-items-center">
				<p class="text-center text-secondary fs-7 lh-sm">
					There are currently no data. Let's add some
					ParticipantsList.
				</p>
				<ParticipantsCreate />
			</div>
		</article>

		<section v-else class="row overflow-y-auto" style="height: 720px">
			<div
				v-for="participant in ParticipantsList"
				:key="participant.id"
				class="col-lg-6 col-md-12 p-3">
				<article
					class="participant-card d-flex justify-content-between align-items-center rounded-3 p-3"
					style="height: 144px;">
					<Avatar
						:gender="participant.sex"
						:id="`participant-${participant.id}`"
						:name="`${participant.first_name} ${participant.last_name}`"
						size="72px">
						<template #Name>
							<p class="fw-bold m-0">
								{{
									`${participant.first_name} ${participant.last_name}`
								}}
							</p>
							<p class="fs-7 m-0">
								{{ participant.institutions.name }}
							</p>
							<p class="fs-7 text-secondary m-0">
								{{ participant.email }}
							</p>
						</template>
					</Avatar>

					<div class="btn-group gap-2">
						<NuxtLink
							:to="`/admin/participants/${participant.id}`"
							class="btn btn-sm btn-outline-dark rounded-pill px-3"
							style="height: min-content">
							Visit profile
						</NuxtLink>
						<button type="button" class="btn btn-sm">
							<i class="bi bi-three-dots-vertical" />
						</button>
					</div>
				</article>
			</div>
		</section>
	</section>
</template>

<script setup>
	definePageMeta({
		layout: "main",
	});

	const ParticipantsList = ref([]);
	const errMsg = ref("");
	const isLoading = ref(false);

	async function LoadData() {
		isLoading.value = true;
		const { data, error } = await $fetch("/api/participants", {
			method: "GET",
		});

		if (error) {
			console.error("Error loading participants", error);
			errMsg.value = error;
			setTimeout(() => {
				errMsg.value = "";
			}, 3000);
		}

		ParticipantsList.value = data;
		isLoading.value = false;
	}

	await LoadData();
</script>

<style scoped>
	.participant-card:hover {
		cursor: pointer;
		background-color: whitesmoke;
		border: 1px solid #454545;
	}
</style>
