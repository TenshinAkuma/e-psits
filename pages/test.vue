<template>
	<div>
		<TabsHeader>
			<TabsNavButtons :Active="true"> Participant </TabsNavButtons>
			<TabsNavButtons Id="results"> Results </TabsNavButtons>
		</TabsHeader>
		<div class="p-5">
			<TabsContent>
				<TabsPane :Active="true"> Participant Pane </TabsPane>
				<TabsPane Id="results"> Results Pane </TabsPane>
			</TabsContent>
		</div>
	</div>
</template>

<script setup></script>

<style></style>
