<template>
  <div>
    <div v-if="isLoading">Loading...</div>

    <div
      v-else
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
            <th>Users connected</th>
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
                  <span class="name mb-0 text-sm">{{
                    row.server.server_name
                  }}</span>
                </div>
              </div>
            </td>

            <td>
              <div class="media align-items-center">
                <div class="media-body">
                  <span class="name mb-0 text-sm">{{
                    row.server.server_status == 'Started'
                      ? getOnlinePlayersFormatted(row.server) || 'Loading ...'
                      : 'Server stopped'
                  }}</span>
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
                    @click="selectedServer = row"
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

                  <el-dropdown-item @click.native="maxPlayerModal = true"
                    >Edit max players</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </td>
          </template>
        </base-table>

        <div v-else class="text-center mt-3">
          <h4>No servers</h4>
        </div>
      </div>
    </div>

    <modal
      :show.sync="maxPlayerModal"
      v-if="maxPlayerModal"
      modal-classes="modal-dialog-centered"
    >
      <template slot="header">
        <h3 class="modal-title" id="exampleModalLabel">
          Set max player for this server
        </h3>
      </template>
      <div class="d-flex">
        <el-input-number
          @change="handleIncreaseCounter"
          :min="0"
          :max="100"
          class="mr-2"
          type="number"
          :value="maxPlayer || selectedServer.server.limit_players"
        />
        <el-button @click.native="saveMaxPlayer">Save</el-button>
      </div>
    </modal>
  </div>
</template>

<script>
import { HalfCircleSpinner } from 'epic-spinners'

