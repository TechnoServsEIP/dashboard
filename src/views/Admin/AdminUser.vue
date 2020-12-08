<template>
  <div>
    <div class="mt-4">
      <table-users-list
        :users="getUsers"
        @update-user="setUserNewRole"
        @update-activate-user="updateActivatedUser"
        @update-verified-user="updateVerifiedUser"
      ></table-users-list>
    </div>
  </div>
</template>

<script>
import TableUsersList from '@/components/Table/TableUsersList'

export default {
  name: 'AdminUser',
  components: {
    TableUsersList,
  },
  data() {
    return {
      users: [],
      totalServers: 0,
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
  },
  methods: {
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
    getUsersFromApi() {
      this.$axios
        .get('/user/', {
          headers: {
            authorization: `Bearer ${this.$store.state.user.token}`,
          },
        })
        .then((response) => {
          this.users = response.data.res.Value
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
