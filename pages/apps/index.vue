<template>
  <div>
    <section class="section">
      <div class="columns">
        <h1 class="title is-3">Applications</h1>
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
    ApplicationsListTable
  }
};
</script>
