<template>
  <div>
    <h1>Profile page</h1>
    <label
      >Your name
      <input type="text" :value="user.firstName" disabled />
    </label>
    <label
      >Your lastname <input type="text" :value="user.lastName" disabled
    /></label>
    <label>
      Your email
      <input type="text" :value="user.email" disabled />
    </label>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {
      user: {},
    };
  },
  methods: {},
  async beforeMount() {
    const user = await this.$store.dispatch("getUser");
    this.user = user;
  },
};
</script>

<style>
</style>