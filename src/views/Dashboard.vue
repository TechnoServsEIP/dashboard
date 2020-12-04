<template>
  <div>
    <base-header
      type="gradient-default"
      class="pb-6 pb-8 pt-5 pt-md-8"
    ></base-header>

    <div class="container-fluid mt--7">
      <div v-if="isServers" class="mt-5 row">
        <div class="col-xl-3 col-lg-6">
          <stats-card
            v-loading="isUserConsomationLoading"
            title="Total uptime"
            type="gradient-red"
            :sub-title="getTotalUptime.toFixed(2) + ' hours'"
            icon="ni ni-button-power"
            class="mb-4 mb-xl-0"
          >
          </stats-card>
        </div>

        <div class="col-xl-3 col-lg-6">
          <stats-card
            v-loading="isUserConsomationLoading"
            title="Monthly price"
            type="gradient-red"
            :sub-title="(getTotalUptime * 0.65).toFixed(2) + '€'"
            icon="ni ni-money-coins"
            class="mb-4 mb-xl-0"
          >
          </stats-card>
        </div>
      </div>
      <div class="row mt-5">
        <table-servers-list
          :user-id="userId"
          create-button
          @change="updateServersList"
        ></table-servers-list>
      </div>
    </div>
  </div>
</template>
<script>
import TableServersList from '../components/Technoservs/Tables/TableServerList'

export default {
  components: {
    TableServersList,
  },
  data() {
    return {
      userConsomation: {
        docker: [],
      },
      isUserConsomationLoading: false,
      isServers: false,
    }
  },
  created() {
    this.isUserConsomationLoading = true
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
        this.isUserConsomationLoading = false
        this.userConsomation = response.data
      })
      .catch((e) => {
        this.isUserConsomationLoading = false
        console.log(e)
      })
  },
  computed: {
    userId() {
      return this.$store.state.user.ID.toString()
    },
    getTotalUptime() {
      let total = 0
      this.userConsomation.docker.forEach((elem) => {
        const difference =
          (Date.parse(elem.activity_time_stop) < 0
            ? Date.now()
            : Date.parse(elem.activity_time_stop)) -
          Date.parse(elem.activity_time_start)
        var hours = (difference / (1000 * 60 * 60)).toFixed(2)
        total += Number(hours)
      })
      return total
    },
  },
  methods: {
    updateServersList(event) {
      this.isServers = event.length > 0
    },
  },
}
</script>
<style></style>
