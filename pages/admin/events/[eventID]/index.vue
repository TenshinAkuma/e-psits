<template>
	<div>
		<div class="d-flex justify-content-between align-items-center mb-5">
			<EventsEditsTitle :EventTitle="'No Title'" />
			<div class="hstack gap-2">
				<EventsCreateModal />
				<EventsDelete />
			</div>
		</div>
		<div class="row">
			<div class="col-3">
				<EventsDetails />
			</div>
			<div class="col-9">
				<TabsHeader>
					<TabsNavButtons id="participants" :active="true">
						Participants
					</TabsNavButtons>
					<TabsNavButtons id="criteria">
						Criteria
					</TabsNavButtons>
				</TabsHeader>
				<TabsContent class="py-5">
					<TabsPane id="participants" :active="true">
						<EventsTabsParticipants />
					</TabsPane>
					<TabsPane id="criteria">
						<EventsTabsCriteria />
					</TabsPane>
				</TabsContent>
			</div>
		</div>
	</div>
</template>

<script setup>
	definePageMeta({
		layout: "main",
	});
</script>

<style scoped>
	.nav-link {
		color: #424242;
	}
	.nav-link.active {
		color: #242424 !important;
		font-weight: bold;
	}
</style>
