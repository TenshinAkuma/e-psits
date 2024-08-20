<script setup>
   definePageMeta({
      layout: 'access'
   });
</script>

<template>
   <div class="text-center">
      <div class="fs-1 fw-bold">Let's setup your account</div>
      <p>Fill in the necessary details to register your account</p>
      <div class="mt-5 mb-3 fw-bold text-secondary">Enter contact person's information</div> 
   </div>
   <form>
      <div class="row">
         <div class="col-6 mb-3">
            <label for="contact-person-fname" class="text-secondary fw-bold">Firstname</label>
            <input type="text" class="form-control" id="contact-person-fname" placeholder="Enter Firstname">
         </div>
         <div class="col-6 mb-3">
            <label for="ontact-person-lname" class="text-secondary fw-bold">Lastname</label>
            <input type="text" class="form-control" id="ontact-person-fname" placeholder="Enter Lastname">
         </div>
         <div class="col-9 mb-3">
            <label for="position-title" class="text-secondary fw-bold">Position title</label>
            <input type="text" class="form-control" id="position-title" placeholder="Enter position title">
         </div>
         <div class="col-6 mb-5">
             <label for="contact-person-email" class="text-secondary fw-bold">Email</label>
            <input type="text" class="form-control" id="contact-person-email" placeholder="Enter email">
         </div>
         <div class="col-6 mb-5">
             <label for="contact-person-p-number" class="text-secondary fw-bold">Phone number</label>
            <input type="text" class="form-control" id="contact-person-p-number" placeholder="Enter phone number">
         </div>
         <div class="col-3">
            <NuxtLink to="./">
            <Button class="btn w-100" style="background-color: #c4c4db; color: #46468f;">Back</Button>
         </NuxtLink>
         </div>
         <div class="col-9">
            <NuxtLink to="login-credentials">
            <Button class="btn text-light w-100" style="background-color: #46468f;">Next</Button>
         </NuxtLink>
         </div>
      </div>
      
   </form>
   
</template>