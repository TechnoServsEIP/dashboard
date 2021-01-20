<template>
  <div>
    <div
      v-if="isLoading"
      style="display: flex; justify-content: center; align-items: center"
    >
      <half-circle-spinner
        :animation-duration="1000"
        :size="20"
        color="black"
      />
    </div>
    <div v-else class="mt-4">
      <admin-table-servers-list
        :servers="getServers"
        @update-server="updateServer"
      ></admin-table-servers-list>
    </div>
  </div>
</template>

<script>
import AdminTableServersList from '@/components/Table/AdminTableServersList'
import { HalfCircleSpinner } from 'epic-spinners'

export default {
  name: 'AdminServer',
  components: {
    AdminTableServersList,
    HalfCircleSpinner,
  },
  data() {
    return {
      servers: [],
      users: [],
      isLoading: false,
    }
  },
  async created() {
    this.isLoading = true
    await this.getServersFromApi()
    this.isLoading = false
  },

  computed: {
    getServers() {
      return this.servers
    },
  },
  methods: {
    updateServer(event) {
      this.servers = event
      // this.users.forEach(elem => {
      //   if (elem.ID == event.id) {
      //     elem.Verified = !event.verified;
      //   }
      // });
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
    async getServersFromApi() {
      await this.$axios
        .get('/user/', {
          headers: {
            authorization: `Bearer ${this.$store.state.user.token}`,
          },
        })
        .then(async (response) => {
          this.users = JSON.parse(JSON.stringify(response.data.res.Value))
          for (let index = 0; index < this.users.length; index++) {
            const user = this.users[index]
            // console.log(user)
            await this.getUserServers(user)
          }
        })
        .catch((e) => {
          console.log(e)
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
