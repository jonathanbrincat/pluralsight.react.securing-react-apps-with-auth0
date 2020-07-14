<template lang="pug">
    p {{ message }}
</template>

<script>
export default {
    name: "Public",
    
    data() {
        return {
            message: "",
        };
    },

    created() {
        fetch("/public")
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
