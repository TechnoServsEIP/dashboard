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
            label="Users"
            header-class="ts-header-item"
            expand-icon-class="ts-header-item"
            :default-opened="true"
          >
            <q-item clickable :to="{ name: 'UserList' }">
              <q-item-section>
                <q-item-label>
                  List of Users
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

          <q-expansion-item
            icon="dns"
            :default-opened="true"
            header-class="ts-header-item"
            expand-icon-class="ts-header-item"
            label="Servers"
          >
            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label style="padding-left: 0px">
                  Metrics
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label>
                  Logs
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label>
                  Timeline
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label>
                  Notifications
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-expansion-item>

          <q-separator></q-separator>

          <q-expansion-item
            icon="local_offer"
            label="Offers"
            header-class="ts-header-item"
            expand-icon-class="ts-header-item"
            :default-opened="true"
          >
            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label style="padding-left: 0px">
                  Domain/SSL
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label>
                  Collaborators
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label>
                  Settings
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click.native="deleteServer">
              <q-item-section>
                <q-item-label>
                  Delete Server
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-expansion-item>
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
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Name',
          align: 'left',
          sortable: true,
          field: (row) => row.name,
          format: (val) => `${val}`,
        },
        {
          name: 'ip',
          required: true,
          label: 'IP',
          align: 'left',
          sortable: true,
          field: 'ip',
        },
        {
          name: 'email',
          required: true,
          label: 'Email',
          align: 'left',
          sortable: true,
          field: 'email',
        },
        {
          name: 'last_connection',
          required: true,
          label: 'Last Connection',
          align: 'left',
          sortable: true,
          field: 'last_connection',
        },
        {
          name: 'account_created',
          required: true,
          label: 'Account created',
          align: 'left',
          sortable: true,
          field: 'account_created',
        },
      ],
      data: [
        {
          name: 'Tchoinpi',
          ip: '198.0.0.1',
          email: 'john@doe.com',
          last_connection: '20 minutes ago',
          account_created: '2015-04-12 11:04:44 UTC',
        },
      ],
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
