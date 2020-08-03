<template>
  <div>
    <nav class="navbar header has-shadow is-primary" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <n-link class="navbar-item" to="/apps">
          <img src="~assets/buefy.png" alt="Buefy" height="28" />
        </n-link>

        <div class="navbar-burger">
          <span />
          <span />
          <span />
        </div>
      </div>

      <div class="navbar-menu">
        <div class="navbar-end">
          <b-navbar-dropdown :label="$store.state.user.email">
            <b-navbar-item value="account" aria-role="menuitem">
              <b-icon icon="account"></b-icon>
              <p>Account</p>
            </b-navbar-item>
            <b-navbar-item value="logout" aria-role="menuitem" @click="userLogout()">
              <b-icon icon="logout"></b-icon>
              <p>Logout</p>
            </b-navbar-item>
          </b-navbar-dropdown>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    userLogout() {
      this.$store.commit("updateUser", null);
      this.$router.push({ path: "/auth/signin" });
    },
  },
};
</script>
