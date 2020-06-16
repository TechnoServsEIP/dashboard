<template>
  <div>
    <nav-bar></nav-bar>
    <router-view />
  </div>
</template>

<script>
import NavBar from '../../components/NavBar'

export default {
  name: 'IndexAdmin',
  components: {
    NavBar,
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss"></style>
