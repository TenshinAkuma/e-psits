<template>
   <Navbar />
   <div class="container-xxl d-flex" style="height: 100%">
      <SideBar />
      <article style="height: 100%; overflow: auto" class="p-5">
         <slot />
      </article>
   </div>
</template>
