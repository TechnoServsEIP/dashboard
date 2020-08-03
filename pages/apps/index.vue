<template>
  <div>
    <section class="section">
      <div class="columns">
        <h1 class="title is-3">Applications</h1>
        <b-button
          class="add-server-button"
          type="is-primary"
          v-on:click.native="$router.push({path: '/apps/create'})"
        >New Server</b-button>
      </div>
      <div>
        <applications-list-table />
      </div>
    </section>
  </div>
</template>

<script>
import ApplicationsListTable from "~/components/Applications/ApplicationsListTable";

export default {
  name: "AppsIndex",
  components: {
    ApplicationsListTable,
  },
};
</script>

<style lang="scss" scoped>
.add-server-button {
  margin-left: 2em;
}
</style>
