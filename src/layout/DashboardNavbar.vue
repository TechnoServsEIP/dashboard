<template>
  <base-nav
    class="navbar-top navbar-dark"
    id="navbar-main"
    type="primary"
    :show-toggle-button="false"
    expand
  >
    <ul class="navbar-nav align-items-center d-none d-md-flex ml-lg-auto mb-1">
      <li class="nav-item dropdown">
        <base-dropdown class="nav-link pr-0" position="right">
          <div class="media align-items-center" slot="title">
            <div class="media-body ml-2 d-none d-lg-block">
              <span
                class="mb-0 text-sm font-weight-bold"
                style="cursor: pointer;"
              >
                <div class="icon icon-shape text-white rounded-circle shadow">
                  <i class="ni ni-single-02"></i>
                </div>
              </span>
              <i class="fas fa-caret-down"></i>
            </div>
          </div>

          <template>
            <div class="dropdown-header noti-title">
              <h6 class="text-overflow m-0">Welcome!</h6>
            </div>
            <router-link to="/dashboard" class="dropdown-item">
              <i class="ni ni-app"></i>
              <span>Dashboard</span>
            </router-link>
            <router-link
              v-if="$store.state.user.Role === 'admin'"
              :to="{ name: 'Admin' }"
              class="dropdown-item"
            >
              <i class="ni ni-spaceship"></i>
              <span>Admin Panel</span>
            </router-link>
            <router-link to="/profile" class="dropdown-item">
              <i class="ni ni-single-02"></i>
              <span>My profile</span>
            </router-link>
            <router-link to="/bills" class="dropdown-item">
              <i class="ni ni-credit-card"></i>
              <span>My bills</span>
            </router-link>
            <router-link to="/feedback" class="dropdown-item">
              <i class="ni ni-support-16"></i>
              <span>Feedback</span>
            </router-link>
            <div class="dropdown-divider"></div>
            <router-link to="/logout" class="dropdown-item">
              <i class="ni ni-user-run"></i>
              <span>Logout</span>
            </router-link>
          </template>
        </base-dropdown>
      </li>
    </ul>
  </base-nav>
</template>
<script>
export default {
  data() {
    return {
      activeNotifications: false,
      showMenu: false,
      searchQuery: "",
    };
  },
  methods: {
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
  },
};
</script>
