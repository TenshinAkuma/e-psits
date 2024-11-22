<template>
   <Navbar />
   <div class="container-xxl hstack" style="height: 100%">
      <SideBar />
      <div style="height: 100%; overflow: auto" class="p-5 w-100">
         <slot />
      </div>
   </div>
</template>