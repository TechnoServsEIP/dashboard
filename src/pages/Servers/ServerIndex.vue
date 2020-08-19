<template>
  <div padding>
    <div class="q-pb-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/apps" />
        <q-breadcrumbs-el
          label="Dashboard"
          icon="widgets"
          :to="'/apps/server/' + $route.params.id"
        />
      </q-breadcrumbs>
    </div>

    <div v-if="serverInformation !== null">
      <div class="row">
        <div class="col-12" v-if="serverInformation !== null">
          <q-card flat class="ts-server-info-card">
            <q-card-section>
              <div class="row q-col-gutter-x-sm">
                <div class="col-8 text-h6">Server Information</div>
                <div class="col-3">
                  Server status:
                  <q-badge align="middle">{{ serversStatus }}</q-badge>
                </div>
              </div>

              <q-item-label class="ts-server-info-label">
                Game:
                <span class="ts-server-info-item">{{
                  serverInformation.game
                }}</span>
              </q-item-label>

              <q-item-label class="ts-server-info-label">
                Instance name:
                <span class="ts-server-info-item">{{
                  serverInformation.server_name
                }}</span>
              </q-item-label>

              <q-item-label class="ts-server-info-label">
                Players Online: <span class="ts-server-info-item">NaN</span>
              </q-item-label>

              <q-item-label class="ts-server-info-label">
                IP:
                <span class="ts-server-info-item">{{
                  `https://x2021alsablue1371139462001.northeurope.cloudapp.azure.com:${serverInformation.settings.HostConfig['PortBindings']['25565/tcp'][0]['HostPort']}`
                }}</span>
              </q-item-label>

              <q-item-label class="ts-server-info-label">
                Port:
                <span class="ts-server-info-item">{{
                  serverInformation.settings.HostConfig['PortBindings'][
                    '25565/tcp'
                  ][0]['HostPort']
                }}</span>
              </q-item-label>

              <q-item-label class="ts-server-info-label">
                Custom IP address: <span class="ts-server-info-item">NaN</span>
              </q-item-label>

              <q-item-label class="ts-server-info-label">
                Version:
                <q-avatar
                  size="40px"
                  icon="img:https://cdn.quasar.dev/logo/svg/quasar-logo.svg"
                ></q-avatar>
                <q-badge color="secondary">
                  NaN
                </q-badge>
              </q-item-label>

              <q-item-label class="ts-server-info-label">
                <q-img
                  src="https://cdn.quasar.dev/img/material.png"
                  spinner-color="white"
                  style="height: 130px; max-width: 170px"
                />
                <input
                  type="file"
                  accept="image/*"
                  @change="uploadImage($event)"
                  id="file-input"
                />
              </q-item-label>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div class="q-pt-md">
        <div class="col-12">
          <q-card flat class="ts-resources-card">
            <q-card-section>
              <div class="text-h6">Resources usage</div>
              <div>
                <q-item-label class="ts-server-info-label">
                  CPU:
                </q-item-label>
                <q-linear-progress
                  rounded
                  size="40px"
                  :value="0.8"
                  color="primary-light"
                  class="q-mt-sm"
                >
                  <div class="absolute-full flex flex-center">
                    <q-badge color="white" text-color="primary" label="80%" />
                  </div>
                </q-linear-progress>
              </div>
              <div>
                <q-item-label class="ts-server-info-label">
                  CPU:
                </q-item-label>
                <q-linear-progress
                  rounded
                  size="40px"
                  :value="0.2"
                  color="primary"
                  class="q-mt-sm"
                >
                  <div class="absolute-full flex flex-center">
                    <q-badge color="white" text-color="primary" label="20%" />
                  </div>
                </q-linear-progress>
              </div>
              <div class="row q-pt-md">
                <div class="q-pr-md" v-if="serversStatus == 'running'">
                  <q-btn
                    :loading="buttonLoading"
                    color="primary"
                    label="Restart"
                    @click="restartServer"
                  />
                </div>
                <div class="q-pr-md" v-else>
                  <q-btn
                    :loading="buttonLoading"
                    color="primary"
                    label="Start"
                    @click="startServer"
                  />
                </div>
                <div class="q-pr-md" v-if="serversStatus != 'exited'">
                  <q-btn
                    :loading="buttonLoadingStop"
                    color="secondary"
                    label="Stop"
                    v-on:click.prevent="stopServer()"
                  />
                </div>
                <div>
                  <q-btn
                    :loading="buttonLoading"
                    color="red"
                    label="Delete"
                    @click="deleteServer"
                  />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div class="row q-pt-md">
        <player-list-table
          class="ts-player-table"
          :data="data"
          :columns="columns"
        ></player-list-table>
      </div>
    </div>
  </div>
</template>

