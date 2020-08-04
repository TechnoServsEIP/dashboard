<template>
  <div>
    <b-table :data="appsList" hoverable>
      <template slot="empty">
        <div class="content has-text-grey has-text-centered">
          <p>No servers.</p>
        </div>
      </template>
      <template slot-scope="props">
        <b-table-column field="server_name" label="Name" width="25%">
          {{
          props.row.server_name
          }}
        </b-table-column>

        <b-table-column field="server_status" label="Status" width="40px">
          <span
            v-if="props.row.server_status == 'Started'"
            class="tag is-success"
          >{{ props.row.server_status }}</span>
          <span
            v-if="props.row.server_status == 'Stoped'"
            class="tag is-danger"
          >{{ props.row.server_status }}</span>
          <span
            v-if="props.row.server_status == 'Starting'"
            class="tag is-warning"
          >{{ props.row.server_status }}</span>
        </b-table-column>

        <b-table-column field="game" label="Game">
          {{
          props.row.game
          }}
        </b-table-column>

        <b-table-column label="Settings" width="40px">
          <b-dropdown hoverable>
            <button class="button is-dark" slot="trigger">
              <b-icon
                pack="fas"
                icon="cog"
                size="is-small"
                v-on:click.native="$router.push({ path: '/apps/create' })"
              />
            </button>

            <b-dropdown-item
              v-if="props.row.server_status == 'Started'"
              aria-role="listitem"
              v-on:click.native="stopServer(props.row.id_docker)"
            >Stop</b-dropdown-item>
            <b-dropdown-item
              v-else
              aria-role="listitem"
              v-on:click.native="startServer(props.row.id_docker)"
            >Start</b-dropdown-item>
          </b-dropdown>
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
          // console.log(this.appsList);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    stopServer(id) {
      console.log(`${this.$store.state.user.token}`);
      this.$axios
        .get(`/docker/stop`, {
          params: {
            user_id: this.$store.state.user.ID.toString(),
            container_id: id,
          },
        })
        .then((response) => {
          console.log(response);
          this.appsList = this.appsList.filter((v) => {
            if (v.id_docker == id) {
              v.server_status = "Stoped";
            }
            return v;
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    startServer(id) {
      this.$axios
        .post(
          "/docker/start",
          {
            user_id: this.$store.state.user.ID.toString(),
            container_id: id.toString(),
          },
          {
            headers: {
              Authorization: `Bearer ${this.$store.state.user.token}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          this.appsList = this.appsList.filter((v) => {
            if (v.id_docker == id) {
              v.server_status = "Started";
            }
            return v;
          });
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
