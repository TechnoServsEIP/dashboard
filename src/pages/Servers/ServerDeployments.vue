<template>
  <div>
    <div class="q-pb-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/apps" />
        <q-breadcrumbs-el
          label="Dashboard"
          icon="widgets"
          :to="'/apps/server/' + $route.params.id"
        />
        <q-breadcrumbs-el
          label="Deployments"
          icon="widgets"
          :to="'/server/' + $route.params.id + '/deploy'"
        />
      </q-breadcrumbs>
    </div>
    <h5>Deployments</h5>
    <p v-if="errorMessage != ''" style="color: red">{{ errorMessage }}</p>
    <div class="q-pb-md q-gutter-sm">
      <q-btn
        :loading="loader"
        color="primary"
        type="submit"
        label="Refresh"
        style="width: 100px"
        @click="getServerInformation()"
      />
    </div>
    <q-list bordered separator>
      <Deployment
        v-for="item in server_infos"
        :key="item.ID"
        :success="true"
        :reference="item.id_docker"
        :duration="item.duration"
        :description="item.game"
        :day="item.CreatedAt"
        :time="item.time"
        :stamp="item.UpdatedAt"
        :console="item.logs"
      />
    </q-list>
  </div>
</template>

<script>
import Deployment from '../../components/Servers/ServersDeployment'
import config from '../../../config'
import fetch from 'node-fetch'

export default {
  name: 'DeploymentsList',
  components: {
    Deployment,
  },
  created() {
    this.getServerInformation()
  },
  methods: {
    getServerLogs(container_id) {
      // this.axios.post('/docker/logs', {
      //   user_id: this.$store.getters['client']._user.ID.toString(),
      //   container_id: container_id
      // }, {headers: {
      //   'Authorization': this.$store.getters['client']._user.token
      // }}).then(element => {
      //    infos = {
      //       ID: element.ID,
      //       CreatedAt: created,
      //       UpdatedAt: update_stamp,
      //       DeletedAt: element.DeletedAt,
      //       game: element.game,
      //       id_docker: element.id_docker,
      //       user_id: element.user_id,
      //       logs: result.logs,
      //     }
      // }).catch(e => {
      //   console.log(e)
      // })
      var myHeaders = new Headers()
      myHeaders.append(
        'Authorization',
        `Bearer ${this.$store.getters['client']._user.token}`,
      )
      // myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')
      // myHeaders.append('Access-Control-Allow-Origin', '*')
      const body = {
        user_id: this.$store.getters['client']._user.ID.toString(),
        container_id: container_id,
      }
      return new Promise((resolve, reject) => {
        fetch(`${config.api.url}/docker/logs`, {
          method: 'POST',
          headers: myHeaders,
          cache: 'default',
          body: JSON.stringify(body),
        })
          .then((res) => res.json())
          .catch((e) => reject(e))
          .then((result) => {
            if (result) {
              resolve(result)
            } else {
              reject('ERROR')
            }
          })
      })
    },
    getServerInformation() {
      this.loader = true
      var myHeaders = new Headers()
      let body = {
        user_id: this.$store.getters['currentUser'].email.ID.toString(),
      }
      // http://ec2-3-250-28-76.eu-west-1.compute.amazonaws.com:9096
      fetch(`${config.api.url}/docker/list`, {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .catch((e) => {
          console.log('ERROR', e)
        })
        .then((user_server) => {
          console.log(user_server)
          if (user_server) {
            this.server_infos = []
            let infos
            const element = user_server.list.find(
              (item) => item.ID == this.$route.params.id,
            )
            var created = new Date(element.CreatedAt).toLocaleString('en-US')
            const today = new Date()
            const endDate = new Date(element.UpdatedAt)
            var diffMs = today - endDate // milliseconds
            var days = Math.floor(diffMs / 86400000) // days
            var hours = Math.floor((diffMs % 86400000) / 3600000) // hours
            var minutes = Math.round(((diffMs % 86400000) % 3600000) / 60000) // minutes
            var seconds = Math.round(
              ((diffMs % 86400000) % 3600000) / 60000 / 60000,
            ) // seconds
            var update_stamp
            if (days >= 1) {
              update_stamp = days + ' day(s)'
            } else if (hours >= 1) {
              update_stamp = hours + ' hour(s)'
            } else if (minutes >= 1) {
              update_stamp = minutes + ' minute(s)'
            } else {
              update_stamp = seconds + ' second(s)'
            }
            this.getServerLogs(element.id_docker)
              .catch((e) => console.log('ERROR', e))
              .then((result) => {
                if (result) {
                  infos = {
                    ID: element.ID,
                    CreatedAt: created,
                    UpdatedAt: update_stamp,
                    DeletedAt: element.DeletedAt,
                    game: element.game,
                    id_docker: element.id_docker,
                    user_id: element.user_id,
                    logs: result.logs,
                  }
                } else {
                  infos = {
                    ID: element.ID,
                    CreatedAt: created,
                    UpdatedAt: update_stamp,
                    DeletedAt: element.DeletedAt,
                    game: element.game,
                    id_docker: element.id_docker,
                    user_id: element.user_id,
                    logs: 'No logs could be found.',
                  }
                }
                this.server_infos.push(infos)
              })
          } else {
            this.errorMessage = 'An error has occured.'
          }
          this.loader = false
        })
    },
  },
  data() {
    return {
      loader: false,
      errorMessage: null,
      server_infos: [],
    }
  },
}
</script>

<style lang="scss">
.ts-card-hello {
  margin: 1em;
  width: 100%;
}
</style>
