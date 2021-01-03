<template>
  <div>
    <div class="row">
      <div class="col-4">
        <stats-card
          title="Users"
          :subTitle="getUsers.length.toString()"
          icon="fas fa-users"
        >
        </stats-card>
      </div>
      <div class="col-4">
        <stats-card title="Users online" subTitle="0" icon="ni ni-laptop">
        </stats-card>
      </div>

      <div class="col-4">
        <stats-card
          title="Servers"
          :subTitle="totalServers.toString()"
          icon="ni ni-controller"
        >
        </stats-card>
      </div>
    </div>

    <div
      v-if="isLoading"
      class="mt-4"
      style="display: flex; justify-content: center; align-items: center"
    >
      <half-circle-spinner
        :animation-duration="1000"
        :size="20"
        color="black"
      />
    </div>

    <div v-else class="mt-4">
      <tabs :fill="false" circle>
        <tab-pane>
          <span slot="title" class="nav-link-icon d-block"
            ><i class="ni ni-laptop"></i
          ></span>
          <admin-table-servers-list
            :servers="getServers"
            @update-server="updateServer"
          ></admin-table-servers-list>
        </tab-pane>
        <tab-pane>
          <span slot="title" class="nav-link-icon d-block"
            ><i class="fas fa-users"></i
          ></span>
          <table-users-list
            :users="getUsers"
            @update-user="setUserNewRole"
            @update-activate-user="updateActivatedUser"
            @update-verified-user="updateVerifiedUser"
          ></table-users-list>
        </tab-pane>
      </tabs>
    </div>
  </div>
</template>

<script>
import StatsCard from '@/components/StatsCard'
import TableUsersList from '@/components/Table/TableUsersList'
import AdminTableServersList from '@/components/Table/AdminTableServersList'
import { HalfCircleSpinner } from 'epic-spinners'

export default {
  name: 'AdminHome',
  components: {
    StatsCard,
    TableUsersList,
    AdminTableServersList,
    HalfCircleSpinner,
  },
  data() {
    return {
      users: [],
      servers: [],
      totalServers: 0,
      isLoading: false,
    }
  },
  created() {
    this.getUsersFromApi()
    this.getTotalServers()
  },
  computed: {
    getUsers() {
      return this.users
    },
    getServers() {
      return this.servers
    },
  },
  methods: {
    async getUserServers(user) {
      await this.$store.state.client.Docker.list(user.ID.toString())
        .then((response) => {
          const servers = JSON.parse(JSON.stringify(response.list))
          if (servers && servers.length > 0) {
            for (let index = 0; index < servers.length; index++) {
              const server = JSON.parse(JSON.stringify(servers[index]))
              const element = { user, server }
              this.servers.push(element)
            }
          }
        })
        .catch((e) => {
          console.log(e._message)
        })
    },

    updateServer(event) {
      this.servers = event
    },

    updateVerifiedUser(event) {
      this.users.forEach((elem) => {
        if (elem.ID == event.id) {
          elem.Verified = !event.verified
        }
      })
    },
    getTotalServers() {
      this.$axios
        .get('/docker/total', {
          headers: {
            authorization: `Bearer ${this.$store.state.user.token}`,
          },
        })
        .then((response) => {
          this.totalServers = response.data.total
        })
        .catch((e) => {
          console.log(e)
        })
    },
    setUserNewRole(event) {
      this.users.forEach((elem) => {
        if (elem.ID == event.id) {
          elem.Role = event.role
        }
      })
    },
    updateActivatedUser(event) {
      this.users.forEach((elem) => {
        if (elem.ID == event.id) {
          elem.Activate = event.activate
        }
      })
    },
    async getUsersFromApi() {
      this.isLoading = true
      await this.$axios
        .get('/user/', {
          headers: {
            authorization: `Bearer ${this.$store.state.user.token}`,
          },
        })
        .then(async (response) => {
          this.users = response.data.res.Value
          for (let index = 0; index < this.users.length; index++) {
            const element = this.users[index]
            await this.getUserServers(element)
          }
          this.isLoading = false
        })
        .catch((e) => {
          console.log(e)
          this.isLoading = false
        })
    },
  },
}
</script>

<style lang="scss" scoped>
i {
  font-size: 25px;
}
</style>