export default {
  name: 'AdminTableServersList',
  props: {
    servers: Array,
    type: {
      type: String,
    },
  },
  components: {
    HalfCircleSpinner,
  },

  data() {
    return {
      isLoading: false,
      selectedServers: {},
      searchInput: '',
      serversLocal: [],
      editActionLoading: [],
      maxPlayerModal: false,
      maxPlayer: '',
      selectedServer: null,
      connectedPlayers: [],
    }
  },

  async created() {
    this.isLoading = true
    this.serversLocal = this.servers
    await this.initEditActionLoading()
    this.isLoading = false
    // Set all loading button of servers to false
  },

  methods: {
    getOnlinePlayersFormatted(server) {
      if (this.connectedPlayers.length > 0) {
        const players = this.connectedPlayers.filter((v) => {
          return v.id == server.id_docker
        })
        if (players[0] !== undefined && players[0].info) {
          if (players[0].info.connectedPlayers !== undefined) {
            return `${players[0].info.connectedPlayers}/${server.limit_players}`
          } else {
            return 'Loading...'
          }
        }
      }
      return false
    },

    handleIncreaseCounter(value) {
      this.maxPlayer = value
    },

    getPlayersOnlinePerServer(id) {
      this.$axios
        .post(
          '/docker/playersonline',
          {
            user_id: this.$store.state.user.ID.toString(),
            container_id: id,
          },
          {
            headers: {
              authorization: `Bearer ${this.$store.state.user.token}`,
            },
          },
        )
        .then((response) => {
          this.connectedPlayers.push({ id, info: response.data.playersOnline })
        })
        .catch((e) => {
          console.error(e)
        })
    },

    saveMaxPlayer() {
      this.$axios
        .post(
          'docker/limitnumberplayers',
          {
            user_id: this.$store.state.user.ID.toString(),
            limit_players: this.maxPlayer,
            container_id: this.selectedServer.server.id_docker,
          },
          {
            headers: {
              authorization: `Bearer ${this.$store.state.user.token}`,
            },
          },
        )
        .then((response) => {
          this.$notify({
            type: 'success',
            title: 'Max player correctly updated',
          })
          this.maxPlayerModal = false
          this.selectedServer.server.limit_players = this.maxPlayer
          this.maxPlayer = ''
        })
        .catch((e) => {
          console.error(e)
          this.$notify({
            type: 'danger',
            title: 'Error while updating max player',
          })
          this.maxPlayerModal = false
          this.maxPlayer = ''
        })
    },
    async initEditActionLoading() {
      let element

      for (let index = 0; index < this.servers.length; index++) {
        this.editActionLoading.push({
          id: this.servers[index].server.ID,
          loading: false,
        })
        await this.getPlayersOnlinePerServer(
          this.servers[index].server.id_docker,
        )
      }
    },

    checkEditActionLoader(server) {
      // Return true if is loading
      if (this.editActionLoading) {
        const d = this.editActionLoading.find((x) => x.id === server.ID)
      }
    },

    setEditActionLoader(server, bool) {
      this.editActionLoading.find((x) => x.id === server.ID).loading = bool
    },

    getBadgeType(type) {
      switch (type) {
        case 'Started':
          return 'success'
        case 'Stopped':
          return 'danger'
        case 'Starting':
          return 'warning'
        case 'Stopping':
          return 'warning'
      }
    },

    updateTypeServer(type, id_docker) {
      this.servers.forEach((e) => {
        if (e.server.id_docker == id_docker) {
          e.server.server_status = type
        }
      })
    },

    startServer(server) {
      this.setEditActionLoader(server, true)
      this.updateTypeServer('Starting', server.id_docker)
      this.$store.state.client.Docker.start(
        this.$store.state.user.ID.toString(),
        server.id_docker,
      )
        .then((response) => {
          this.setEditActionLoader(server, false)
          this.updateTypeServer('Started', server.id_docker)
          this.$notify({
            type: 'success',
            title: 'Server correctly started',
          })
        })
        .catch((e) => {
          this.setEditActionLoader(server, false)
          this.$notify({
            type: 'danger',
            title: 'An error occured while starting server',
          })
          console.log(e._message)
        })
    },

    stopServer(server) {
      this.setEditActionLoader(server, true)
      this.updateTypeServer('Stopping', server.id_docker)
      this.$store.state.client.Docker.stop(
        this.$store.state.user.ID.toString(),
        server.id_docker,
      )
        .then((response) => {
          this.setEditActionLoader(server, false)
          this.updateTypeServer('Stopped', server.id_docker)
          this.$notify({
            type: 'success',
            title: 'Server correctly stoped',
          })
        })
        .catch((e) => {
          this.setEditActionLoader(server, false)
          this.$notify({
            type: 'danger',
            title: 'An error occured while stoping server',
          })
          console.log(e._message)
        })
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
      this.setEditActionLoader(server, true)
      this.updateTypeServer('Stopping', server.id_docker)
      this.$store.state.client.Docker.stop(
        this.$store.state.user.ID.toString(),
        server.id_docker,
      )
        .then(() => {
          this.updateTypeServer('Starting', server.id_docker)
          this.$store.state.client.Docker.start(
            this.$store.state.user.ID.toString(),
            server.id_docker,
          )
            .then((response) => {
              this.updateTypeServer('Started', server.id_docker)
              this.setEditActionLoader(server, false)
            })
            .catch((e) => {
              this.setEditActionLoader(server, false)
              console.log(e._message)
            })
          this.$notify({
            type: 'success',
            title: 'Server correctly restared',
          })
        })
        .catch((e) => {
          console.log(e)
          this.$notify({
            type: 'danger',
            title: 'An error occured while restarting server',
          })
        })
    },

    deleteServer(server) {
      console.log('Delete', server)
      this.$store.state.client.Docker.delete(
        this.$store.state.user.ID.toString(),
        server.id_docker,
      )
        .then((response) => {
          const newServers = this.servers.filter((el) => {
            return el.server.id_docker != server.id_docker
          })
          this.$emit('update-server', newServers)
          this.$notify({
            type: 'success',
            title: 'Server correctly deleted',
          })
        })
        .catch((e) => {
          this.$notify({
            type: 'danger',
            title: 'An error occured while deleting server',
          })
        })
    },
  },

  watch: {
    servers() {
      this.serversLocal = this.servers
    },
    searchInput() {
      if (this.searchInput == '') {
        this.serversLocal = this.servers
        return
      } else {
        this.serversLocal = this.servers.filter((v) => {
          return v.user.email.includes(this.searchInput)
        })
      }
    },
  },
}
</script>

<style lang="scss">
.el-form-item__label {
  text-align: left;
}
</style>
