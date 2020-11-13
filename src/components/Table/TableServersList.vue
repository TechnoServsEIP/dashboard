<template>
  <div>
    <div
      class="card shadow"
      style="width: 100%"
      :class="type === 'dark' ? 'bg-default' : ''"
    >
      <div class="card-header" :class="type === 'dark' ? 'bg-transparent' : ''">
        <div class="row align-items-center">
          <div class="col">
            <h3 class="mb-0" :class="type === 'dark' ? 'text-white' : ''">
              Servers
            </h3>
          </div>
          <div>
            <div class="col mr-auto">
              <el-input
                placeholder="Search by user"
                v-model="searchInput"
              ></el-input>
            </div>
          </div>
        </div>
      </div>

      <div class="table-responsive">
        <base-table
          v-if="serversLocal.length > 0"
          class="table align-items-center table-flush"
          :class="type === 'dark' ? 'table-dark' : ''"
          :thead-classes="type === 'dark' ? 'thead-dark' : 'thead-light'"
          tbody-classes="list"
          :data="serversLocal"
        >
          <template slot="columns">
            <th>Server ID</th>
            <th>Server name</th>
            <th>User email</th>
            <th>Server Status</th>
            <th></th>
          </template>
          <template slot-scope="{ row }">
            <th scope="row">
              <div class="media align-items-center">
                <div class="media-body">
                  <span class="name mb-0 text-sm">{{ row.server.ID }}</span>
                </div>
              </div>
            </th>

            <td>
              <div class="media align-items-center">
                <div class="media-body">
                  <span class="name mb-0 text-sm">{{ row.server.server_name }}</span>
                </div>
              </div>
            </td>

            <td>
              <div class="media align-items-center">
                <div class="media-body">
                  <span class="name mb-0 text-sm">{{ row.user.email }}</span>
                </div>
              </div>
            </td>

            <td>
                <badge
                  class="badge mr-4"
                  :type="getBadgeType(row.server.server_status) || 'primary'"
                >
                  <span class="status">{{ row.server.server_status }}</span>
                </badge>
              </td>

              <td class="text-right">
                <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                    <base-button
                      type="dark"
                      size="sm"
                      :disabled="checkEditActionLoader(row.server)"
                    >
                      <half-circle-spinner
                        v-if="checkEditActionLoader(row.server)"
                        :animation-duration="1000"
                        :size="20"
                        color="white"
                      />
                      <span v-else>Edit</span>
                    </base-button>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      v-if="row.server.server_status === 'Stopped'"
                      @click.native="startServer(row.server)"
                      >Start</el-dropdown-item
                    >
                    <el-dropdown-item
                      v-if="row.server.server_status == 'Started'"
                      @click.native="restartServer(row.server)"
                      >Restart</el-dropdown-item
                    >
                    <el-dropdown-item
                      v-if="row.server.server_status == 'Started'"
                      @click.native="stopServer(row.server)"
                      >Stop</el-dropdown-item
                    >
                    <el-dropdown-item @click.native="deleteServer(row.server)"
                      >Delete</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </el-dropdown>
                <!-- <router-link :to="{ path: `/dashboard/${row.ID.toString()}` }">
                  <base-button type="dark" size="sm">Edit</base-button>
                </router-link>-->
              </td>

            <!-- <td>
              <div class="media align-items-center">
                <div class="media-body">
                  <span v-if="row.Activate" class="icon icon-shape text-white rounded-circle shadow">
                    <i class="fas fa-check" style="color:green"></i>
                  </span>
                  <span v-else class="icon icon-shape text-white rounded-circle shadow">
                    <i class="fas fa-times" style="color:red"></i>
                  </span>
                </div>
              </div>
            </td>

            <td>
              <div class="media align-items-center">
                <div class="media-body">
                  <span v-if="row.Verified" class="icon icon-shape text-white rounded-circle shadow">
                    <i class="fas fa-check" style="color:green"></i>
                  </span>
                  <span v-else class="icon icon-shape text-white rounded-circle shadow">
                    <i class="fas fa-times" style="color:red"></i>
                  </span>
                </div>
              </div>
            </td>

            <td class="text-right">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <base-button type="dark" size="sm">Edit</base-button>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    @click.native="
                      updateUser(
                        row.ID.toString(),
                        row.Role === 'admin' ? 'user' : 'admin'
                      )
                    "
                  >
                    {{
                      row.Role === "admin"
                        ? "Change to user"
                        : "Change to admin"
                    }}
                  </el-dropdown-item>

                  <el-dropdown-item
                    @click.native="
                      updateActivateUser(!row.Activate, row.ID.toString())
                    "
                  >
                    {{
                      row.Activate === true
                        ? "Deactivate User"
                        : "Activate User"
                    }}
                  </el-dropdown-item>
                  <el-dropdown-item
                    @click.native="
                      updateVerifiedUser(!row.Verified, row.ID.toString())
                    "
                  >
                    {{
                      row.Verified === false
                        ? "Verify User"
                        : "Remove Verified User"
                    }}
                  </el-dropdown-item>
                  <el-dropdown-item
                    @click.native="toUserServers(row.ID.toString())"
                  >
                    See user servers
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </td> -->
          </template>
        </base-table>

        <div v-else class="text-center mt-3">
          <h4>No servers</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { HalfCircleSpinner } from "epic-spinners";

