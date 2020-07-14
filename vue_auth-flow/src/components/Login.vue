<template lang="pug">
    div
        h2 Login

        form(@submit.prevent="loginHandler")
            label: input(v-model="email" placeholder="email")
            label: input(v-model="pass" placeholder="password" type="password")
            | (hint: password1)
            br
            button(type="submit") login
            p.error(v-if="error") Bad login information
</template>

<script>
import auth from '../auth'

export default {
    data() {
        return {
            email: 'joe@example.com',
            pass: '',
            error: false,
        }
    },

    methods: {
        loginHandler () {
            auth.login(this.email, this.pass, (isAuthenticated) => {
                if(!isAuthenticated) {
                    this.error = true;
                }else {
                    this.$router.replace(this.$route.query.redirect || '/');
                }
            });
        }
    }
}
</script>

<style>
.error {
  color: red;
}
</style>
