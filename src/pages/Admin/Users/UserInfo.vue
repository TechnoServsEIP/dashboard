<template>
  <div padding>
    <div class="q-pb-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/apps/" />
        <q-breadcrumbs-el label="Admin" icon="widgets" to="/admin" />
        <q-breadcrumbs-el label="Users" icon="group" to="/admin/users" />
        <q-breadcrumbs-el
          :label="$route.params.id"
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
  data() {
    return {
      tab: 'infos',
      users: [],
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
      currentUser: this.$route.params.user,
    }
  },
  created() {
    this.$q.loading.show()
    this.getUsers()
    // TODO: Get all users and get the current one with id
    this.$q.loading.hide()
  },
  methods: {
    getUsers() {},
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
