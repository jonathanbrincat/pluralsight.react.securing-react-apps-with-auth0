<template lang="pug">
    div
        template(v-if="profile")
            h1 Profile
            p {{ profile.nickname }}
            img(:src="profile.pic" alt="profile pic" :style="{maxWidth: '50px', maxHeight: '50px'}")
            pre {{ JSON.stringify(profile, null, 4) }}
</template>

<script>
export default {
    name: "Profile",

    props: {
        auth: Object
    },

    data() {
        return {
            profile: null,
            error: "",
        }
    },

    beforeMount() {
        this.loadUserProfile();
    },

    methods: {
        loadUserProfile() {
            this.auth.getProfile((profile, error) => {
                this.profile = profile;
                this.error = error;
            });
        },
    },
};
</script>

<style scoped lang="scss"></style>
