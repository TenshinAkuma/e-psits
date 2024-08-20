<script setup>
   definePageMeta({
      layout: 'access'
   });
</script>

<template>
   <div class="text-center">
      <div class="fs-1 fw-bold">Let's setup your account</div>
      <p>Fill in the necessary details to register your account</p>
      <div class="mt-5 mb-3 fw-bold text-secondary">Enter school's login credentials</div> 
   </div>
   <form>
      <div class="row">
         <div class="col-12 mb-3">
            <label for="username" class="text-secondary fw-bold">Username</label>
            <input type="text" class="form-control" id="username" placeholder="Enter username">
         </div>
         <div class="col-12 mb-3">
            <label for="password" class="text-secondary fw-bold">Password</label>
            <input type="text" class="form-control" id="ontact-person-fname" placeholder="Enter password">
         </div>
         <div class="col-12 mb-5">
            <label for="re-enter-password" class="text-secondary fw-bold">Re-enter password</label>
            <input type="text" class="form-control" id="position-title" placeholder="Re-enter password">
         </div>
         <div class="col-3">
            <NuxtLink to="contact-person">
            <Button class="btn w-100" style="background-color: #c4c4db; color: #46468f;">Back</Button>
         </NuxtLink>
         </div>
         <div class="col-9">
            <NuxtLink to="/dashboard">
            <Button class="btn text-light w-100" style="background-color: #46468f;">Register account</Button>
         </NuxtLink>
         </div>
      </div>
      
   </form>
   
</template>
