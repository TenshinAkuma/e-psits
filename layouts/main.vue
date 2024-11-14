<template>
  <div class="d-flex h-100">
    <SideBar />
    <section class="w-100 h-100">
      <Navbar />
      <article style="height: 100%; overflow: auto">
        <slot />
      </article>
    </section>
  </div>
  <!-- <div style="position: relative">
    <Navbar />
    <div class="d-flex w-100" style="height: 100vh">
      <SideBar />
      <div class="mt-5 p-5 w-100">
        <slot />
      </div>
    </div>
  </div> -->
</template>
