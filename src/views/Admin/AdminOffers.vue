<template>
  <div>
    <div>
      <div
        class="card shadow mt-4"
        style="width: 100%"
        :class="type === 'dark' ? 'bg-default' : ''"
        v-for="offers in offersList"
        :key="offers.uuid"
      >
        <div
          class="card-header"
          :class="type === 'dark' ? 'bg-transparent' : ''"
        >
          <div class="row align-items-center">
            <div class="col">
              <h3 class="mb-0" :class="type === 'dark' ? 'text-white' : ''">
                {{ offers.name }}
              </h3>
            </div>
          </div>
        </div>

        <div class="m-4" v-for="elem in offers.offer_types" :key="elem.uui">
          <h3>{{ elem.name }}</h3>

          <div class="table-responsive">
            <base-table
              class="table align-items-center table-flush"
              :class="type === 'dark' ? 'table-dark' : ''"
              :thead-classes="type === 'dark' ? 'thead-dark' : 'thead-light'"
              tbody-classes="list"
              :data="elem.models"
            >
              <template slot="columns">
                <th>Name</th>
                <th>Auto backups</th>
                <th>Custom domain</th>
                <th>Monthly Price</th>
                <th>Hourly Price</th>
                <th></th>
              </template>
              <template slot-scope="{ row }">
                <th scope="row">
                  <div class="media align-items-center">
                    <div class="media-body">
                      <span class="name mb-0 text-sm">{{ row.name }}</span>
                    </div>
                  </div>
                </th>

                <td scope="row">
                  <div class="media align-items-center">
                    <div class="media-body">
                      <span class="name mb-0 text-sm">{{
                        row.automated_backups === true ? "Yes" : "No"
                      }}</span>
                    </div>
                  </div>
                </td>

                <td scope="row">
                  <div class="media align-items-center">
                    <div class="media-body">
                      <span class="name mb-0 text-sm">{{
                        row.custom_domain_address === true ? "Yes" : "No"
                      }}</span>
                    </div>
                  </div>
                </td>

                <td scope="row">
                  <div class="media align-items-center">
                    <div class="media-body">
                      <span class="name mb-0 text-sm"
                        >{{ row.monthly_price }}€</span
                      >
                    </div>
                  </div>
                </td>

                <td scope="row">
                  <div class="media align-items-center">
                    <div class="media-body">
                      <span class="name mb-0 text-sm"
                        >{{ row.hourly_price }}€</span
                      >
                    </div>
                  </div>
                </td>

                <td scope="row">
                  <base-button
                    type="dark" 
                    size="sm"
                    @click.prevent="openModal(row)"
                  >
                    More infos
                  </base-button>
                </td>
              </template>
            </base-table>

            <div v-if="offersList.length < 1" class="text-center mt-3">
              <h4>There is no offers</h4>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Info -->
    <modal :show.sync="isModalOpen" v-if="modalData"
      modal-classes="modal-dialog-centered">
      <template slot="header">
        <h5 class="modal-title" id="exampleModalLabel">{{ modalData.name }}</h5>
      </template>
      <div class="">
        <pre>{{JSON.stringify(modalData, undefined, 2)}}</pre>
      </div>
    </modal>
  </div>
</template>

<script>
import Offers from '../../../offers-beta'

export default {
  name: "AdminOffers",
  props: {
    type: {
      type: String
    }
  },

  data() {
    return {
      offersList: Offers.Offers,
      modalData: null,
      isModalOpen: false,
    };
  },
  
  created() {
    // this.getOffersList();
    console.log(this.offersList)
  },

  methods: {
    toogleModal() {
      this.isModalOpen = !this.isModalOpen
    },

    openModal(row) {
      this.isModalOpen = true
      this.modalData = row
    },

    getOffersList() {
      this.$axios
        .get("/offers/list")
        .then(response => {
          this.offersList = response.data.result;
          console.log(response);
          console.log(this.offersList[0].offer_types);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>
