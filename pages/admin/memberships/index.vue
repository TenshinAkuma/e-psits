<template>
  <section>
    <article class="d-flex justify-content-between align-items-center">
      <h4 class="fw-bold">MEMBERS</h4>
    </article>

    <hr />

    <article
      class="d-flex flex-column justify-content-center align-items-center gap-2 m-auto"
      style="height: 720px"
    >
      <div class="spinner-border text-secondary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      Loading...
    </article>

    <article>
      <h4>
      </h4>
    </article>
  </section>
</template>

<script setup>
definePageMeta({
  layout: "main",
});
</script>
