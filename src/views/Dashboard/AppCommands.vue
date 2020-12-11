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

    <div class="my-3 container">
      <div class="row">
        <div class="col-12 commands-list-container">
          <vue-markdown
            table-class="table-command"
            source="# Command list
            | Commands        | Description           | Requirements  |
| ------------- |-------------| -----|
| `ban <playername> [reason]`     | Blacklists the name playername from the server so that they can no longer connect. Note: Bans supersede any whitelisting in place. | Always succeeds. |
| `ban-ip <ip-address | playername>`     | Blacklists an IP address so that all subsequent connecti.ons from it are rejected. | ip-address must be valid orplayername must be online. |
| `banlist [ips]` | Displays the banlist. To display banned IP addresses, use the command 'banlist ips' | Always succeeds. |
| `deop <playername>` | Revokes a player's operator status. | Always succeeds. |
| `kick <playername> [reason]` | Forcibly disconnects playername from the server, displaying an optionalreason to them. | Playername must be online. |
| `list` | Shows the names of all currently-connected players (the same can be achieved when pressing tab) | Always succeeds, even in a command block. |
| `op <playername>` | Grants playername operator status on the server.	 | Always succeeds. |
| `pardon <playername>` | Removes playername from the blacklist, allowing them to connect again.	 | Always succeeds. |
| `pardon >` | Removes ip-address from the IP blacklist, allowing players from that IP address to connect to the server.	 | ip-address must be valid. |
| `save-all` | Forces the server to write all pending changes to the world to disk.	 | Always succeeds. |
| `save-off` | Disables the server writing to the world files. All changes will temporarily be queued.	 | Always succeeds.|
| `save-on` | Enables the server writing to the world files. This is the default behavior.	  | Always succeeds.|
| `whitelist <add | remove> <playername>` | Adds or removes playername from the whitelist.	 | Always succeeds.|
| `whitelist list` | Displays all players in the whitelist. | Always succeeds.|
| `whitelist <on | off>` | Enables/disables the server's use of a whitelist. Note: Server ops will alwaysbe able to connect when the whitelist is active, even if their names do not appear in the whitelist. | Always succeeds.|
| `whitelist reload` | Reloads the list of playernames in white-list.txt from disk (used when white-list.txt has been modified outside of Minecraft).	 | Always succeeds.|
          "
          ></vue-markdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'

export default {
  name: 'AppCommands',
  components: {
    VueMarkdown,
  },
  data() {
    return {
      serverInfos: [],
      commandInput: '',
      commandResult: 'The command result will appear here.',
    }
  },
  created() {
    this.isLogsLoading = true
    this.getServerInfos()
  },
  methods: {
    sendCommand() {
      var command = this.commandInput
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
            this.commandResult = response.data.message
            this.commandInput = ''
          })
          .catch((e) => {
            console.log(e)
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

.table-command {
  th {
    padding: 0.35rem;
    border: 2px solid #c7c7c7;
  }
  td {
    padding: 0.35rem;
    border: 2px solid #c7c7c7;
  }
}
</style>
