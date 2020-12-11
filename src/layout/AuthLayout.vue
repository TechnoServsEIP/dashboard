<template>
  <div class="main-content bg-gradient-custom-auth" style="min-height: 100vh">
    <div class="container pt-4">
      <div class="row justify-content-center">
        <div class="col-lg-5 col-md-6">
          <base-alert v-if="serverDown" type="danger"
            >The server is currently out of service. Please try
            later.</base-alert
          >
        </div>
      </div>
    </div>
    <div class="header py-7 py-lg-7">
      <div class="container">
        <div class="header-body text-center mb-7">
          <div class="row justify-content-center">
            <div class="col-lg-5 col-md-6">
              <!-- <h1 class="text-white">Welcome!</h1>
              <p class="text-lead text-white">
                Use these awesome forms to login or create new account in
                your project for free.
              </p> -->
              <img
                :src="require('@/assets/ts-logo-full-white.svg')"
                class="navbar-brand-img"
                alt="..."
              />
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="separator separator-bottom separator-skew zindex-100">
        <svg
          x="0"
          y="0"
          viewBox="0 0 2560 100"
          preserveAspectRatio="none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon class="fill-default" points="2560 0 2560 100 0 100" />
        </svg>
      </div> -->
    </div>
    <!-- Page content -->
    <div class="container mt--8 pb-5">
      <slide-y-up-transition mode="out-in" origin="center top">
        <router-view></router-view>
      </slide-y-up-transition>
    </div>
  </div>
</template>
<script>
import { SlideYUpTransition } from 'vue2-transitions'

export default {
  name: 'auth-layout',
  components: {
    SlideYUpTransition,
  },
  data() {
    return {
      showMenu: false,
      serverDown: false,
    }
  },
  created() {
    this.$axios.get('/').catch((e) => {
      this.serverDown = true
    })
  },
}
</script>
<style lang="scss">
.bg-gradient-custom-auth {
  background-color: #172b4d;
  background-image: url('../assets/circuit-board.svg');
}
</style>
