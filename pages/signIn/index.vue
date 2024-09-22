<template>
  <div class="d-flex flex-column justify-content-start" style="width: 372px">
    <div class="text-center">
      <div class="fs-1 fw-bold">Welcome!</div>
      <p>Sign in and start your session</p>
    </div>
    <form @submit.prevent="handleSignIn">
      <div class="mb-3">
        <label for="user-email" class="text-secondary">Email</label>
        <input
          type="email"
          class="form-control"
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
          class="form-control"
          id="user-password"
          placeholder="Enter your password here"
          v-model="password"
          required
        />
      </div>
      <button
        type="submit"
        class="sign-in-btn btn text-light w-100 py-2 mb-1"
        onclick=""
      >
        Sign in
      </button>
      <div class="text-center text-danger">{{ errMsg }}</div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

definePageMeta({
  layout: "auth",
});

const client = useSupabaseClient();
const user = useSupabaseUser();
const email = ref("");
const password = ref("");
const errMsg = ref("");

watchEffect(async () => {
  if (user.value) {
    await navigateTo("/admin");
  }
});

const handleSignIn = async () => {
  const { error } = await client.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });
  if (error) {
    errMsg.value = error.message;
    setTimeout(() => {
      errMsg.value = "";
    }, 5000);
  }
};
</script>

<style scoped>
.sign-in-btn {
  background-color: #46468f;
}
</style>
