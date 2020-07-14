<template lang="pug">
    h1 Loading...
</template>

<script>
export default {
    name: "Callback",

    props: {
        auth: Object,
    },

    async created() {
        // Handle authentication if expected values are present in the URL. Let's look for these expected values using a regex.
        if(/access_token|id_token|error/.test(this.$route.hash)) {

            const authResult = await this.auth.handleAuthentication().catch(() => {});

            console.log('CALLBACK.VUE login');

            const expiresAt = JSON.stringify(
                authResult.expiresIn * 1000 + new Date().getTime()
            );

            this.$store.dispatch('setToken', expiresAt);
            this.$localStorage.token = expiresAt;

        }else {
            throw new Error("Invalid callback URL.");
        }
    },
};
</script>
