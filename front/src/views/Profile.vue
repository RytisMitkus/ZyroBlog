<template>
  <h1>Profile page</h1>
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