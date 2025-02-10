<template>
	<div
		v-if="isLoading"
		class="d-flex flex-column justify-content-center align-items-center"
		style="height: 432px">
		<p>Loading data...</p>
		<div class="spinner-border" role="status">
			<span class="visually-hidden">Loading...</span>
		</div>
	</div>

	<section v-else>
		<article class="d-flex justify-content-between align-items-center">
			<div class="d-flex align-items-center gap-2">
				<Avatar
					:id="`participant-${ParticipantData.id}`"
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
		</article>

		<br />

		<ParticipantsTabs activeTab="details" />
		<br />

		<h4 class="fw-bold">Participant Info</h4>
		<br />

		<dl class="row">
			<dt class="col-sm-4">Date of birth</dt>
			<dd class="col-sm-8">
				{{ formatDate(ParticipantData.dob) }}
			</dd>

			<dt class="col-sm-4">Address</dt>
			<dd class="col-sm-8">
				{{ ParticipantData.address }}
			</dd>

			<br />
			<br />

			<dt class="col-sm-4">Email</dt>
			<dd class="col-sm-8">
				{{ ParticipantData.email }}
			</dd>

			<dt class="col-sm-4">Contact number</dt>
			<dd class="col-sm-8">
				{{ ParticipantData.phone_number }}
			</dd>

			<br />
			<br />

			<dt class="col-sm-4">Institution</dt>
			<dd class="col-sm-8">
				{{ ParticipantData.institutions.name }}
			</dd>

			<dt class="col-sm-4">Year level</dt>
			<dd class="col-sm-8">
				{{ ParticipantData.year_level }}
			</dd>

			<dt class="col-sm-4">Course</dt>
			<dd class="col-sm-8">
				{{ ParticipantData.course }}
			</dd>

			<dt class="col-sm-4">Entry form</dt>
			<dd class="col-sm-8">
				<NuxtLink v-if="ParticipantData.entry_form" :to="ParticipantData.entry_form" target="_blank">
					View entry form
				</NuxtLink>
				<NuxtLink v-else :to="`/admin/participants/${ParticipantData.id}/settings`" target="_blank">
					Upload entry form
				</NuxtLink>
			</dd>
		</dl>

		<br />

		<div class="row">
			<div class="col-lg-4">
				<p class="fw-bold">Certificate of enrollment</p>
				<a
					v-if="ParticipantData.coe"
					:href="ParticipantData.coe"
					target="_blank">
					<img
						v-if="ParticipantData.coe"
						:src="ParticipantData.coe"
						:alt="`participant-${ParticipantData.id}-coe`"
						class="border rounded-3 w-100" />
				</a>

				<NuxtLink
					v-else
					:to="`/admin/participants/${ParticipantData.id}/settings`">
					Upload image of certificate of enrollment
				</NuxtLink>
			</div>
			<div class="col-lg-4">
				<p class="fw-bold">School ID</p>
				<a
					v-if="ParticipantData.school_id"
					:href="ParticipantData.school_id">
					<img
						:src="ParticipantData.school_id"
						:alt="`participant-${ParticipantData.id}-school_id`"
						class="border rounded-3 w-100" />
				</a>
				<NuxtLink
					v-else
					:to="`/admin/participants/${ParticipantData.id}/settings`">
					Upload image of school id
				</NuxtLink>
			</div>
		</div>
	</section>
</template>

<script setup>
	definePageMeta({
		layout: "main",
	});

	const participantId = useRoute().params.participantId;
	const ParticipantData = ref({});
	const isLoading = ref(false);
	const errorMessage = ref("");

	const LoadData = async () => {
		isLoading.value = true;
		const { data: _participantData, error: _participantError } =
			await $fetch(`/api/participants/${participantId}`, {
				method: "GET",
			});

		if (_participantError) {
			console.error(_participantError);
			errorMessage.value = "Internal server error. Please try again.";
			setTimeout(() => {
				errorMessage.value = "";
			}, 3000);
		}

		ParticipantData.value = _participantData;
		isLoading.value = false;
	};

	await LoadData();

	const GetFullname = () =>
		`${ParticipantData.value?.first_name} ${ParticipantData.value?.last_name}`;
</script>
