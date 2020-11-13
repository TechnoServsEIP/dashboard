<template>
  <div>
    <div v-if="isLoading"
      style="display: flex; justify-content: center; align-items: center">
      <half-circle-spinner
        :animation-duration="1000"
        :size="20"
        color="black"
      />
    </div>
    <div v-else
      class="mt-4">
      <table-servers-list
        :servers="getServers"
        @update-server="updateServer"
      ></table-servers-list>
    </div>
  </div>
</template>

<script>
import TableServersList from "@/components/Table/TableServersList";
import { HalfCircleSpinner } from "epic-spinners";

export default {
  name: "AdminServer",
  components: {
    TableServersList,
    HalfCircleSpinner
  },
  data() {
    return {
      servers: [],
      users: [],
      isLoading: true,
    };
  },
  async created() {
    await this.getServersFromApi();
    this.isLoading = false
  },

  computed: {
    getServers() {
      return this.servers;
    }
  },
  methods: {
    updateServer(event) {
      // this.users.forEach(elem => {
      //   if (elem.ID == event.id) {
      //     elem.Verified = !event.verified;
      //   }
      // });
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
    
    async getUserServers(user) {
      await this.$store.state.client.Docker.list(user.ID.toString())
        .then(response => {
          const servers = JSON.parse(JSON.stringify(response.list));
          if (servers && servers.length > 0) {
            for (let index = 0; index < servers.length; index++) {
              const server = JSON.parse(JSON.stringify(servers[index]));
              const element = { user, server }
              console.log(element)
              this.servers.push(element)
            }
          }
          // for (var i = 0; i < this.userServers.length; i++) {
          //   console.log(this.userServers[i].server_status);
          //   if (this.userServers[i].server_status == "Stopped") {
          //     this.userServers[i].statusType = "danger";
          //   } else if (this.userServers[i].server_status == "Started") {
          //     this.userServers[i].statusType = "success";
          //   }
          // }
        })
        .catch(e => {
          console.log(e._message);
        });
    },
    async getServersFromApi() {
      await this.$axios
        .get("/user/", {
          headers: {
            authorization: `Bearer ${this.$store.state.user.token}`
          }
        })
        .then(async response => {
          this.users = JSON.parse(JSON.stringify(response.data.res.Value));
          for (let index = 0; index < this.users.length; index++) {
            const user = this.users[index];
            // console.log(user)
            await this.getUserServers(user)
          }
        })
        .catch(e => {
          console.log(e);
        }
      );
    }

    
  }
};
</script>

<style lang="scss" scoped>
i {
  font-size: 25px;
}
</style>
