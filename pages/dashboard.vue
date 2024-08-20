<script setup>
   definePageMeta({
      layout: 'main'
   });

const dashboard_actions = ["Sign up approval", "Add an event", "Participants", "Event registration"];
const action_description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum";
</script>

<template>
   <div class="fs-1">Welcome to E-PSITS XII Dashboard.</div>
   <div class="text-secondary mb-5">An Online Registration Platform for the Philippine Society of Information Technology Students Convention </div>
   <div class="row gy-4">
      <div v-for="action in dashboard_actions" class="col-6">
            <DashboardCard :action_shortcut="action" :action_description="action_description"/>
      </div>
   </div>
</template>