<template>
  <div>
    <b-table :data="appsList" :columns="appsListColumns" hoverable>
      <template slot="empty">
        <div class="content has-text-grey has-text-centered">
          <p>No servers.</p>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      appsList: [],
      appsListColumns: [
        {
          field: "server_name",
          label: "Name",
        },
        {
          field: "server_status",
          label: "Status",
        },
        {
          field: "connectedUsers",
          label: "Connected",
        },
        {
          field: "game",
          label: "Game",
        },
        {
          field: "iconEnd",
        },
      ],
    };
  },
  methods: {
    getUserApplications() {
      this.$axios
        .post(
          "/docker/list",
          {
            user_id: this.$store.state.user.ID.toString(),
          },
          {
            headers: {
              Authorization: `Bearer ${this.$store.state.user.token}`,
            },
          }
        )
        .then((response) => {
          this.appsList = response.data.list;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  created() {
    this.getUserApplications();
  },
};
</script>

<style lang="scss" scoped>
.b-table {
  width: 100%;
}
</style>
