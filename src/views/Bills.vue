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
      <div class="row mb-3 justify-content-center">
        <div class="col-8">
          <router-link to="/" style="color: white">
            <i class="ni ni-bold-left"></i>
            Dashboard
          </router-link>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-8">
          <card shadow type="secondary">
            <div slot="header" class="bg-white border-0">
              <div class="row align-items-center">
                <div class="col-8">
                  <h2 class="mb-0">My bills history</h2>
                </div>
              </div>

              <template>
                <el-table
                  :data="chunkedBills[currentPage - 1]"
                  empty-text="No bills"
                  v-loading="isBillsLoading"
                >
                  <el-table-column
                    prop="ID"
                    label="#"
                    width="40"
                  ></el-table-column>
                  <el-table-column label="Type">
                    <template slot-scope="scope">
                      <div>
                        {{
                          scope.row.product ===
                          'minecraft first time subscription'
                            ? 'Server creation'
                            : 'Standard plan'
                        }}
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="Date">
                    <template slot-scope="scope">
                      <div>
                        {{
                          new Date(
                            scope.row.start_subscription_date,
                          ).toDateString()
                        }}
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="Price" width="100">
                    <template slot-scope="scope">
                      <div>{{ scope.row.price / 100 }}€</div>
                    </template>
                  </el-table-column>

                  <el-table-column width="100" label="Status">
                    <template>
                      <badge class="badge" type="success">
                        <i></i>
                        <span class="status">Payed</span>
                      </badge>
                    </template>
                  </el-table-column>

                  <el-table-column width="100">
                    <template slot-scope="scope">
                      <div>
                        <base-button
                          type="primary"
                          outline
                          size="sm"
                          @click="openModal(scope.row)"
                        >
                          View
                        </base-button>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </div>
            <div class="container-fluid" style="width: 100%">
              <div class="row justify-content-center">
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :current-page.sync="currentPage"
                  hide-on-single-page
                  :total="bills.length"
                  :page-size="4"
                ></el-pagination>
              </div>
            </div>
          </card>
        </div>
      </div>
    </div>

    <modal
      :show.sync="billModal"
      modal-classes="modal-dialog-centered"
      v-if="selectedBillModal !== null"
    >
      <template slot="header" class="container">
        <div class="row">
          <div class="col-12">
            <div class="d-flex justify-content-center">
              <h2 class="modal-title mr-4" id="exampleModalLabel">
                Bill reference #{{ selectedBillModal.ID }}
              </h2>
              <badge class="badge" type="success">
                <i></i>
                <span class="status">Payed</span>
              </badge>
            </div>
          </div>
        </div>
      </template>

      <div>
        <div class="row">
          <div class="col-12">
            <div class="d-flex">
              <h3 class="mr-2">Type:</h3>
              <span>Server creation</span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="d-flex">
              <h3 class="mr-2">Start:</h3>

              <span>
                {{
                  new Date(
                    selectedBillModal.start_subscription_date,
                  ).toDateString()
                }}
              </span>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <div class="d-flex">
              <h3 class="mr-2">End:</h3>

              <span>
                {{
                  new Date(
                    selectedBillModal.end_subscription_date,
                  ).toDateString()
                }}
              </span>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <div class="d-flex">
              <h3 class="mr-2">Price:</h3>
              <span style="font-weight: bold"
                >{{ selectedBillModal.price / 100 }}€</span
              >
            </div>
          </div>
        </div>
      </div>
    </modal>
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
      currentPage: 0,
      billModal: false,
      selectedBillModal: null,
      isBillsLoading: false,
      chunkedBills: [],
    }
  },
  created() {
    this.getBills()
  },
  methods: {
    chunkArray(myArray) {
      let chunked = []
      let billsTmp = [...this.bills]

      while (billsTmp.length > 0) {
        chunked.push(billsTmp.splice(0, 4))
      }
      return chunked
    },
    openModal(elem) {
      this.billModal = true
      this.selectedBillModal = elem
    },
    updateModal() {
      this.billModal = false
      this.selectedBillModal = null
    },
    getBills() {
      this.isBillsLoading = true
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
          this.chunkedBills = this.chunkArray(this.bills)
          this.isBillsLoading = false
        })
        .catch((e) => {
          this.$notify({
            type: 'danger',
            title: 'An error occured while fetching the bills',
          })
          this.isBillsLoading = false
        })
    },
  },
}
</script>
