<template>
  <div class="card shadow" style="width: 100%" :class="type === 'dark' ? 'bg-default' : ''">
    <div class="card-header" :class="type === 'dark' ? 'bg-transparent' : ''">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white' : ''">Servers</h3>
        </div>

        <div class="col-md-auto">
          <router-link to="/create">
            <base-button type="primary" size="sm">Create a server</base-button>
          </router-link>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <base-table
        v-if="tableData.length > 0"
        class="table align-items-center table-flush"
        :class="type === 'dark' ? 'table-dark' : ''"
        :thead-classes="type === 'dark' ? 'thead-dark' : 'thead-light'"
        tbody-classes="list"
        :data="tableData"
      >
        <template slot="columns">
          <th>Server</th>
          <th>Players connected</th>
          <th>Status</th>
          <th></th>
        </template>
        <template slot-scope="{ row }">
          <th scope="row">
            <div class="media align-items-center">
              <div class="media-body">
                <span class="name mb-0 text-sm">{{ row.server_name }}</span>
              </div>
            </div>
          </th>

          <td>
            <div class="media align-items-center">
              <div class="media-body">
                <span class="name mb-0 text-sm">0/100</span>
              </div>
            </div>
          </td>

          <td>
            <badge class="badge-dot mr-4" :type="row.statusType">
              <i :class="`bg-${row.statusType}`"></i>
              <span class="status">{{ row.server_status }}</span>
            </badge>
          </td>

          <td class="text-right">
            <router-link :to="{ path: `/dashboard/${row.ID.toString()}` }">
              <base-button type="dark" size="sm">Edit</base-button>
            </router-link>
          </td>
        </template>
      </base-table>

      <div v-else class="text-center mt-3">
        <h4>You don't have a server yet, create one to see it appear here !</h4>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "projects-table",
  props: {
    type: {
      type: String,
    },
    title: String,
  },
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.$store.state.client.Docker.list(this.$store.state.user.ID.toString())
      .then((response) => {
        this.tableData = response.list;
        for (var i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].server_status == "Stoped") {
            this.tableData[i].statusType = "danger";
          } else if (this.tableData[i].server_status == "Started") {
            this.tableData[i].statusType = "success";
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
</script>
<style></style>
