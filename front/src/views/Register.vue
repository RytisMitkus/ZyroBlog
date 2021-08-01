<template>
  <div class="container m-auto">
    <h1 class="text-gray-700">Sign in</h1>
    <div class="flex flex-col items-center">
      <input
        type="text"
        class="form-input px-4 py-3 rounded-full w-1/6 my-3"
        placeholder="First Name"
        v-model="firstName"
      />
      <input
        type="text"
        class="form-input px-4 py-3 rounded-full w-1/6 my-3"
        placeholder="Last Name"
        v-model="lastName"
      />
      <input
        type="email"
        class="form-input px-4 py-3 rounded-full w-1/6 my-3"
        placeholder="Email"
        v-model="email"
      />
      <input
        type="password"
        class="form-input px-4 py-3 rounded-full w-1/6 my-3"
        placeholder="Password"
        v-model="password"
      />
      <button
        @click="onSubmit"
        class="
          w-1/6
          bg-blue-500
          py-3
          px-4
          my-3
          rounded-3xl
          hover:bg-blue-700
          hover:text-white
        "
      >
        Register
      </button>
      <p v-if="errMsg">{{ errMsg }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      errMsg: "",
    };
  },
  methods: {
    async onSubmit() {
      const reg = await this.$store.dispatch("register", {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
      });
      this.errMsg = reg;
    },
  },
};
</script>

<style>
</style>