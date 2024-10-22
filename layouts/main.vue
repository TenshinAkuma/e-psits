<template>
  <div style="height: 100%; position: relative">
    <!-- HEADER -->
    <Navbar />
    <!-- BODY CONTENT -->
    <div id="page-slot" class="p-5 mb-5 overflow-y-auto h-100">
      <slot />
    </div>
  </div>
</template>
