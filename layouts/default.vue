<template>
  <div>
    <nav-bar></nav-bar>
    <section class="main-content columns">
      <div class="container column is-10">
        <nuxt />
      </div>
    </section>
  </div>
</template>

<script>
import NavBar from "~/components/Navbar";

export default {
  middleware: "auth",
  components: {
    NavBar
  }
};
</script>
