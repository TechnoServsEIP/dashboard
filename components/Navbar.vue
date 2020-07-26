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
              <span>Menu</span>
              <b-icon icon="menu-down"></b-icon>
            </a>

            <b-dropdown-item custom aria-role="menuitem">
              Logged as <b>Rafael Beraldo</b>
            </b-dropdown-item>
            <hr class="dropdown-divider" />
            <b-dropdown-item has-link aria-role="menuitem">
              <a href="https://google.com" target="_blank">
                <b-icon icon="link"></b-icon>
                Google (link)
              </a>
            </b-dropdown-item>
            <b-dropdown-item value="home" aria-role="menuitem">
              <b-icon icon="home"></b-icon>
              Home
            </b-dropdown-item>
            <b-dropdown-item value="products" aria-role="menuitem">
              <b-icon icon="cart"></b-icon>
              Products
            </b-dropdown-item>
            <b-dropdown-item value="blog" disabled aria-role="menuitem">
              <b-icon icon="book-open"></b-icon>
              Blog
            </b-dropdown-item>
            <hr class="dropdown-divider" aria-role="menuitem" />
            <b-dropdown-item value="settings">
              <b-icon icon="settings"></b-icon>
              Settings
            </b-dropdown-item>
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
    async userLogout() {
      await this.$auth.logout();
    }
  }
};
</script>
