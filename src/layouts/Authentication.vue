<template>
<q-layout>
  <div class="row">
    <div class="col authentication-view">
      <img src="~src/assets/technoservs_logo.svg" width="250px" alt="technoservs-logo">
      <router-view></router-view>
    </div>
    <div class="col-5 gt-sm">
      <div class="authentication-svg-background">
        <img class="authentication-svg" src='~src/statics/authentication_logo.svg' alt="background-authentication"/>
      </div>
    </div>
  </div>
</q-layout>
</template>

<script>
export default {
  name: 'Authentication',
  data() {
    return {
      svg: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.authentication-view {
  padding: 2em;
}
.authentication-svg {
  display: block;
  height: 90%;
  margin: auto;
}
</style>
