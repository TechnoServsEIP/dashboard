<template>
  <div class="mx-4">
    <div v-if="serverInfos.length != 0" class="card shadow" style="width: 100%">
      <div class="card-header">
        <div class="row align-items-center">
          <div class="col">
            <h3 class="mb-0" :class="type === 'dark' ? 'text-white' : ''">
              {{ serverInfos[0].server_name }}
            </h3>
          </div>
          <div class="col-md-auto">
            <badge
              v-if="serverInfos[0].server_status == 'Started'"
              type="success"
              >{{ serverInfos[0].settings.State.Status }}</badge
            >
            <badge v-else type="danger">{{
              serverInfos[0].settings.State.Status
            }}</badge>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="row mb-3 ml-0">
          <base-button
            v-if="serverInfos[0].server_status == 'Started'"
            size="sm"
            :disabled="isBtnLoading"
            @click.prevent="restartServer()"
            >Restart</base-button
          >
          <base-button
            v-else
            size="sm"
            :disabled="isBtnLoading"
            type="success"
            @click.prevent="startServer"
            >Start</base-button
          >
          <base-button
            :disabled="isBtnLoading || serverInfos[0].server_status == 'Stoped'"
            size="sm"
            type="warning"
            @click.prevent="stopServer()"
            >Stop</base-button
          >
          <el-popconfirm
            confirm-button-text="Confirm"
            cancel-button-text="Cancel"
            @confirm="deleteServer()"
            icon="el-icon-info"
            icon-color="red"
            title="Are you sure to delete this server?"
          >
            <base-button
              slot="reference"
              :disabled="isBtnLoading"
              size="sm"
              type="danger"
              >Delete</base-button
            >
          </el-popconfirm>
        </div>
        <div class="row mb-3">
          <div class="col-3">
            <span>Name:</span>
          </div>
          <div class="col-9" style="left: -17%">
            <strong>{{ serverInfos[0].server_name }}</strong>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-3">
            <span>IP:</span>
          </div>
          <div class="col-9" style="left: -17%">
            <strong
              >x2021alsablue1371139462001.northeurope.cloudapp.azure.com</strong
            >
          </div>
        </div>

        <div class="row">
          <div class="col-3">
            <span>Port:</span>
          </div>
          <div class="col-9" style="left: -17%">
            <strong>{{
              serverInfos[0].settings.HostConfig['PortBindings'][
                '25565/tcp'
              ][0]['HostPort']
            }}</strong>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4">
      <card header-classes="bg-transparent" shadow>
        <div slot="header" class="row align-items-center">
          <div class="col">
            <h6 class="text-uppercase text-muted ls-1 mb-1">Usage overview</h6>
            <h5 class="h3 mb-0">Total uptime in hours</h5>
          </div>
        </div>

        <bar-chart
          :height="350"
          ref="barChart"
          :chart-data="redBarChart.chartData"
        >
        </bar-chart>
      </card>
    </div>
  </div>
</template>

<script>
import * as chartConfigs from '@/components/Charts/config'
import BarChart from '@/components/Charts/BarChart'

