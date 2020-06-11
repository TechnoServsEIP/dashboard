<template>
  <div>
    <nav-bar></nav-bar>
    <router-view />
  </div>
</template>

<script>
import NavBar from "../components/NavBar"

export default {
  name: 'Index',
  components: {
    NavBar
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="scss">

</style>
