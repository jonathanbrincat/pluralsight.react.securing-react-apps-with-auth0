<template lang="pug">
#app
    nav
        ul
            li
                router-link(:to="isAuthenticated ? '/logout' : '/login'") {{ isAuthenticated ? 'Log out' : 'Log in' }}
            li
                router-link(to="/about") About
            li
                router-link(to="/dashboard") Dashboard
                span (authenticated)
    
    .body
        template(v-if="$route.matched.length")
            router-view
        
        template(v-else)
            p You are logged {{ isAuthenticated ? 'in' : 'out' }}
</template>

<script>
import auth from '../auth'

export default {
    data () {
        return {
            isAuthenticated: auth.isAuthenticated()
        }
    },

    created () {
        // MAGIC SAUCE! forms a contract with the vue reactivity
        // redefines the empty public method in auth and this function runs in it's current scope
        auth.onChange = (flag) => {
            this.isAuthenticated = flag
        }
    }
}
</script>
