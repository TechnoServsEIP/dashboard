<template>
  <div>
    <base-header type="gradient-default" class="pb-6 pb-8 pt-5 pt-md-8"></base-header>

    <div class="container-fluid mt--7">
      <div class="row mt-5">
        <table-servers-list></table-servers-list>
      </div>
    </div>
  </div>
</template>
<script>
// Tables
import TableServersList from "../components/Technoservs/Tables/TableServerList";

export default {
  components: {
    TableServersList,
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>
<style></style>
