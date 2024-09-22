<template>
  <div class="home">
    <Navbar />
    <Section />
    <Sectiontop />
    <Footer />
  </div>
</template>

<script>
if (process.client) {
  import("bootstrap/dist/js/bootstrap.bundle.min.js");
}
import Navbar from "../components/Navbar/Navbar.vue";
import Footer from "../components/footer/footer.vue";
import Section from "../components/section/section.vue";
import Sectiontop from "../components/sectiontop/sectiontop.vue";

export default {
  name: "HOME",
  components: {
    Navbar,
    Footer,
    Section,
    Sectiontop,
  },
};
</script>

<style scoped>
.home {
  text-align: center;
}
</style>
