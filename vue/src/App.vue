<template lang="pug">
  #app
    Nav(:auth="auth")
    .body
      RouterView(:auth="auth")
</template>

<script>
import Nav from "./components/Nav.vue";
import Auth from "./Auth/Auth";

export default {
  name: "App",

  components: {
    Nav,
  },
  
  created() {
    this.auth = new Auth(this.$router);
  },
};
</script>

<style lang="scss"></style>
