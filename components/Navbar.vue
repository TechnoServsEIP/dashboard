<template>
  <div>
    <nav
      class="navbar header has-shadow is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <a class="navbar-item" href="/apps">
          <img src="~assets/buefy.png" alt="Buefy" height="28" />
        </a>

        <div class="navbar-burger">
          <span />
          <span />
          <span />
        </div>
      </div>

      <div class="navbar-menu">
        <div class="navbar-end">
          <b-dropdown position="is-bottom-left" append-to-body aria-role="menu">
            <a class="navbar-item" slot="trigger" role="button">
              <span>{{ $store.state.user.email }}</span>
              <b-icon icon="menu-down"></b-icon>
            </a>

            <b-dropdown-item
              value="logout"
              aria-role="menuitem"
              @click="userLogout()"
            >
              <b-icon icon="logout"></b-icon>
              Logout
            </b-dropdown-item>
          </b-dropdown>
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
    }
  }
};
</script>
