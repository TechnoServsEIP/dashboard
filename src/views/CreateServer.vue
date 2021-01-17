<template>
  <div>
    <base-header
      type="gradient-default"
      class="pb-6 pb-8 pt-5 pt-md-8"
    ></base-header>

    <div class="container-fluid mt--7">
      <div class="row mb-3" style="align-items: center">
        <div class="col">
          <router-link
            to="/"
            style="color: white; align-items: center; display: flex"
          >
            <i class="ni ni-bold-left mr-1"></i>
            Dashboard
          </router-link>
        </div>
      </div>

      <div class="row">
        <div class="card shadow" style="width: 100%">
          <div class="card-header border-0">
            <div class="row align-items-center">
              <div class="col">
                <h3 class="mb-0">Create a server</h3>
              </div>
            </div>
          </div>

          <div class="m-4">
            <div class="row mb-4">
              <div class="col-md-6">
                <input
                  type="text"
                  v-model="serverName"
                  class="form-control"
                  placeholder="Your server name"
                  aria-label="Your server name"
                  aria-describedby="button-addon2"
                  v-on:keyup.enter="checkoutOrder"
                />
              </div>
            </div>

            <div class="row mb-4">
              <div class="col-md-6"><strong>Game:</strong> Minecraft</div>
            </div>

            <div class="row mb-4">
              <div class="col-md-6 d-flex align-items-center">
                <strong class="mr-2">Plan:</strong>
                <el-select
                  v-model="selectedOffer"
                  placeholder="Select an offer"
                  :disabled="isOffersLoading"
                >
                  <el-option
                    v-for="item in offersOptions"
                    :key="item.value.uuid"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>

            <div
              v-if="selectedOffer"
              class="card card-pricing bg-default card-background mb-4"
            >
              <div class="card-body text-white">
                <h4 class="card-category text-white text-uppercase">
                  {{ selectedOffer.name }}
                </h4>
                <h1 class="card-title text-white">
                  {{ selectedOffer.hourly_price }}
                  <small class="text-white">€ per hour</small>
                  (
                  <small class="text-white">either</small>
                  {{ selectedOffer.monthly_price }}
                  <small class="text-white">
                    € per month when all time active
                  </small>
                  )
                </h1>
                <ul>
                  <li>
                    <b>{{ selectedOffer.players_slots }}</b>
                    Players slots
                  </li>
                  <li>
                    <b>{{ selectedOffer.plugins_limit }}</b>
                    plugins limit
                  </li>
                  <li>
                    <b>{{ selectedOffer.ram_memory }}</b>
                    Mo RAM
                  </li>
                  <li v-if="selectedOffer.automated_backups">
                    <b>Automated backups</b>
                  </li>
                  <li v-if="selectedOffer.planned_tasks">
                    <b>Planned tasks</b>
                  </li>
                  <li v-if="selectedOffer.custom_domain_address">
                    <b>Custom Domain available</b>
                  </li>
                  <li v-if="selectedOffer.modded_servers_allowed">
                    <b>Modded server allowed</b>
                  </li>
                </ul>
                <b class="mt-3">
                  For more details,
                  <router-link to="/feedback">contact us </router-link>
                </b>
              </div>
            </div>

            <div class="row mb-4">
              <div class="col-md-6">
                <base-button
                  :disabled="
                    !allFieldsCompleted || isLoading || selectedOffer === null
                  "
                  type="success"
                  @click.prevent="checkoutOrder"
                >
                  <half-circle-spinner
                    v-if="isLoading"
                    :animation-duration="1000"
                    :size="20"
                    color="white"
                  />
                  <strong v-else>Create</strong>
                </base-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { HalfCircleSpinner } from 'epic-spinners'
import { loadStripe } from '@stripe/stripe-js'
import offers from '../../offers-beta'

const stripePromise = loadStripe(
  'pk_live_51HT2XlJMhPRLHhSBiVsT2s16vcTEeTAMIXSzMlGElmUJ9NNJ3vxEv0GArjkdp5WUUxwvvvGYyJq2DfOmKl41yfUD00cgP2BVwN',
)

export default {
  components: {
    HalfCircleSpinner,
  },
  data() {
    return {
      allFieldsCompleted: false,
      serverName: '',
      isLoading: false,
      offersOptions: [],
      offersDetails: [],
      selectedOffer: null,
      isOffersLoading: false,
    }
  },
  created() {
    this.getOffers()
  },
  watch: {
    serverName() {
      if (this.serverName != '') this.allFieldsCompleted = true
      else this.allFieldsCompleted = false
    },
  },
  methods: {
    getOffers() {
      // Offers[0] => Minecraft
      // offer_types[0] => Starter
      offers.Offers[0].offer_types[0].models.forEach((elem) => {
        this.offersOptions.push({
          value: elem,
          label: elem.name,
        })
      })
    },
    async checkoutOrder() {
      if (this.allFieldsCompleted) {
        if (this.$store.state.user.Role == 'admin') {
          this.isLoading = true
          this.createServer()
        } else {
          this.isLoading = true
          const stripe = await stripePromise
          this.$store.commit('setServerCreateInfo', {
            name: this.serverName,
          })
          try {
            const resp = await this.$axios.post(
              '/payment/new',
              {
                email: this.$store.state.user.email,
                // TODO: changer en dynamique
                product: 'minecraft',
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$store.state.user.token}`,
                },
              },
            )
            if (resp.data == '') throw 'Error'
            const result = await stripe.redirectToCheckout({
              sessionId: resp.data.id,
            })
            console.log(result)
            if (result.error) {
              this.$store.commit('setServerCreateInfo', null)
            } else {
              this.$store.commit('setServerCreateInfo', {
                name: this.serverName,
              })
            }
          } catch (err) {
            console.log('error', err)
            this.$notify({
              type: 'danger',
              title: `Something went wrong. Please try again later.`,
            })
            this.isLoading = false
          }
        }
      }
    },
    createServer() {
      if (this.allFieldsCompleted) {
        this.$store.state.client.Docker.create(
          this.$store.state.user.ID.toString(),
          'minecraft',
          this.serverName,
        )
          .then((response) => {
            this.isLoading = false
            this.$router.push({ path: '/dashboard' })
            this.$notify({
              type: 'success',
              title: `Server ${this.serverName} correctly created`,
            })
          })
          .catch((e) => {
            this.isLoading = false
            this.$notify({
              type: 'danger',
              title: `Something went wrong: ${e._message.message}`,
            })
          })
      }
    },
  },
}
</script>
<style></style>
