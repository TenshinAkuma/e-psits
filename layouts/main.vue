<template>
  <div class="d-flex" style="height: 100%">
    <SideBar />
    <section class="d-flex flex-column w-100 h-100">
      <Navbar />
      <article style="height: 100%; overflow: auto" class="p-5">
        <slot />
      </article>
    </section>
  </div>
</template>
