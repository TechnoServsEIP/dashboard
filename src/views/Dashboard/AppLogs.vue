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
            </div>
          </div>

          <div class="card-body">
            <code>
              <pre>
                <div v-for="(log, index) in serverLogs" :key="index">{{ log }}</div>
              </pre>
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
      serverLogs: [],
      filterLogs: true,
      countLog: 0,
      type: '',
    }
  },
  methods: {
    refreshServerLogs() {
      this.getServerLogs()
    },
    formatLogs(logs) {
      const newLogs = []
      const regexInit = new RegExp('\\[init')

      logs.split('\n').forEach((value) => {
        const sliced = value.split(' ').slice(1)
        const tmp = sliced.join(' ')
        if (tmp.length > 0) {
          if (
            !regexInit.test(tmp) &&
            !new RegExp('\\[main/INFO').test(tmp) &&
            !new RegExp('\\[main/WARN').test(tmp) &&
            !new RegExp('\\[RCON Client').test(tmp) &&
            !new RegExp('\\[Worker-Main-4/INFO').test(tmp)
          ) {
            let timer = tmp.split(' ')[0]
            let rest = tmp.split(' ').slice(1)
            newLogs.push(`${timer} ${rest.join(' ')}`)
          }
        }
      })
      return newLogs
    },
    getServerLogs() {
      this.$axios
        .post(
          '/docker/logs',
          {
            user_id: this.$store.state.user.ID.toString(),
            container_id: this.serverInfos[0].id_docker,
          },
          {
            headers: {
              authorization: `Bearer ${this.$store.state.user.token}`,
            },
          },
        )
        .then((response) => {
          this.serverLogs = this.formatLogs(response.data.logs)
          this.isLogsLoading = false
        })
        .catch((e) => {
          console.log(e)
          this.isLogsLoading = false
        })
    },
    getServerInfos() {
      this.$store.state.client.Docker.list(this.$store.state.user.ID.toString())
        .then((response) => {
          this.serverInfos = response.list.filter((v) => {
            return v.ID == this.$route.params.id
          })
          this.getServerLogs()
        })
        .catch((e) => {
          console.log(e)
        })
    },
  },
  created() {
    this.getServerInfos()
  },
}
</script>

<style lang="scss">
code {
  pre {
    max-height: calc(100vh - 240px);
    background-color: #191e4e;
    padding: 2em;
    color: white;
  }
}
</style>
