<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    <router-link v-if="!isAuth" to="/register">Register</router-link>
    <router-link v-if="!isAuth" to="/login">Login</router-link>
    <router-link v-if="isAuth" to="/profile">Profile</router-link>
    <button v-if="isAuth" @click="logout">Logout</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Navigation",
  methods: {
    logout() {
      this.$store.commit("logout");
    },
  },
  computed: {
    ...mapGetters({
      isAuth: "isAuth",
    }),
  },
  watch: {},
};
</script>

<style lang="scss">
#nav {
  padding: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  a {
    font-weight: bold;
    color: #2c3e50;
    margin: 10px 10px;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>