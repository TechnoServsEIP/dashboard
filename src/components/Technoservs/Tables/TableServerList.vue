<template>
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

        <div v-if="tableData.length > 0 && createButton" class="col-md-auto">
          <router-link to="/create">
            <base-button type="primary" size="sm">Create a server</base-button>
          </router-link>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <div
        v-if="isLoading"
        class="my-3"
        style="display: flex; justify-content: center; align-items: center"
      >
        <half-circle-spinner
          :animation-duration="1000"
          :size="20"
          color="black"
        />
      </div>
      <base-table
        v-else-if="tableData.length > 0"
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
                <span class="name mb-0 text-sm">{{
                  row.statusType == 'success'
                    ? getOnlinePlayersFormatted(row.id_docker) || 'Loading ...'
                    : 'Server down'
                }}</span>
              </div>
            </div>
          </td>

          <td>
            <badge class="badge mr-4" :type="row.statusType">
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

      <div v-else class="text-center my-3">
        <h4 class="my-3">You have no server yet</h4>
        <div class="my-3">
          <!-- https://lottiefiles.com/16701-launch-qualibrate -->
          <lottie-animation
            path="https://assets5.lottiefiles.com/packages/lf20_yNhVL9.json"
            :width="300"
            :height="300"
          />
        </div>
        <router-link to="/create">
          <base-button type="primary" size="sm">Create here</base-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import LottieAnimation from '@/components/LottieAnimation.vue'
import { HalfCircleSpinner } from 'epic-spinners'

export default {
  name: 'projects-table',
  components: {
    LottieAnimation,
    HalfCircleSpinner,
  },
  props: {
    type: {
      type: String,
    },
    title: String,
    userId: {
      type: String,
      default: '2',
    },
    createButton: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tableData: [],
      isLoading: false,
      connectedPlayers: [],
    }
  },
  created() {
    this.isLoading = true
    this.$store.state.client.Docker.list(this.userId)
      .then((response) => {
        this.tableData = response.list
        for (var i = 0; i < this.tableData.length; i++) {
          this.getPlayersOnlinePerServer(this.tableData[i].id_docker)
          if (this.tableData[i].settings.State.Health.Status === 'unhealthy')
            this.tableData[i].statusType = 'danger'
          else if (this.tableData[i].settings.State.Health.Status === 'healthy')
            this.tableData[i].statusType = 'success'
          else {
            this.tableData[i].statusType = 'warning'
            this.tableData[i].server_status = 'Down'
          }
        }
        this.$emit('change', response.list)
        this.isLoading = false
      })
      .catch((e) => {
        this.isLoading = false
      })
  },
  methods: {
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
          console.log(e)
        })
    },
    getOnlinePlayersFormatted(id) {
      if (this.connectedPlayers.length > 0) {
        const players = this.connectedPlayers.filter((v) => {
          return v.id == id
        })
        if (players[0] !== undefined)
          return `${players[0].info.connectedPlayers}/${players[0].info.maxPlayers}`
      }
    },
  },
}
</script>
<style></style>
