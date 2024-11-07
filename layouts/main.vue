<template>
  <div style="position: relative">
    <!-- HEADER -->
    <Navbar />
    <div class="d-flex w-100" style="height: 100vh">
      <SideBar />
      <!-- BODY CONTENT -->
      <div class="mt-5 p-5 w-100">
        <slot />
      </div>
    </div>
  </div>
</template>
