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
        filterLogs: true,
        countLog: 0,
        type: ""
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
                .then(response => {
                  let splited = null;
                  var serverLogsArray = response.logs.split('\n');
                  var regex1 = /Downloading minecraft_server/,
                          regex2 = /Setting difficulty/,
                          regex3 = /Starting minecraft server/,
                          regex4 = /Preparing spawn area:/,
                          regex5 = /Time elapsed:/,
                          regex6 = /RCON running/;
                  if (this.filterLogs == false)
                    this.serverLogs = response.logs;
                  else {
                    this.serverLogsArray.forEach(element => {
                      console.log(element);
                    });
                    switch (serverLogsArray[i]) {
                      case regex1.test(serverLogsArray[i]):
                        this.serverLogs += "Downloading the Minecraft Server.\n";
                        break;
                      case regex2.test(serverLogsArray[i]):
                        this.serverLogs = "Setting the difficulty.";
                        break;
                      case regex3.test(serverLogsArray[i]):
                        splited = serverLogsArray[i].split(' ');
                        this.serverLogs += "Starting the Server with " + version[version.length - 1] + " version.\n";
                        break;
                      case regex4.test(serverLogsArray[i]):
                        splited = serverLogsArray[i].split(' ');
                        this.serverLogs += "Generating the spawn area: " + splited[version.length - 1] + ".\n"
                      case regex5.test(serverLogsArray[i]):
                        splited = serverLogsArray[i].split(' ');
                        this.serverLogs += splited[version.length - 4] + " " + splited[version.length - 3] + " " + splited[version.length - 2] + " " + splited[version.length - 1] + ".\n";
                        break;
                      case regex6.test(serverLogsArray[i]):
                        this.filterLogs = false;
                        break;
                    }
                  }
                })
                .catch(e => {
                  console.log(e);
                });
      },
      getServerInfos() {
        this.$store.state.client.Docker.list(this.$store.state.user.ID.toString())
                .then(response => {
                  this.serverInfos = response.list.filter(v => {
                    return v.ID == this.$route.params.id;
                  });
                  this.getServerLogs();
                })
                .catch(e => {
                  console.log(e);
                });
      }
    },
    created() {
      this.getServerInfos();
    }
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
