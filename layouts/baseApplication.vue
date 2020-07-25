<template>
  <div>
    <nav-bar></nav-bar>
    <aside class="column is-2 section">
      <p class="menu-label is-hidden-touch">
        General
      </p>
      <ul class="menu-list">
        <li v-for="(item, key) of items" :key="key">
          <nuxt-link :to="item.to" exact-active-class="is-active">
            <b-icon :icon="item.icon" /> {{ item.title }}
          </nuxt-link>
        </li>
      </ul>
    </aside>
    <nuxt />
  </div>
</template>

<script>
import NavBar from "~/components/Navbar";

export default {
  layout: "default",
  components: {
    NavBar
  },
  data() {
    return {
      items: [
        {
          title: "Home",
          icon: "home",
          to: { name: "index" }
        },
        {
          title: "Inspire",
          icon: "lightbulb",
          to: { name: "inspire" }
        }
      ]
    };
  }
};
</script>