export default {
  components: {
    BarChart,
  },
  data() {
    return {
      serverInfos: [],
      type: '',
      isBtnLoading: false,
      redBarChart: {
        chartData: {
          labels: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sept',
            'Oct',
            'Nov',
            'Dec',
          ],
          datasets: [
            {
              label: 'Uptime',
              data: [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
              ],
            },
          ],
        },
      },
    }
  },
  methods: {
    initChartData() {
      this.$axios
        .post(
          '/user/getactivitybyuser',
          {},
          {
            headers: {
              authorization: `Bearer ${this.$store.state.user.token}`,
            },
          },
        )
        .then((response) => {
          let chartDataDockers = response.data.docker
          let data = chartDataDockers.filter((v) => {
            return v.id_docker == this.serverInfos[0].id_docker
          })
          data.map((o) => {
            const difference =
              (Date.parse(o.activity_time_stop) < 0
                ? Date.now()
                : Date.parse(o.activity_time_stop)) -
              Date.parse(o.activity_time_start)

            let month = new Date(o.activity_time_start).getMonth()
            var hours = (difference / (1000 * 60 * 60)).toFixed(2)
            this.redBarChart.chartData.datasets[0].data[
              month
            ] = this.redBarChart.chartData.datasets[0].data[month] += Number(
              hours,
            )
          })
        })
        .catch((e) => {
          this.$notify({
            type: 'danger',
            title: 'An error occured while getting usage information.',
          })
        })
    },
    getServerInfo() {
      this.$store.state.client.Docker.list(this.$store.state.user.ID.toString())
        .then((response) => {
          this.serverInfos = response.list.filter((v) => {
            return v.ID == this.$route.params.id
          })
          this.initChartData()
        })
        .catch((e) => {
          console.log(e)
        })
    },
    updateServerStatus(server) {
      this.serverInfos[0].settings.State.Status = server
    },
    startServer() {
      this.isBtnLoading = true
      this.$store.state.client.Docker.start(
        this.$store.state.user.ID.toString(),
        this.serverInfos[0].id_docker,
      )
        .then((response) => {
          this.isBtnLoading = false
          this.serverInfos[0].server_status = 'Started'
          this.updateServerStatus(response.settings.State.Status)
          this.$notify({
            type: 'success',
            title: 'Server correctly started',
          })
        })
        .catch((e) => {
          this.$notify({
            type: 'danger',
            title: 'An error occured while starting server',
          })
          console.log(e._message)
        })
    },
    stopServer() {
      this.isBtnLoading = true
      this.$store.state.client.Docker.stop(
        this.$store.state.user.ID.toString(),
        this.serverInfos[0].id_docker,
      )
        .then((response) => {
          this.serverInfos[0].server_status = 'Stoped'
          this.updateServerStatus('exited')
          this.isBtnLoading = false
          this.$notify({
            type: 'success',
            title: 'Server correctly stoped',
          })
        })
        .catch((e) => {
          this.isBtnLoading = false
          this.$notify({
            type: 'danger',
            title: 'An error occured while stoping server',
          })
          console.log(e._message)
        })
    },
    restartServer() {
      this.isBtnLoading = true
      this.$store.state.client.Docker.stop(
        this.$store.state.user.ID.toString(),
        this.serverInfos[0].id_docker,
      )
        .then(() => {
          this.$store.state.client.Docker.start(
            this.$store.state.user.ID.toString(),
            this.serverInfos[0].id_docker,
          )
            .then((response) => {
              this.serverInfos[0].server_status = 'Started'
              this.updateServerStatus(response.settings.State.Status)
              this.isBtnLoading = false
            })
            .catch((e) => {
              console.log(e._message)
            })
          this.$notify({
            type: 'success',
            title: 'Server correctly restared',
          })
        })
        .catch((e) => {
          console.log(e)
          this.$notify({
            type: 'danger',
            title: 'An error occured while restarting server',
          })
          this.isBtnLoading = false
        })
    },
    deleteServer() {
      this.isBtnLoading = true
      this.$store.state.client.Docker.delete(
        this.$store.state.user.ID.toString(),
        this.serverInfos[0].id_docker,
      )
        .then((response) => {
          console.log(response)
          this.isBtnLoading = false
          this.$router.push({ path: '/dashboard' })
          this.$notify({
            type: 'success',
            title: 'Server correctly deleted',
          })
          this.isBtnLoading = false
        })
        .catch((e) => {
          this.isBtnLoading = false
          this.$notify({
            type: 'danger',
            title: 'An error occured while deleting server',
          })
          this.isBtnLoading = false
          console.log(e._message)
        })
    },
  },
  created() {
    this.getServerInfo()
  },
}
</script>
<style></style>
