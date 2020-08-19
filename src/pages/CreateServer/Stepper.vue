<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <q-page>
    <div
      class="q-pa-md
      column"
    >
      <h4>Create your server</h4>
      <q-form>
        <div class="col-6">
          <q-stepper
            v-model="step"
            ref="stepper"
            color="primary"
            done-color="green"
            animated
          >
            <q-step
              :name="1"
              title="Select Name"
              icon="settings"
              :done="step > 1"
            >
              <div class="row">
                <q-input
                  class="col-6"
                  ref="instanceName"
                  outlined
                  v-model="instanceName"
                  label="Instance Name"
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                >
                </q-input>
              </div>
            </q-step>

            <q-step
              :name="2"
              title="Select Game"
              icon="create_new_folder"
              :done="step > 2"
            >
              <div class="row">
                <div
                  v-for="game in gamesList"
                  :key="game.name"
                  class="col-3 q-pr-md q-pb-md"
                >
                  <q-card>
                    <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
                      <div class="absolute-bottom">
                        <div class="text-h6">{{ game.name }}</div>
                      </div>
                    </q-img>

                    <q-card-actions>
                      <q-radio v-model="selectedGame" :val="game.name" />
                    </q-card-actions>
                  </q-card>
                </div>
              </div>
            </q-step>

            <q-step :name="3" title="Select Plan" icon="create_new_folder">
              <div v-if="offersList != null">
                <div class="row">
                  <div class="col-md-3">
                    <q-card class="my-card">
                      <q-card-section class="bg-grey-1">
                        <div class="text-h5">
                          <b>{{ offersList.name }}</b>
                        </div>
                        <div class="text-overline price">
                          {{
                            offersList.dedicated_ip_address.monthly_price
                          }}€/mois
                        </div>
                        <!-- <div class="text-overline price">{{ offer.info.dedicated_ip_address.hourly_price }}€/heure</div> -->
                      </q-card-section>

                      <q-card-section>
                        <div class="text-subtitle2">
                          RAM: {{ convertRam(offersList.ram_memory) }}GB
                        </div>
                      </q-card-section>

                      <q-card-section>
                        <div>
                          <q-btn
                            class="full-width"
                            color="secondary"
                            label="selected"
                          />
                        </div>
                      </q-card-section>
                    </q-card>
                  </div>
                </div>
              </div>
            </q-step>

            <q-step :name="4" title="Start Server" icon="create_new_folder">
              <p>
                <span style="font-weight: bold;">Instance name: </span
                >{{ this.instanceName }}
              </p>
              <p><span style="font-weight: bold;">Game: </span>Minecraft</p>
              <p>
                <span style="font-weight: bold;">Offer name: </span
                >{{ this.offersList.name }}
              </p>
            </q-step>

            <template v-slot:navigation>
              <q-stepper-navigation>
                <q-btn
                  @click="nextStep"
                  color="primary"
                  :label="step === 4 ? 'Start Server' : 'Continue'"
                  :loading="startServerLoading"
                />
                <q-btn
                  v-if="step > 1"
                  flat
                  color="secondary"
                  @click="$refs.stepper.previous()"
                  label="Back"
                  class="q-ml-sm"
                />
              </q-stepper-navigation>
            </template>

            <template v-slot:message>
              <q-banner
                v-if="step === 1"
                class="bg-primary  text-white q-px-lg"
              >
                Type the name of your server
              </q-banner>
              <q-banner
                v-else-if="step === 2"
                class="bg-primary text-white q-px-lg"
              >
                Select which game you want for your server
              </q-banner>
              <q-banner
                v-else-if="step === 3"
                class="bg-primary text-white q-px-lg"
              >
                Choose the plan you want for your server
              </q-banner>
              <q-banner
                v-else-if="step === 4"
                class="bg-primary text-white q-px-lg"
              >
                Start your server now !
              </q-banner>
            </template>
          </q-stepper>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import NameStepper from '../../components/CreateServer/NameStepper.vue'
import GameStepper from '../../components/CreateServer/GameStepper'
import PlanStepper from '../../components/CreateServer/PlanStepper.vue'

import fetch from 'node-fetch'

export default {
  name: 'Stepper',
  components: {
    PlanStepper,
    GameStepper,
    NameStepper,
  },
  data() {
    return {
      step: 1,
      instanceName: '',
      selectedGame: '',
      gamesList: [
        {
          name: 'Minecraft',
        },
      ],
      offersList: null,
      offersLoader: false,
      selectedOffer: {},
      holder: 0,
      startServerLoading: false,
    }
  },
  created() {
    this.getOffers()
  },
  methods: {
    convertRam(value) {
      let res = value * 0.001
      return res.toFixed(0)
    },
    selectOffer(offer) {
      this.offersList.forEach((elem) => {
        elem.selected = false
        if (offer.info.name == elem.info.name) {
          offer.selected = !offer.selected
          this.selectedOffer = offer
        }
      })
    },
    getOffers() {
      this.offersLoader = true
      this.axios
        .get('/offers/list')
        .then((response) => {
          this.offersList = response.data.result[0].offer_types[0].models[0]
          console.log('list', this.offersList)
        })
        .catch((e) => {
          console.log(e)
        })
      this.offersLoader = false
    },
    createServer() {
      this.startServerLoading = true

      this.axios
        .post(
          '/docker/create',
          {
            game: 'minecraft',
            user_id: this.$store.getters['client'].ID.toString(),
            server_name: this.instanceName,
          },
          {
            headers: {
              Authorization: `${this.$store.getters['client'].token}`,
            },
          },
        )
        .then((response) => {
          this.startServerLoading = false
          console.log(response)
          this.$router.push(this.$route.query.redirect || '/apps')
        })
        .catch((e) => {
          console.log('ERROR', e)
          this.startServerLoading = false
        })
    },
    nextStep() {
      if (this.step == 1) {
        if (this.$refs.instanceName.validate()) {
          this.$refs.stepper.next()
        }
      } else if (this.step == 2) {
        if (this.selectedGame != '') {
          this.$refs.stepper.next()
        }
      } else if (this.step == 3 && this.selectedOffer != '') {
        console.log('Selected offer:', this.selectedOffer)
        this.$refs.stepper.next()
      } else if (this.step == 4) {
        this.createServer()
        //this.$refs.stepper.next()
      }
    },
  },
  watch: {
    step: function() {
      if (this.step == 3 && this.offersList == null) {
        this.getOffers()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.card-plan {
  width: 100%;
  max-width: 200px;
}
.bold {
  font-weight: bold;
  font-size: medium;
}
.price {
  color: $primary;
  font-size: medium;
}
.subText {
  color: lightgrey;
  font-size: small;
}
.marginPlayer {
  margin-top: 2%;
}
.link {
  background: none;
  border: none;
  color: $primary;
}
</style>
