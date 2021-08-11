<template>
  <form>
    <h1>Login page</h1>
    <label for="email">
      email
      <input name="email" type="text" v-model="email" />
    </label>
    <label for="password">
      password
      <input name="password" type="password" v-model="password" />
    </label>
    <button type="submit" @click.prevent="submit">Login</button>
  </form>
</template>


<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    submit() {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>

<style>
</style>