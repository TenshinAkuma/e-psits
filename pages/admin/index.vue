<template>
  <div class="fs-4 fw-bold">Welcome to E-PSITS XII Dashboard.</div>
  <div class="text-secondary mb-5">
    An Online Registration Platform for the Philippine Society of Information
    Technology Students Convention
  </div>
  <div class="d-flex justify-content-between align-items-center">
    <div class="fs-5 fw-bold mb-2">Quick actions</div>
  </div>
  <div class="row">
    <DashboardCard
      v-for="action in dashboard_actions"
      class="col-6 p-1"
      :action_shortcut="action.shortcut"
      :action_icon="action.icon"
    />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "main",
  middleware: "auth",
});

const dashboard_actions = [
  {
    shortcut: "Membership applications",
    icon: "material-symbols:card-membership-outline-rounded",
  },
  {
    shortcut: "Create an event",
    icon: "material-symbols:calendar-add-on-outline-rounded",
  },
  {
    shortcut: "Participant registration",
    icon: "material-symbols:person-add-outline-rounded",
  },
  {
    shortcut: "Event results",
    icon: "material-symbols:award-star-outline-rounded",
  },
];
</script>
