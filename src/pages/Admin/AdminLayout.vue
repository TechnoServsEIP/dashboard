<template>
  <div>
    <q-drawer
      show-if-above
      side="left"
      :v-model="true"
      :width="300"
      overlay
      persistent
      content-class="bg-light ts-drawer"
    >
      <q-scroll-area class="fit">
        <q-list>
          <q-item clickable to="/admin">
            <q-item-section>
              <q-item-label>
                Admin
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-expansion-item
            icon="group"
            label="Users management"
            header-class="ts-header-item"
            expand-icon-class="ts-header-item"
            :default-opened="true"
          >
            <q-item clickable :to="{ name: 'UserList' }">
              <q-item-section>
                <q-item-label>
                  Users
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable :to="{ name: 'RoleList' }">
              <q-item-section>
                <q-item-label>
                  Roles
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-expansion-item>

          <q-separator></q-separator>

          <q-item clickable v-close-popup :to="{ name: 'ServersList' }">
            <q-item-section avatar>
              <q-icon name="dns" color="primary" />
            </q-item-section>
            <q-item-section>
              <q-item-label style="padding-left: 0px">
                Servers
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-separator></q-separator>
          <q-item clickable v-close-popup :to="{ name: 'GamesOfferList' }">
            <q-item-section avatar>
              <q-icon name="local_offer" color="primary" />
            </q-item-section>
            <q-item-section>
              <q-item-label style="padding-left: 0px">
                Offers
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <router-view class="q-pa-md ts-server-layout" />
  </div>
</template>

<script>
// import PlayerListTable from '../../components/Player/PlayerListTable'
// eslint-disable-next-line no-unused-vars
import axios from 'axios'
export default {
  name: 'AdminDashboard',
  // components: {
  //   PlayerListTable,
  // },
  data() {
    return {
      deleteLoader: false,
      serverInformation: null,
      serversStatus: '',
      buttonLoading: false,
      buttonLoadingStart: false,
      buttonLoadingStop: false,
    }
  },
  created() {},
  methods: {},
}
</script>

<style lang="scss">
.ts-header-item {
  color: $primary;
  font-weight: bold;
}
.ts-server-layout {
  padding-left: 320px;
}
</style>
