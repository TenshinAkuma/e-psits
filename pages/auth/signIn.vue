<template>
  <div
    class="d-flex flex-column justify-content-end mx-auto"
    style="width: 372px; height: 504px"
  >
    <div class="text-center mb-5">
      <h1 class="fw-bold m-0">Welcome!</h1>
      <p class="m-0">Sign in and start your session</p>
    </div>
    <div class="text-center fw-bold text-danger" style="font-size: 0.8rem">
      {{ errMsg }}
    </div>
    <form @submit.prevent="handleSignIn">
      <div class="mb-3">
        <label for="user-email" class="text-secondary">Email</label>
        <input
          type="email"
          class="form-control border-secondary rounded-3"
          id="user-email"
          placeholder="Enter your email here"
          v-model="email"
          require
        />
      </div>
      <div class="mb-5">
        <label for="user-password" class="text-secondary">Password</label>
        <input
          type="password"
          class="form-control border-secondary"
          id="user-password"
          placeholder="Enter your password here"
          v-model="password"
          required
        />
      </div>

      <button
        type="submit"
        class="btn btn-primary w-100 d-flex justify-content-center align-items-center gap-3"
        :disabled="isLoading"
      >
        <span
          v-if="isLoading"
          class="spinner-border spinner-border-sm"
          aria-hidden="true"
        />
        <span role="status">Sign in</span>
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

definePageMeta({
  layout: "auth",
});

const client = useSupabaseClient();
const email = ref("");
const password = ref("");
const errMsg = ref("");
const isLoading = ref(false);

const handleSignIn = async () => {
  isLoading.value = true;

  try {
    const { data, error } = await client.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (error) {
      throw new Error(error.message);
    }

    console.info(data);
    await navigateTo("/admin");
  } catch (error) {
    console.error(error.message);
    errMsg.value = error.message;
    setTimeout(() => (errMsg.value = ""), 3000);
  } finally {
    isLoading.value = false;
  }
};
</script>
