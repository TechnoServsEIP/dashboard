<template>
  <div>
    <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
      <div class="main-content">
        <dashboard-navbar></dashboard-navbar>
      </div>
    </div>
    <base-header
      class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
      style="min-height: 200px;"
    >
      <!-- Mask -->
      <span class="mask bg-gradient-default opacity-8"></span>
      <!-- Header container -->
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row mb-3">
        <div class="col">
          <router-link to="/" style="color: white;">
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
                  <h3 class="mb-0">My bills</h3>
                </div>
              </div>
            </div>

            <template>
              <div>
                <base-table
                  v-if="bills.length > 0"
                  class="table align-items-center table-flush"
                  :class="type === 'dark' ? 'table-dark' : ''"
                  :thead-classes="
                    type === 'dark' ? 'thead-dark' : 'thead-light'
                  "
                  tbody-classes="list"
                  :data="bills"
                >
                  <template slot="columns">
                    <th>#</th>
                    <th>Date</th>
                    <th>Payed</th>
                    <th>Amount</th>
                    <th></th>
                  </template>
                  <template slot-scope="{ row }">
                    <th scope="row">
                      <div class="media align-items-center">
                        <div class="media-body">
                          <span class="name mb-0 text-sm">{{
                            row.number
                          }}</span>
                        </div>
                      </div>
                    </th>

                    <td scope="row">
                      <div class="media align-items-center">
                        <div class="media-body">
                          <span class="name mb-0 text-sm">{{ row.date }}</span>
                        </div>
                      </div>
                    </td>

                    <td scope="row">
                      <div class="media align-items-center">
                        <div class="media-body">
                          <span class="name mb-0 text-sm">{{
                            row.payed === true ? "✅" : "❌"
                          }}</span>
                        </div>
                      </div>
                    </td>

                    <td scope="row">
                      <div class="media align-items-center">
                        <div class="media-body">
                          <span class="name mb-0 text-sm"
                            >{{ row.amount }}€</span
                          >
                        </div>
                      </div>
                    </td>

                    <td>
                      <base-button type="primary" size="sm"
                        >Take a look !</base-button
                      >
                    </td>
                  </template>
                </base-table>

                <div v-else class="text-center mt-3">
                  <h4>No bills</h4>
                </div>
              </div>
            </template>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardNavbar from "../layout/DashboardNavbar";

export default {
  name: "Bills",
  components: {
    DashboardNavbar
  },
  props: {
    type: {
      type: String
    }
  },
  data() {
    return {
      bills: [
        {
          id: "1",
          number: "123982",
          date: "23/06/2020",
          payed: true,
          amount: 23
        },
        {
          id: "2",
          number: "2938893",
          date: "23/07/2020",
          payed: true,
          amount: 5.13
        },
        {
          id: "3",
          number: "2233211",
          date: "23/08/2020",
          payed: true,
          amount: 2
        },
        {
          id: "4",
          number: "112987",
          date: "23/09/2020",
          payed: false,
          amount: 100
        }
      ]
    };
  }
};
</script>
