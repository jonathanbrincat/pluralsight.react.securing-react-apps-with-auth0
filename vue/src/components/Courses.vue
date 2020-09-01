<template lang="pug">
div
  h1 Courses
  ul
    li(v-for="course in courses", :key="course.id") {{ course.title }}
</template>

<script>
export default {
  name: "Courses",

  props: {
    auth: Object,
  },

  data() {
    return {
      courses: [],
      message: "",
    };
  },

  created() {
    fetch("/course", {
      headers: {
        Authorization: `Bearer ${this.auth.getAccessToken()}`,
      },
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Network response was not ok.");
      })
      .then((response) => {
        return (this.courses = response.courses);
      })
      .catch((error) => {
        return (this.message = error.message);
      });

    fetch("/admin", {
      headers: {
        Authorization: `Bearer ${this.auth.getAccessToken()}`,
      },
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Network response was not ok.");
      })
      .then((response) => {
        return console.log(response);
      })
      .catch((error) => {
        return (this.message = error.message);
      });
  },
};
</script>

<style scoped lang="scss"></style>
