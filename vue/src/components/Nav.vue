<template lang="pug">
    nav
        ul
            li
                RouterLink(to="/" exact) Home

            li
                RouterLink(:to="{name: 'profile'}") Profile

            li
                RouterLink(to="/public-api") Public API

            //- li(v-if="auth.isAuthenticated()")
            li(v-if="$store.getters.isAuthenticated")
                RouterLink(to="/private-api") Private API

            //- li(v-if="auth.isAuthenticated() && auth.userHasScopes(['read:courses'])")
            li(v-if="$store.getters.isAuthenticated && auth.userHasScopes(['read:courses'])")
                RouterLink(to="/courses") Courses(Scoped Private API)

            li
                //- button(@click="() => {auth.isAuthenticated() ? logout() : auth.login()}") {{ auth.isAuthenticated() ? "Log Out" : "Log In" }}
                button(@click="() => {$store.getters.isAuthenticated ? logout() : auth.login()}") {{ $store.getters.isAuthenticated ? "Log Out" : "Log In" }}
            
            //- DEVNOTE: without the presence of a $localstorage reference in the render() reactivity of the auth.isAuthenticated call is not provoked
        //-
            li 
                ul
                    li auth.isAuthenticated = {{ auth.isAuthenticated() }}
                    li vuex getter: {{ $store.getters.isAuthenticated }}
                    li $localStorage.isAuthenticated = {{ $localStorage.isAuthenticated }}
            li
                ul
                    li Vuex: {{ $store.state.token }}
                    li $localStorage: {{ $localStorage.token }}            
</template>

<script>
export default {
    name: "Nav",

    props: {
        auth: Object,
    },

    methods: {
        async logout() {
            await this.auth.logout();

            console.log('NAV.VUE logout');

            this.$store.dispatch('removeToken');
            this.$localStorage.token = null;
        },
    },
};
</script>

<style scoped lang="scss">
    /*ul li li {
        display: block;
        float: none;
        margin: 0 20px;
    }

    ul ul {
        background: transparent none;
    }*/
</style>
