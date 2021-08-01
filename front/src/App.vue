<template>
  <navigation />
  <router-view />
</template>

<script>
import Navigation from "./components/Navigation.vue";
export default {
  components: { Navigation },
  name: "App",
  beforeMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.$store.commit("setUser", user);
    }
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