<script>
import PlayerListTable from '../../components/Player/PlayerListTable'
import axios from 'axios'
export default {
  name: 'ServerIndex',
  components: {
    PlayerListTable,
  },
  data() {
    return {
      deleteLoader: false,
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Name',
          align: 'left',
          sortable: true,
          field: (row) => row.name,
          format: (val) => `${val}`,
        },
        {
          name: 'ip',
          required: true,
          label: 'IP',
          align: 'left',
          sortable: true,
          field: 'ip',
        },
        {
          name: 'email',
          required: true,
          label: 'Email',
          align: 'left',
          sortable: true,
          field: 'email',
        },
        {
          name: 'last_connection',
          required: true,
          label: 'Last Connection',
          align: 'left',
          sortable: true,
          field: 'last_connection',
        },
        {
          name: 'account_created',
          required: true,
          label: 'Account created',
          align: 'left',
          sortable: true,
          field: 'account_created',
        },
      ],
      data: [
        {
          name: 'Tchoinpi',
          ip: '198.0.0.1',
          email: 'john@doe.com',
          last_connection: '20 minutes ago',
          account_created: '2015-04-12 11:04:44 UTC',
        },
        {
          name: 'Tchoinpi',
          ip: '198.0.0.2',
          email: 'john@doe.com',
          last_connection: '20 minutes ago',
          account_created: '2015-04-12 11:04:44 UTC',
        },
        {
          name: 'Tchoinpi',
          ip: '198.0.0.3',
          email: 'john@doe.com',
          last_connection: '20 minutes ago',
          account_created: '2015-04-12 11:04:44 UTC',
        },
        {
          name: 'Tchoinpi',
          ip: '198.0.0.4',
          email: 'john@doe.com',
          last_connection: '20 minutes ago',
          account_created: '2015-04-12 11:04:44 UTC',
        },
        {
          name: 'Tchoinpi',
          ip: '198.0.0.5',
          email: 'john@doe.com',
          last_connection: '20 minutes ago',
          account_created: '2015-04-12 11:04:44 UTC',
        },
        {
          name: 'Tchoinpi',
          ip: '198.0.0.6',
          email: 'john@doe.com',
          last_connection: '20 minutes ago',
          account_created: '2015-04-12 11:04:44 UTC',
        },
        {
          name: 'Tchoinpi',
          ip: '198.0.0.7',
          email: 'john@doe.com',
          last_connection: '20 minutes ago',
          account_created: '2015-04-12 11:04:44 UTC',
        },
        {
          name: 'Tchoinpi',
          ip: '198.0.0.8',
          email: 'john@doe.com',
          last_connection: '20 minutes ago',
          account_created: '2015-04-12 11:04:44 UTC',
        },
        {
          name: 'Tchoinpi',
          ip: '198.0.0.9',
          email: 'john@doe.com',
          last_connection: '20 minutes ago',
          account_created: '2015-04-12 11:04:44 UTC',
        },
        {
          name: 'Tchoinpi',
          ip: '198.0.0.10',
          email: 'john@doe.com',
          last_connection: '20 minutes ago',
          account_created: '2015-04-12 11:04:44 UTC',
        },
      ],
      serverInformation: null,
      serversStatus: '',
      buttonLoading: false,
      buttonLoadingStart: false,
      buttonLoadingStop: false,
    }
  },
  async created() {
    await this.getServerInformation()
  },
  methods: {
    async restartServer() {
      this.buttonLoadingStart = true
      await this.stopServer()
      await this.startServer()
      this.buttonLoadingStart = false
    },
    startServer() {
      this.buttonLoadingStart = true
      let body = {
        user_id: this.$store.getters['client'].ID.toString(),
        container_id: this.serverInformation.id_docker,
      }

      this.axios
        .post('/docker/start', body, {
          headers: {
            Authorization: `Bearer ${this.$store.getters['client'].token}`,
          },
        })
        .then((response) => {
          this.buttonLoadingStart = false
          console.log('Started', response)
          this.$router.go()
        })
        .catch((e) => {
          this.buttonLoadingStart = false
          console.log(e)
        })
    },
    stopServer() {
      this.buttonLoadingStop = true
      this.axios
        .post(
          '/docker/stop',
          {
            user_id: this.$store.getters['client'].ID.toString(),
            container_id: this.serverInformation.id_docker,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$store.getters['client'].token}`,
            },
          },
        )
        .then((response) => {
          this.serverInformation.server_status = 'Stoped'
          this.buttonLoadingStop = false
          this.$router.go()
        })
        .catch((e) => {
          console.log(e)
          this.buttonLoadingStop = false
        })
    },
    deleteServer() {
      this.buttonLoading = true

      let body = {
        user_id: this.$store.getters['client'].ID.toString(),
        container_id: this.serverInformation.id_docker,
      }

      this.axios
        .post('/docker/delete', body, {
          headers: {
            Authorization: `Bearer ${this.$store.getters['client'].token}`,
          },
        })
        .then((response) => {
          this.buttonLoading = false
          this.$router.push(this.$route.query.redirect || '/apps')
        })
        .catch((e) => {
          this.buttonLoading = false
          console.log('AXIOS ERROR')
        })
    },
    getServerInformation() {
      this.axios
        .post(
          '/docker/list',
          { user_id: this.$store.getters['client'].ID.toString() },
          {
            headers: {
              Authorization: `Bearer ${this.$store.getters['client'].token}`,
            },
          },
        )
        .then((response) => {
          let currentServer = response.data.list.filter((v) => {
            if (v.ID == this.$route.params.id) {
              return v
            }
          })
          this.serversStatus = currentServer[0].server_status
          this.serverInformation = currentServer[0]
          return
        })
        .catch((e) => {
          console.log('ERROR', e)
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.ts-player-table {
  width: 100%;
}
.ts-resources-card {
  background: $light;
  padding: 10px;
  height: 100%;
}
.ts-server-info-card {
  background: $light;
  padding: 10px;
}
.ts-server-info-label {
  padding-top: 10px;
}
.ts-server-info-item {
  color: $primary;
  font-weight: bold;
}
p {
  margin: 0;
  padding-top: 7px;
}
#server-notification {
  background: #03a64d;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  margin-top: 12px;
  background-color: #03a64d;
  box-shadow: 0 0 10px 5px rgba(3, 166, 77, 1);
  -webkit-box-shadow: 0px 0px 10px 0px rgba(3, 166, 77, 1);
  -moz-box-shadow: 0px 0px 10px 0px rgba(3, 166, 77, 1);
}
#file-input {
  padding-left: 20px;
}
</style>