export default {
  name: "TableServersList",
  props: {
    servers: Array,
    type: {
      type: String
    }
  },
  components: {
    HalfCircleSpinner
  },

  data() {
    return {
      selectedServers: {},
      searchInput: "",
      serversLocal: [],
      editActionLoading: []
    };
  },

  created() {
    this.serversLocal = this.servers;
    this.initEditActionLoading();
    
    // Set all loading button of servers to false
  },

  methods: {
    initEditActionLoading() {
      let element;

      for (let index = 0; index < this.servers.length; index++) {
        this.editActionLoading.push({ id: this.servers[index].server.ID, loading: false })
      }
    },

    checkEditActionLoader(server) {
      // Return true if is loading
      if (this.editActionLoading) {
        const d = this.editActionLoading.find(x => x.id === server.ID)
      }
    },

    setEditActionLoader(server, bool) {
      this.editActionLoading.find(x => x.id === server.ID).loading = bool
    },

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
      this.servers.forEach(e => {
        if (e.server.id_docker == id_docker) {
          e.server.server_status = type;
        }
      });
    },

    startServer(server) {
      this.setEditActionLoader(server, true);
      this.updateTypeServer("Starting", server.id_docker);
      this.$store.state.client.Docker.start(
        this.$store.state.user.ID.toString(),
        server.id_docker
      )
        .then(response => {
          this.setEditActionLoader(server, false);
          this.updateTypeServer("Started", server.id_docker);
          this.$notify({
            type: "success",
            title: "Server correctly started"
          });
        })
        .catch(e => {
          this.setEditActionLoader(server, false);
          this.$notify({
            type: "danger",
            title: "An error occured while starting server"
          });
          console.log(e._message);
        });
    },
    stopServer(server) {
      this.setEditActionLoader(server, true);
      this.updateTypeServer("Stopping", server.id_docker);
      this.$store.state.client.Docker.stop(
        this.$store.state.user.ID.toString(),
        server.id_docker
      )
        .then(response => {
          this.setEditActionLoader(server, false);
          this.updateTypeServer("Stopped", server.id_docker);
          this.$notify({
            type: "success",
            title: "Server correctly stoped"
          });
        })
        .catch(e => {
          this.setEditActionLoader(server, false);
          this.$notify({
            type: "danger",
            title: "An error occured while stoping server"
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
    restartServer(server) {
      this.setEditActionLoader(server, true);
      this.updateTypeServer("Stopping", server.id_docker);
      this.$store.state.client.Docker.stop(
        this.$store.state.user.ID.toString(),
        server.id_docker
      )
        .then(() => {
          this.updateTypeServer("Starting", server.id_docker);
          this.$store.state.client.Docker.start(
            this.$store.state.user.ID.toString(),
            server.id_docker
          )
            .then(response => {
              this.updateTypeServer("Started", server.id_docker);
              this.setEditActionLoader(server, false);
            })
            .catch(e => {
              this.setEditActionLoader(server, false);
              console.log(e._message);
            });
          this.$notify({
            type: "success",
            title: "Server correctly restared"
          });
        })
        .catch(e => {
          console.log(e);
          this.$notify({
            type: "danger",
            title: "An error occured while restarting server"
          });
        });
    },
    deleteServer(server) {
      console.log("Delete", server);
      this.$store.state.client.Docker.delete(
        this.$store.state.user.ID.toString(),
        server.id_docker
      )
        .then(response => {
          const newServers = this.servers.filter(function(el) {
            return el.server.id_docker != server.id_docker;
          });
          this.$emit('update-server', newServers)
          this.$notify({
            type: "success",
            title: "Server correctly deleted"
          });
        })
        .catch(e => {
          this.$notify({
            type: "danger",
            title: "An error occured while deleting server"
          });
        });
    }
  },

  watch: {
    servers() {
      this.serversLocal = this.servers;
    },
    searchInput() {
      if (this.searchInput == "") {
        this.serversLocal = this.servers;
        return;
      } else {
        this.serversLocal = this.servers.filter(v => {
          return v.user.email.includes(this.searchInput);
        });
      }
    }
  }
};
</script>

<style lang="scss">
.el-form-item__label {
  text-align: left;
}
</style>
