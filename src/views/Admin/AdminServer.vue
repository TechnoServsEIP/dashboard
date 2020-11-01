<template>
  <div>
    <div class="mt-4">
      <table-servers-list
        :servers="getServers"
        @update-user="setUserNewRole"
        @update-activate-user="updateActivatedUser"
        @update-verified-user="updateVerifiedUser"
      ></table-servers-list>
    </div>
  </div>
</template>

<script>
import TableServersList from "@/components/Table/TableServersList";

export default {
  name: "AdminServer",
  components: {
    TableServersList
  },
  data() {
    return {
      servers: [],
    };
  },
  created() {
    this.getServersFromApi();
  },
  computed: {
    getServers() {
      return this.servers;
    }
  },
  methods: {
    updateVerifiedUser(event) {
      this.users.forEach(elem => {
        if (elem.ID == event.id) {
          elem.Verified = !event.verified;
        }
      });
    },
    getTotalServers() {
      this.$axios
        .get("/docker/total", {
          headers: {
            authorization: `Bearer ${this.$store.state.user.token}`
          }
        })
        .then(response => {
          this.totalServers = response.data.total;
        })
        .catch(e => {
          console.log(e);
        });
    },
    setUserNewRole(event) {
      this.users.forEach(elem => {
        if (elem.ID == event.id) {
          elem.Role = event.role;
        }
      });
    },
    updateActivatedUser(event) {
      this.users.forEach(elem => {
        if (elem.ID == event.id) {
          elem.Activate = event.activate;
        }
      });
    },
    getServersFromApi() {
      this.$axios
        .get("/user/", {
          headers: {
            authorization: `Bearer ${this.$store.state.user.token}`
          }
        })
        .then(response => {
          this.users = response.data.res.Value;
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
i {
  font-size: 25px;
}
</style>
