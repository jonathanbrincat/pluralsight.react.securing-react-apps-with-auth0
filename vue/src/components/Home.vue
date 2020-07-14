<template lang="pug">
    div
        h1 Home
        //- RouterLink(to="/profile" v-if="auth.isAuthenticated()") View Profile
        RouterLink(to="/profile" v-if="$store.getters.isAuthenticated") View Profile
        button(@click="auth.login" v-else) Log In

    //-
        p auth.isAuthenticated = {{ auth.isAuthenticated() }}
        p vuex getter: {{ $store.getters.isAuthenticated }}
        p $localStorage: {{ $localStorage.isAuthenticated }}

        hr

        h3 GLOBAL REACTIVITY IMPLEMENTATION
        button(@click="() => { auth.isAuthenticated() ? logout() : auth.login() }") {{ auth.isAuthenticated() ? 'log out' : 'log in'}}

        h4 1.Vuex
        p Token: {{ $store.state.token }}

        h4 3.Vue instance (watcher)
        p Token: {{ $localStorage.token }}
        
</template>

<script>
export default {
    name: "Home",

    props: {
        auth: Object
    },

    methods: {
        async logout() {
            await this.auth.logout();

            console.log('HOME.VUE logout');

            this.$store.dispatch('removeToken');
            this.$localStorage.token = null;
        },
    },
};
</script>
