<script setup>
   definePageMeta({
      layout: 'access'
   });
</script>

<template>
   <div class="text-center">
      <div class="fs-1 fw-bold">Let's setup your account</div>
      <p>Fill in the necessary details to register your account</p>
      <div class="mt-5 mb-3 fw-bold text-secondary">Enter information about your school</div> 
   </div>
   <form class="">
      <div class="row">
         <div class="col-12 mb-3">
            <label for="school-name" class="text-secondary fw-bold">Name</label>
            <input type="text" class="form-control" id="school-name" placeholder="Name of your school">
         </div>
         <div class="col-12 mb-3">
            <label for="school-address" class="text-secondary fw-bold">Address</label>
            <input type="email" class="form-control" id="school-address" placeholder="Address of your school">
         </div>
         <div class="col-6 mb-3">
            <label for="school-email" class="text-secondary fw-bold">Email</label>
            <input type="email" class="form-control" id="school-email" placeholder="Email of your school">
         </div>
         <div class="col-6 mb-5">
             <label for="school-p-number" class="text-secondary fw-bold">Phone number</label>
            <input type="email" class="form-control" id="school-p-number" placeholder="Enter your school phone number here">
         </div>
         <div class="col-3">
            <NuxtLink to="/">
               <Button class="btn w-100" style="background-color: #c4c4db; color: #46468f;">Back</Button>
            </NuxtLink>
         </div>
         <div class="col-9">
            <NuxtLink to="/register/contact-person">
               <Button class="btn text-light w-100" style="background-color: #46468f;">Next</Button>
            </NuxtLink>
         </div>
      </div>
   </form>
   
</template>