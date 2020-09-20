<template>
  <div>
    <div class="row ml-2 mr-2">
      <table-server-list :user-id="userId"></table-server-list>
    </div>
  </div>
</template>

<script>
import TableServerList from "../../../components/Technoservs/Tables/TableServerList";

export default {
  name: "AdminUserServers",
  components: {
    TableServerList,
  },
  props: {
    type: String,
  },
  data() {
    return {
      userServers: [],
    };
  },
  computed: {
    userId() {
      return this.$route.params.id;
    },
  },
};
</script>
