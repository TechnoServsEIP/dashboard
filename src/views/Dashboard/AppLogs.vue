<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div
          v-if="serverInfos.length > 0"
          class="card shadow"
          style="width: 100%"
          :class="type === 'dark' ? 'bg-default' : ''"
        >
          <div
            class="card-header"
            :class="type === 'dark' ? 'bg-transparent' : ''"
          >
            <div class="row">
              <div class="col">
                <h3 class="mb-0" :class="type === 'dark' ? 'text-white' : ''">
                  Logs
                </h3>
              </div>
              <div class="col-md-auto">
                <base-button
                  type="success"
                  outline
                  size="sm"
                  @click.prevent="refreshServerLogs"
                  >Refresh</base-button
                >
              </div>
            </div>
          </div>

          <div class="card-body">
            <code class="ts-code">
              <pre>{{ serverLogs }}</pre>
            </code>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      serverInfos: [],
      serverLogs: null,
      type: "",
    };
  },
  methods: {
    refreshServerLogs() {
      this.getServerLogs();
    },
    getServerLogs() {
      this.$store.state.client.Docker.logs(
        this.$store.state.user.ID.toString(),
        this.serverInfos[0].id_docker
      )
        .then((response) => {
          this.serverLogs = response.logs;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getServerInfos() {
      this.$store.state.client.Docker.list(this.$store.state.user.ID.toString())
        .then((response) => {
          this.serverInfos = response.list.filter((v) => {
            return v.ID == this.$route.params.id;
          });
          this.getServerLogs();
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  created() {
    this.getServerInfos();
  },
};
</script>

<style lang="scss">
code {
  pre {
    background-color: #191e4e;
    padding: 2em;
    color: white;
  }
}
</style>
