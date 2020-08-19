<template>
  <div>
    <q-header class="bg-light ts-header" flat>
      <q-toolbar>
        <router-link to="/apps">
          <img src="/statics/app-logo-128x128.png" height="30px" />
        </router-link>

        <q-toolbar-title></q-toolbar-title>

        <q-btn
          flat
          :label="$store.getters['client'].email"
          icon-right="more_vert"
          @click="drawer = !drawer"
        >
        </q-btn>

        <q-drawer
          side="right"
          v-model="drawer"
          :width="300"
          :breakpoint="500"
          overlay
          bordered
          content-class="bg-white"
        >
          <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px">
            <q-list padding>
              <q-item clickable v-close-popup :to="{ name: 'Settings' }">
                <q-item-section avatar>
                  <q-icon name="account_circle" size="sm" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    My Profile
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup>
                <q-item-section avatar>
                  <q-icon name="description" size="sm" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    Billing
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup>
                <q-item-section avatar>
                  <q-icon name="fingerprint" size="sm" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    Credentials
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup>
                <q-item-section avatar>
                  <q-icon name="https" size="sm" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    My Privacy
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-separator />

              <q-item clickable v-close-popup @click.native="logOut">
                <q-item-section avatar>
                  <q-icon name="input" size="sm" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    Log Out
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-expansion-item icon="translate" label="Language">
                <q-item clickable v-close-popup>
                  <q-item-section avatar>
                    <country-flag country="fr" size="normal" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>
                      Français
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup>
                  <q-item-section avatar>
                    <country-flag country="gb" size="normal" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>
                      English
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-expansion-item>
            </q-list>
          </q-scroll-area>

          <q-img
            class="absolute-top"
            src="https://cdn.quasar.dev/img/material.png"
            style="height: 150px"
          >
            <div class="absolute-bottom bg-transparent">
              <q-avatar size="56px" class="q-mb-sm">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>
              <div class="text-weight-bold">
                {{ $store.getters['client'].email }}
              </div>
              <div></div>
            </div>
          </q-img>
        </q-drawer>
      </q-toolbar>
    </q-header>
  </div>
</template>

<script>
import CountryFlag from 'vue-country-flag'

export default {
  name: 'NavBar',
  components: {
    CountryFlag,
  },
  data() {
    return {
      drawer: false,
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('setClient', null)
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setDockers', null)
      this.$store.dispatch('setOffers', null)
      this.$router.push(this.$route.query.redirect || '/auth/login')
      return
    },
  },
  mounted() {
    this.drawer = false
  },
}
</script>

<style lang="scss">
.ts-header {
  padding: 15px;
}
</style>
