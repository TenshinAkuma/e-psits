<template>
	<div class="dropdown">
		<button
			type="button"
			:class="`btn btn-sm ${registrationStatusButton(
				RegistrationStatus
)} rounded-pill dropdown-toggle px-3`"
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
				@submit.prevent="OnSaveStatusUpdate"
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

				<div
					v-if="errorMessage"
					class="fs-7 text-danger">
					{{ errorMessage }}
				</div>

				<div class="d-flex justify-content-end gap-2">
					<button
						type="button"
						class="btn btn-outline-secondary border-0"
						@click="closeDropdown">
						Cancel
					</button>
					<button
						type="submit"
						class="d-flex align-items-center btn btn-success fw-bold gap-2"
						style="height: min-content"
						:disabled="_registrationStatus === 'pending'">
						<span
							v-if="_registrationStatus === 'pending'"
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
	const registrationStatuses = useRegistrationStatus();
	const eventRegistrations = useEventRegistrations();

	const errorMessage = ref();

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

	const {
		data: _registrationData,
		status: _registrationStatus,
		execute: SaveStatusUpdate,
	} = await useFetch(
		`/api/event-registrations/${ParticipantRegistrationID.value}`,
		{
			method: "PATCH",
			body: registration,
			immediate: false,
			watch: false,
		}
	);

	const OnSaveStatusUpdate = async () => {
		try {
			await SaveStatusUpdate();

			if (_registrationData.value?.error) {
				throw new Error(_registrationData.value?.error);
			}

			const registrationIndex =
				eventRegistrations.value?.findIndex(
					(r) => r.id == ParticipantRegistrationID.value
				);

			if (registrationIndex < 0) {
				throw new Error("Invalid registration ID");
			}

			eventRegistrations.value[registrationIndex] =
				_registrationData.value?.data;
			closeDropdown();
		} catch (err) {
			console.log("Failed to update participant registration status");

			errorMessage.value = err.message;
			setTimeout(() => {
				errorMessage.value = "";
			}, 3000);
		}
	};

	const registrationStatusButton = (status) => {
		switch (status) {
			case "Registered":
				return "text-primary";
			case "Cancelled":
				return "text-danger";
			default:
				return "text-secondary";
		}
	};
</script>
