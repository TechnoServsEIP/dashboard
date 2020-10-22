<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar short-title="TS" title="TechnoServs">
      <template slot="links">
        <sidebar-item
          :link="{
            name: 'Overview',
            icon: 'ni ni-tv-2 text-primary',
            path: `/dashboard/${$route.params.id}/`
          }"
        />
        <sidebar-item
          :link="{
            name: 'Deployments',
            icon: 'ni ni-chart-bar-32 text-primary',
            path: `/dashboard/${$route.params.id}/logs`
          }"
        />
        <sidebar-item
          :link="{
            name: 'Environment',
            icon: 'ni ni-tv-2 text-primary',
            path: `/dashboard/${$route.params.id}/environment`
          }"
        />
        <sidebar-item
          :link="{
            name: 'Invite your friends',
            icon: 'ni ni-send text-primary',
            path: `/dashboard/${$route.params.id}/invite`
          }"
        />
      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

      <div @click="toggleSidebar">
        <base-header
          type="gradient-default"
          class="pb-2 pb-4 pt-5 pt-md-5 mb-4"
        ></base-header>
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
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
  components: {
    DashboardNavbar,
    FadeTransition
  },
  data() {
    return {
      sidebarBackground: "vue" //vue|blue|orange|green|red|primary
    };
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  }
};
</script>

<style lang="scss"></style>
