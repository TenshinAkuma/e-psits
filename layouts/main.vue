<template>
   <div class="window">
      <div class="row m-0 border-bottom" style="height: 10%">
         <div class="sidebar-bg col-2 d-flex align-items-center border-end ps-5">
            <img src="public\img\logo-white.png" class="logo" alt="white psits logo">
         </div>
         <div class="col-10 d-flex justify-content-between align-items-center px-5">
            <div class="fs-5 text-secondary">Administrator account</div>
            <div class="d-flex">
               <div class="btn text-secondary px-3">Notification</div>
               <div class="btn px-3">Logout</div>
            </div>
         </div>
      </div>

      <div class="row m-0" style="height: 90%">
         <div class="sidebar-bg col-2 ps-5 py-5 border-end">
            <div class="d-flex flex-column justify-content-between h-100">
               <div class="d-flex flex-column">
                  <NuxtLink to="dashboard" class="text-decoration-none sidebar-text py-3">Dashboard</NuxtLink>
                  <NuxtLink to="schools" class="text-decoration-none sidebar-text py-3">Schools</NuxtLink>
                  <NuxtLink to="events" class="text-decoration-none sidebar-text py-3">Events</NuxtLink>
                  <NuxtLink to="participants" class="text-decoration-none sidebar-text py-3">Participants</NuxtLink>
                  <NuxtLink to="registration" class="text-decoration-none sidebar-text py-3">Registration</NuxtLink>
                  <NuxtLink to="entryForms" class="text-decoration-none sidebar-text py-3">Entry Forms</NuxtLink>
               </div>
               <div>
                  <NuxtLink to="/" class="text-decoration-none"><div class="sidebar-text py-3">Account settings</div></NuxtLink>
               </div>
            </div>
         </div>
         <div class="col-10 p-5">
            <slot />
         </div>
      </div>
   
   </div>
</template>

<style scoped>
   .sidebar-bg {
      background-color: #46468f;
   }

   .sidebar-text {
      color: #8a8ac5;
   }

   .router-link-active {
      font-size: 1.5rem;   
      color: white !important;
   }
</style>