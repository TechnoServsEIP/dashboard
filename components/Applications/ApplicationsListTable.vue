<template>
  <div>
    <b-table :data="appsList" :columns="appsListColumns" hoverable>
      <template slot="empty">
        <div class="content has-text-grey has-text-centered">
          <p>No servers.</p>
        </div>
      </template>
      <template slot-scope="props">
        <b-table-column field="server_name" label="Name" width="25%">{{
          props.row.server_name
        }}</b-table-column>
        <b-table-column field="server_status" label="Status" width="40px">
          <span
            v-if="props.row.server_status == 'Started'"
            class="tag is-success"
          >
            {{ props.row.server_status }}
          </span>
          <span
            v-if="props.row.server_status == 'Stoped'"
            class="tag is-danger"
          >
            {{ props.row.server_status }}
          </span>
          <span
            v-if="props.row.server_status == 'Starting'"
            class="tag is-warning"
          >
            {{ props.row.server_status }}
          </span>
        </b-table-column>
        <b-table-column field="game" label="Game">{{
          props.row.game
        }}</b-table-column>
        <b-table-column label="Settings" width="40px">
          <b-button class="is-dark">
            <b-icon
              pack="fas"
              icon="cog"
              size="is-small"
              v-on:click.native="$router.push({ path: '/apps/create' })"
            />
          </b-button>
        </b-table-column>
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
        // {
        //   field: "server_name",
        //   label: "Name",
        // },
        // {
        //   field: "server_status",
        //   label: "Status",
        // },
        // {
        //   field: "connectedUsers",
        //   label: "Connected",
        // },
        // {
        //   field: "game",
        //   label: "Game",
        // },
      ]
    };
  },
  methods: {
    getUserApplications() {
      this.$axios
        .post(
          "/docker/list",
          {
            user_id: this.$store.state.user.ID.toString()
          },
          {
            headers: {
              Authorization: `Bearer ${this.$store.state.user.token}`
            }
          }
        )
        .then(response => {
          this.appsList = response.data.list;
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  created() {
    this.getUserApplications();
  }
};
</script>

<style lang="scss" scoped>
.b-table {
  width: 100%;
}
</style>
