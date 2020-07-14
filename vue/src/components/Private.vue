<template lang="pug">
    p {{ message }}
</template>

<script>
export default {
    name: "Private",

    props: {
        auth: Object
    },

    data() {
        return {
            message: "",
        };
    },

    created() {
        fetch("/private", {
            headers: {
                Authorization: `Bearer ${this.auth.getAccessToken()}`,
            },
        })
            .then((response) => {
                if(response.ok) return response.json();
                throw new Error("Network response was not ok.");
            })
            .then((response) => {
                return (this.message = response.message);
            })
            .catch((error) => {
                return (this.message = error.message);
            });
    },
};
</script>

<style scoped lang="scss"></style>
