

<script setup>
definePageMeta({
   layout: 'login'
});

</script>

<template>
   <div class="container-sm d-flex flex-column align-items-center mb-5">
      <div class="text-center mb-5">
         <div class="fs-1 lh-1">Welcome!</div>
         <p>Sign in and start your session</p> 
      </div>
      <form class="mb-5">
         <div class="mb-3">
            <label for="user-email" class="form-label">Email</label>
            <input type="email" class="form-control border-none" id="user-email" placeholder="Enter your email here">
         </div>
         <div class="mb-5">
            <label for="user-password" class="form-label">Password</label>
            <input type="email" class="form-control border-none" id="user-password" placeholder="Enter your password here">
         </div>
         <button type="submit" class="btn btn-primary w-100 py-2 mb-1">Sign in</button>
         <div class="text-primary text-end"><u>Forgot password?</u></div>
      </form>
      <div class="text-center mb-5">Are you a participating school? <u class="text-primary fw-bold">Register here.</u></div>
   </div>
</template>

<style scope>
   form {
      width: 524px;
   }
</style>