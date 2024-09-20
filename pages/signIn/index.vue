<template>
  <div style="width: 372px">
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
          :value="email"
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
          :value="password"
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
    </form>
    <div>{{ (email, password) }}</div>
  </div>
</template>

<script setup>
import { useAuthSignIn } from "~/composables/useAuthSignIn";

definePageMeta({
  layout: "access",
});

const { signIn, error } = useAuthSignIn();
const email = ref();
const password = ref();

const handleSignIn = async () => {
  signIn(email.value, password.value);
  try {
    await navigateTo("/dashboard");
  } catch (error) {
    console.log(error.message);
  }
};
</script>

<style scoped>
.sign-in-btn {
  background-color: #46468f;
}
</style>
