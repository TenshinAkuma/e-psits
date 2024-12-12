<template>
	<div class="dropdown">
		<button
			type="button"
			:class="`btn ${registrationStatusButton(
				RegistrationStatus
			)} dropdown-toggle`"
			data-bs-toggle="dropdown"
			aria-expanded="false"
			data-bs-auto-close="outside"
			data-bs-offset="0,5">
			{{ RegistrationStatus }}
		</button>

		<div class="dropdown-menu dropdown-menu-end" ref="StatusDropdownRef">
			<div class="dropdown-item fw-bold">
				Update registration status
			</div>
			<hr class="dropdown-divider" />
			<form
				@submit.prevent="OnUpdateRegistrationStatus"
				class="px-3 py-1">
				<select
					class="form-select border-secondary mb-3"
					v-model="registration.registration_status">
					<option
						:value="RegistrationStatus"
						selected
						hidden
						disabled>
						{{ RegistrationStatus }}
					</option>
					<option
						v-for="(status, index) in registrationStatuses"
						:key="index"
						:value="status">
						{{ status }}
					</option>
				</select>

				<div class="d-flex justify-content-end gap-2">
					<button
						type="button"
						class="btn btn-outline-secondary border-0">
						Cancel
					</button>
					<button
						type="submit"
						class="d-flex align-items-center btn btn-success fw-bold gap-2"
						style="height: min-content"
						:disabled="status === 'pending'">
						<span
							v-if="status === 'pending'"
							class="spinner-border spinner-border-sm"
							aria-hidden="true" />
						<span role="status">Update</span>
					</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script setup>
	const StatusDropdownRef = ref();
	let StatusDropdown = null;

	const RegistrationStatus = defineModel("RegistrationStatus");
	const ParticipantRegistrationID = defineModel("ParticipantRegistrationID");
	const { registrationStatuses } = useRegistrationStatus();

	const registration = ref({
		registration_status: RegistrationStatus.value,
	});

	onMounted(() => {
		if (StatusDropdownRef.value) {
			StatusDropdown = new bootstrap.Dropdown(StatusDropdownRef.value);
		}
	});

	const closeDropdown = () => {
		StatusDropdown.hide();
	};

	const { data, status, error, execute } = await useFetch(
		`/api/registrations/participants/${ParticipantRegistrationID.value}`,
		{
			headers: useRequestHeaders(["cookie"]),
			method: "PATCH",
			body: registration,
			immediate: false,
			watch: false,
		}
	);

	const OnUpdateRegistrationStatus = async () => {
		try {
			await execute();
			if (status.value == "success") {
				closeDropdown();
				RegistrationStatus.value =
					registration.value.registration_status;
			}
		} catch {
			console.log("Failed to update participant registration status");
		}
	};

	const registrationStatusButton = (status) => {
		switch (status) {
			case "Registered":
				return "btn-primary";
			case "Cancelled":
				return "btn-danger";
			default:
				return "btn-secondary";
		}
	};
</script>

<style></style>
