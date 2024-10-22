<template>
  <div style="height: 100%; position: relative">
    <!-- HEADER -->
    <Navbar />
    <Sidebar />
    <!-- BODY CONTENT -->
    <div id="page-slot" class="py-5 mb-5 overflow-y-auto h-100">
      <div class="container-xl">
        <slot />
      </div>
    </div>
  </div>
</template>
