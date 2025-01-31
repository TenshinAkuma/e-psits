<template>
	<ul class="nav nav-tabs">
		<li class="nav-item">
			<NuxtLink
				class="nav-link"
				:class="{ active: isActive('details') }"
				:to="`/admin/participants/${participantId}`"
				>Details</NuxtLink
			>
		</li>
	</ul>
</template>

<script setup>
   const props = defineProps({
      activeTab: {
         type: String,
         required: true,
      },
   });

   const participantId = useRoute().params.participantId;

   const isActive = (tab) => {
      return tab === props.activeTab;
   };
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
