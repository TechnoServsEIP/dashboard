<template>
  <div>
    <div class="row ml-2 mr-2">
      <div class="card shadow" style="width: 100%" :class="type === 'dark' ? 'bg-default' : ''">
        <div class="card-header" :class="type === 'dark' ? 'bg-transparent' : ''">
          <div class="row align-items-center">
            <div class="col">
              <h3 class="mb-0" :class="type === 'dark' ? 'text-white' : ''">Servers</h3>
            </div>
          </div>
        </div>

        <div class="table-responsive">
          <base-table
            v-if="userServers.length > 0"
            class="table align-items-center table-flush"
            :class="type === 'dark' ? 'table-dark' : ''"
            :thead-classes="type === 'dark' ? 'thead-dark' : 'thead-light'"
            tbody-classes="list"
            :data="userServers"
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
                <badge class="badge mr-4" :type="getBadgeType(row.server_status) || 'primary'">
                  <span class="status">{{ row.server_status }}</span>
                </badge>
              </td>

              <td class="text-right">
                <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                    <base-button type="dark" size="sm" :disabled="isEditActionLoading">
                      <half-circle-spinner
                        v-if="isEditActionLoading"
                        :animation-duration="1000"
                        :size="20"
                        color="white"
                      />
                      <span v-else>Edit</span>
                    </base-button>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      v-if="row.server_status === 'Stopped'"
                      @click.native="startServer(row.id_docker)"
                    >Start</el-dropdown-item>
                    <el-dropdown-item @click.native="stopServer(row.id_docker)">Stop</el-dropdown-item>
                    <el-dropdown-item @click.native="deleteServer(row)">Delete</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <!-- <router-link :to="{ path: `/dashboard/${row.ID.toString()}` }">
                  <base-button type="dark" size="sm">Edit</base-button>
                </router-link>-->
              </td>
            </template>
          </base-table>

          <div v-else class="text-center mt-3">
            <h4>No servers</h4>
          </div>
        </div>
      </div>
      <!-- <table-server-list :user-id="userId"></table-server-list> -->
    </div>
  </div>
</template>

<script>
// import TableServerList from "../../../components/Technoservs/Tables/TableServerList";
import { HalfCircleSpinner } from "epic-spinners";

export default {
  name: "AdminUserServers",
  components: {
    // TableServerList,
    HalfCircleSpinner,
  },
  props: {
    type: String,
  },
  data() {
    return {
      userServers: [],
      isEditActionLoading: false,
      badgeTypeLoading: null,
    };
  },
  computed: {
    userId() {
      return this.$route.params.id;
    },
  },
  created() {
    this.getUserServers();
  },
  methods: {
    getBadgeType(type) {
      switch (type) {
        case "Started":
          return "success";
        case "Stopped":
          return "danger";
        case "Starting":
          return "warning";
        case "Stopping":
          return "warning";
      }
    },
    updateTypeServer(type, id_docker) {
      this.userServers.forEach((e) => {
        if (e.id_docker == id_docker) {
          e.server_status = type;
        }
      });
    },
    getUserServers() {
      this.$store.state.client.Docker.list(this.userId.toString())
        .then((response) => {
          console.log("response =>", response);
          this.userServers = response.list;
          for (var i = 0; i < this.userServers.length; i++) {
            console.log(this.userServers[i].server_status);
            if (this.userServers[i].server_status == "Stopped") {
              this.userServers[i].statusType = "danger";
            } else if (this.userServers[i].server_status == "Started") {
              this.userServers[i].statusType = "success";
            }
          }
        })
        .catch((e) => {
          console.log(e._message);
        });
    },
    startServer(id_docker) {
      this.isEditActionLoading = true;
      this.updateTypeServer("Starting", id_docker);
      this.$store.state.client.Docker.start(
        this.$store.state.user.ID.toString(),
        id_docker
      )
        .then((response) => {
          this.isEditActionLoading = false;
          this.updateTypeServer("Started", id_docker);
          this.$notify({
            type: "success",
            title: "Server correctly started",
          });
        })
        .catch((e) => {
          this.isEditActionLoading = false;
          this.$notify({
            type: "danger",
            title: "An error occured while starting server",
          });
          console.log(e._message);
        });
    },
    stopServer(id_docker) {
      this.isEditActionLoading = true;
      this.updateTypeServer("Stopping", id_docker);
      this.$store.state.client.Docker.stop(
        this.$route.params.id.toString(),
        id_docker
      )
        .then((response) => {
          this.isEditActionLoading = false;
          this.updateTypeServer("Stopped", id_docker);
          this.$notify({
            type: "success",
            title: "Server correctly stoped",
          });
        })
        .catch((e) => {
          this.isEditActionLoading = false;
          this.$notify({
            type: "danger",
            title: "An error occured while stoping server",
          });
          console.log(e._message);
        });
      // this.$store.state.client.Docker.stop(
      //   this.$store.state.user.ID.toString(),
      //   this.serverInfos[0].id_docker
      // )
      //   .then((response) => {
      //     this.serverInfos[0].server_status = "Stoped";
      //     this.updateServerStatus("exited");
      //     this.$notify({
      //       type: "success",
      //       title: "Server correctly stoped",
      //     });
      //   })
      //   .catch((e) => {
      //     this.$notify({
      //       type: "danger",
      //       title: "An error occured while stoping server",
      //     });
      //     console.log(e._message);
      //   });
    },
    // restartServer() {
    //   this.$store.state.client.Docker.stop(
    //     this.$store.state.user.ID.toString(),
    //     this.serverInfos[0].id_docker
    //   )
    //     .then(() => {
    //       this.$store.state.client.Docker.start(
    //         this.$store.state.user.ID.toString(),
    //         this.serverInfos[0].id_docker
    //       )
    //         .then((response) => {
    //           this.serverInfos[0].server_status = "Started";
    //           this.updateServerStatus(response.settings.State.Status);
    //         })
    //         .catch((e) => {
    //           console.log(e._message);
    //         });
    //       this.$notify({
    //         type: "success",
    //         title: "Server correctly restared",
    //       });
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //       this.$notify({
    //         type: "danger",
    //         title: "An error occured while restarting server",
    //       });
    //     });
    // },
    deleteServer(row) {
      console.log("Delete", row);
      // this.$store.state.client.Docker.delete(
      //   this.$store.state.user.ID.toString(),
      //   this.serverInfos[0].id_docker
      // )
      //   .then((response) => {
      //     console.log(response);
      //     this.$router.push({ path: "/dashboard" });
      //     this.$notify({
      //       type: "success",
      //       title: "Server correctly deleted",
      //     });
      //   })
      //   .catch((e) => {
      //     this.$notify({
      //       type: "danger",
      //       title: "An error occured while deleting server",
      //     });
      //     console.log(e._message);
      //   });
    },
  },
};
</script>

<style lang="scss" scoped>
.stopped-badge {
  background: red;
}
</style>
