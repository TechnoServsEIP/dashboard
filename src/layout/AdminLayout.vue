<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar short-title="TS" title="TechnoServs">
      <template slot="links">
        <sidebar-item
          :link="{
            name: 'Home',
            icon: 'ni ni-app text-primary',
            path: '/admin'
          }"
        />
        <sidebar-item
          :link="{
            name: 'Offers',
            icon: 'ni ni-cart text-primary',
            path: '/admin/offers'
          }"
        />
      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

      <div>
        <base-header
          type="gradient-default"
          class="pb-2 pb-4 pt-5 pt-md-5 mb-4"
        ></base-header>
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <div class="m-3">
            <router-view></router-view>
          </div>
        </fade-transition>
        <!-- <content-footer v-if="!$route.meta.hideFooter"></content-footer> -->
      </div>
    </div>
  </div>
</template>

<script>
import DashboardNavbar from "./DashboardNavbar.vue";
import { FadeTransition } from "vue2-transitions";

export default {
  name: "AdminLayout",
  components: {
    DashboardNavbar,
    FadeTransition
  },
  data() {
    return {
      sidebarBackground: "vue" //vue|blue|orange|green|red|primary
    };
  }
};
</script>
