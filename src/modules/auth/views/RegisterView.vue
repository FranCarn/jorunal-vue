<template>
  <span class="login100-form-title p-b-41">DAYBOOK</span>
  <form
    class="login100-form validate-form p-b-33 p-t-5"
    @submit.prevent="onSubmit"
  >
    <div class="wrap-input100 validate-input" data-validate="Enter name">
      <input
        class="input100"
        v-model="userForm.name"
        type="text"
        placeholder="Name"
        required
      />
      <span class="focus-input100" data-placeholder="&#xe82a;"></span>
    </div>
    <div class="wrap-input100 validate-input" data-validate="Enter username">
      <input
        class="input100"
        v-model="userForm.email"
        type="email"
        placeholder="Email"
        required
      />
      <span class="focus-input100" data-placeholder="&#xe818;"></span>
    </div>

    <div class="wrap-input100 validate-input" data-validate="Enter password">
      <input
        class="input100"
        v-model="userForm.password"
        type="password"
        placeholder="Password"
        required
      />
      <span class="focus-input100" data-placeholder="&#xe80f;"></span>
    </div>

    <div class="container-login100-form-btn m-t-32">
      <button class="login100-form-btn" type="submit">Create Account</button>
    </div>

    <div class="container-login100-form-btn m-t-32">
      <router-link :to="{ name: 'login' }"
        >Already have an account?</router-link
      >
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import useAuth from "../composables/useAuth";
export default {
  setup() {
    const { createUser } = useAuth();
    const userForm = ref({
      email: "",
      password: "",
      name: "",
    });
    return {
      userForm,
      onSubmit: async () => {
        const { ok, message } = await createUser(userForm.value);
      },
    };
  },
};
</script>

<style></style>
