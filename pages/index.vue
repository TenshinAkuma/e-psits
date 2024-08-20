<script setup>
   definePageMeta({
      layout: 'access'
   });
</script>

<template>
   <div class="text-center">
      <div class="fs-1 fw-bold">Welcome!</div>
      <p>Sign in and start your session</p> 
   </div>
   <form class="px-5 mb-5">
      <div class="mb-3">
         <label for="user-email" class="text-secondary">Email</label>
         <input type="email" class="form-control" id="user-email" placeholder="Enter your email here">
      </div>
      <div class="mb-5">
         <label for="user-password" class="text-secondary">Password</label>
         <input type="email" class="form-control" id="user-password" placeholder="Enter your password here">
      </div>
      <NuxtLink to="/dashboard">
         <button type="submit" class="sign-in-btn btn text-light w-100 py-2 mb-1"onclick="">Sign in</button>
      </NuxtLink>
   </form>
   <div class="mb-5 text-center">Are you a participating school? <u><NuxtLink to="/register" class="register-link fw-bold">Register here.</NuxtLink></u></div>
   
</template>


<style scoped>
   .sign-in-btn {
      background-color: #46468f;
   }
   .register-link {
      color: #46468f;
   }
</style>