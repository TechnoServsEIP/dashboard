<template>
  <div class="mx-4">
    <base-alert type="primary">
      <strong>Hint!</strong> Here you can send commands to your server
    </base-alert>
    <div class="my-2">
      <div class="row">
        <div class="col-12 d-flex align-items-center">
          <el-input
            v-model="commandInput"
            class="mr-2"
            placeholder="Type the command you want to send to your server"
            @keyup.enter.native="sendCommand"
          ></el-input>
          <el-button plain @click.prevent="sendCommand">Send</el-button>
        </div>
      </div>
    </div>

    <div class="my-3" v-if="commandResult">
      <div class="row">
        <div class="col-12">
          <code>
            <pre>{{ commandResult }}</pre>
          </code>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppCommands',
  data() {
    return {
      serverInfos: [],
      commandInput: '',
      commandResult: '',
    }
  },
  created() {
    this.isLogsLoading = true
    this.getServerInfos()
  },
  methods: {
    sendCommand() {
      var command = this.commandInput.replace(/\s+/g, '')
      if (command.length > 0) {
        this.$axios
          .post(
            '/Command',
            {
              user_id: this.$store.state.user.ID,
              docker_id: this.serverInfos[0].id_docker,
              command: command,
            },
            {
              headers: {
                authorization: `Bearer ${this.$store.state.user.token}`,
              },
            },
          )
          .then((response) => {
            console.log(response.data.message)
            this.commandResult = respone.data.message
            this.commandInput = ''
          })
          .catch((e) => {
            this.$notify({
              type: 'danger',
              title: `Wrong command`,
            })
          })
      }
    },
    getServerInfos() {
      this.$axios
        .post(
          '/docker/list',
          {
            user_id: this.$store.state.user.ID.toString(),
          },
          {
            headers: {
              authorization: `Bearer ${this.$store.state.user.token}`,
            },
          },
        )
        .then((response) => {
          this.serverInfos = response.data.list.filter((v) => {
            return v.ID == this.$route.params.id
          })
        })
        .catch((e) => {
          console.log(e)
        })
      // this.$store.state.client.Docker.list(this.$store.state.user.ID.toString())
      //   .then((response) => {
      //     this.serverInfos = response.list.filter((v) => {
      //       return v.ID == this.$route.params.id
      //     })
      //     this.getServerLogs()
      //   })
      //   .catch((e) => {
      //     console.log(e)
      //   })
    },
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
