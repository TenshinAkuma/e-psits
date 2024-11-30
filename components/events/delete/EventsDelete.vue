<template>
	<div>
		<button
			type="button"
			data-bs-toggle="modal"
			data-bs-target="#deleteEvent"
			class="btn btn-outline-danger">
			Remove
		</button>

		<div
			class="modal fade"
			id="deleteEvent"
			tabindex="-1"
			aria-labelledby="deleteEventModal"
			aria-haspopup="true">
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title fw-bold">DELETE EVENT</h5>
						<button
							type="button"
							class="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"></button>
					</div>

					<div class="modal-body">
						<p class="text-secondary">
							This will permanently delete this event.
						</p>
					</div>

					<div class="modal-footer">
						<button
							class="btn btn-outline-secondary border-0">
							Cancel
						</button>
						<button class="btn btn-danger">Delete</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	const eventID = useRoute().params.eventID;
</script>

<style></style>
