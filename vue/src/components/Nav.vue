<template lang="pug">
    nav
        ul
            li
                RouterLink(to="/" exact) Home
            li
                RouterLink(to="/profile") Profile
            li
                button(@click="clickHandler") {{ auth.isAuthenticated() ? "Log Out" : "Log In" }}
            li
                ul
                    //- it's because we make localstorage reactive that auth.isAuthenticated starts working
                    li isAuthenticated = {{ isAuthenticated }}
                    li auth.isAuthenticated = {{ auth.isAuthenticated() }}
            li {{ $store.state.token }}
            li {{ eventBusToken }}
            li {{ $localStorage.token }}
        //-
            li
                RouterLink(to="/public-api") Public API
            li
                RouterLink(to="/private-api") Private API
            li
                RouterLink(to="/courses") Courses(Scoped Private API)
</template>

<script>
import { $eventBus } from '../main';

export default {
  name: "Nav",

  props: {
    auth: Object,
  },

  data() {
    return {
        token: JSON.parse(localStorage.getItem("expires_at")),
    }
  },

  methods: {
    clickHandler() {
        if(this.auth.isAuthenticated()) {
            // this.auth.logout();

            localStorage.removeItem("access_token");
            localStorage.removeItem("id_token");
            localStorage.removeItem("expires_at");

            this.$localStorage.tokenExpiry = null;

            this.$router.push("/").catch( () => {});
        } else {
            this.auth.login();
        }
    },
  },

  computed: {
    isAuthenticated() {
        const expiresAt = JSON.parse(this.$localStorage.tokenExpiry);
        return new Date().getTime() < expiresAt;
    },

    eventBusToken() {
      return $eventBus.token;
    }
  },
};
</script>

<style scoped lang="scss">
    ul li li {
        display: block;
        float: none;
    }
</style>
