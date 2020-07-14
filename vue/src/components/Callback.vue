<template lang="pug">
  h1 Loading...
</template>

<script>
export default {
  name: "Callback",

  props: {
    auth: Object,
  },

  created() {
    // Handle authentication if expected values are present in the URL. Let's look for these expected values using a regex.
    if (/access_token|id_token|error/.test(this.$route.hash)) {

      this.auth.handleAuthentication().then((authResult) => {
        // this.setSession(authResult)

        const expiresAt = JSON.stringify(
          authResult.expiresIn * 1000 + new Date().getTime()
        );
        
        this.$localStorage.tokenExpiry = expiresAt;

      }, (error) => {
        console.log(error);
      });

    } else {
      throw new Error("Invalid callback URL.");
    }

    // this.$router.push("/");
  },

  methods: {
    setSession(authResult) {
      // set the time that the access token will expire
      const expiresAt = JSON.stringify(
        authResult.expiresIn * 1000 + new Date().getTime()
      );

      localStorage.setItem("access_token", authResult.accessToken);
      localStorage.setItem("id_token", authResult.idToken);
      this.$localStorage.tokenExpiry = expiresAt;
    }
  }
};
</script>
