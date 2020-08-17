<template>
  <div padding>
    <div class="q-pb-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/apps/" />
        <q-breadcrumbs-el label="Admin" icon="widgets" to="/admin" />
        <q-breadcrumbs-el label="Users" icon="group" to="/admin/users" />
        <q-breadcrumbs-el
          :label="$route.params.id.toString()"
          icon="person"
          to="/admin/users/:id"
        />
      </q-breadcrumbs>
    </div>

    <div class="q-gutter-y-md">
      <q-tabs v-model="tab" inline-label class="bg-purple text-white shadow-2">
        <q-tab name="infos" icon="person" label="Informations" />
        <q-tab name="servers" icon="dns" label="Servers" />
        <q-tab name="billing" icon="confirmation_number" label="Billing" />
      </q-tabs>
    </div>
    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="infos">
        <div class="text-h6">Personal User Informations</div>
        <q-separator class="" color="secondary" />
        <user-general-info :currentUser="currentUser" />
      </q-tab-panel>

      <q-tab-panel name="servers">
        <server-user-table :data="servers" />
      </q-tab-panel>

      <q-tab-panel name="billing">
        <billing-list-table :data="billings" />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import UserGeneralInfo from '../../../components/Admin/UserInfos/UserGeneralInfo'
import BillingListTable from '../../../components/Admin/UserInfos/BillingListTable'
import ServerUserTable from '../../../components/Admin/UserInfos/ServerUserTable'

export default {
  name: 'UserInfo',
  components: {
    UserGeneralInfo,
    ServerUserTable,
    BillingListTable,
  },
  watch: {
    // call again the method if the route changes
    '$route': 'getCurrentUser'
  },
  data() {
    return {
      tab: 'infos',
      servers: [],
      billings: [
        {
          id: '1',
          date: '2020-06-13T10:24:16.630113Z',
          server_name: 'my_server',
          game: 'minecraft',
          total: 100,
          status: 'payed',
        },
      ],
      currentUser: {},
    }
  },
  created () {
    this.getCurrentUser()
  },
  methods: {
    getCurrentUser() {
      // TODO: Replace with this.axios
      const result = {
          "res": {
              "Value": [
                  {
                      "ID": 1,
                      "CreatedAt": "2020-07-25T15:38:22.463242Z",
                      "UpdatedAt": "2020-07-25T15:38:22.463242Z",
                      "DeletedAt": null,
                      "Role": "user",
                      "email": "blazx972@gmail.com",
                      "password": "$2a$10$Xx/G.FJkjmKriw0grQjq1uZBvdd5W7XVMtLwjOg2wEh61szhx/NC.",
                      "token": "",
                      "Verified": true,
                      "Activate": true
                  },
                  {
                      "ID": 2,
                      "CreatedAt": "2020-07-26T13:32:02.767529Z",
                      "UpdatedAt": "2020-07-26T13:32:02.767529Z",
                      "DeletedAt": null,
                      "Role": "admin",
                      "email": "valentin.ichkour68210@gmail.com",
                      "password": "$2a$10$XF4sAVnw00qEiA4Nue7xDeR6m.a0aGKZOu5IR0Io8ZHx37T6ezv.a",
                      "token": "",
                      "Verified": true,
                      "Activate": true
                  },
                  {
                      "ID": 3,
                      "CreatedAt": "2020-07-27T09:24:37.573387Z",
                      "UpdatedAt": "2020-07-27T09:24:37.573387Z",
                      "DeletedAt": null,
                      "Role": "admin",
                      "email": "jeremie.bruhwiler@gmail.com",
                      "password": "$2a$10$fmo9dwV2tlKir7UEvTnmUO2fD5y1iZ0NOc.AKkOCybhQvo2sGJrre",
                      "token": "",
                      "Verified": true,
                      "Activate": true
                  }
              ],
              "Error": null,
              "RowsAffected": 3
          }
      }
      const users = result.res.Value
      for (let index = 0; index < users.length; index++) {
        const element = users[index];
        if (element.ID == this.$route.params.id) {
          this.currentUser = element
        }
      }
    },
  },
}
</script>

<style>
.sep {
  margin: 3%;
}
.textParam {
  color: $primary;
  margin-top: 3%;
}
</style>
