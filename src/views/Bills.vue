<template>
  <div>
    <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
      <div class="main-content">
        <dashboard-navbar></dashboard-navbar>
      </div>
    </div>
    <base-header
      class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
      style="min-height: 200px"
    >
      <!-- Mask -->
      <span class="mask bg-gradient-default opacity-8"></span>
      <!-- Header container -->
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row mb-3">
        <div class="col">
          <router-link to="/" style="color: white">
            <i class="ni ni-bold-left"></i>
            Dashboard
          </router-link>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <card shadow type="secondary">
            <div slot="header" class="bg-white border-0">
              <div class="row align-items-center">
                <div class="col-8">
                  <h2 class="mb-0">My bills</h2>
                </div>
              </div>

              <template>
                <el-table :data="bills" empty-text="No bills">
                  <el-table-column prop="ID" label="#"></el-table-column>
                </el-table>
              </template>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardNavbar from '../layout/DashboardNavbar'

export default {
  name: 'Bills',
  components: {
    DashboardNavbar,
  },
  props: {
    type: {
      type: String,
    },
  },
  data() {
    return {
      bills: [],
    }
  },
  created() {
    this.getBills()
  },
  methods: {
    getBills() {
      this.$axios
        .post(
          '/user/getbills',
          {},
          {
            headers: {
              authorization: `Bearer ${this.$store.state.user.token}`,
            },
          },
        )
        .then((response) => {
          this.bills = response.data.payments
        })
        .catch((e) => {
          this.$notify({
            type: 'danger',
            title: 'An error occured while fetching the bills',
          })
        })
    },
  },
}
</script>
