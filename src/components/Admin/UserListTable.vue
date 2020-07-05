<template>
  <div>
    <q-table
      color="primary"
      card-class="bg-light"
      flat
      title="List of Users"
      :data="data"
      :columns="columns"
      :rows-per-page="10"
      :filter="filter"
      row-key="ID"
      :rows-per-page-options="[]"
      selection="multiple"
      :selected.sync="selected"
    >
      <template v-slot:top>
        <q-btn
          round
          color="secondary"
          class="q-mr-lg"
          icon="add_circle"
          @click="addModalVisible = true"
        />

        <q-btn color="deep-orange" round icon="delete" @click="deleteUsers" />
        <q-space />
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-checkbox dense v-model="props.selected" />
          </q-td>
          <q-td key="id" :props="props">
            {{ props.row.ID }}
          </q-td>
          <q-td key="email" :props="props">
            {{ props.row.email }}
            <q-popup-edit v-model="props.row.email" @save="saved">
              <q-input v-model="props.row.email" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="connected" :props="props">
            {{ props.row.token ? 'true' : 'false' }}
          </q-td>
          <q-td key="account_created" :props="props">
            {{ props.row.CreatedAt }}
          </q-td>
          <q-td key="role" :props="props">
            {{ props.row.Role }}
            <q-popup-edit>
              <q-select v-model="props.row.Role" :options="roles" />
            </q-popup-edit>
          </q-td>
          <q-td key="verified" :props="props">
            {{ props.row.Verified }}
          </q-td>
          <q-td key="activate" :props="props">
            {{ props.row.Activate }}
          </q-td>
          <q-td key="edit" :props="props">
            <q-btn
              flat
              color="black"
              round
              icon="info"
              @click="
                $router.push({ name: 'UserInfo', params: { id: props.row.ID } })
              "
            />
          </q-td>
        </q-tr>
        <!-- <q-tr :props="props">
          <q-td key="email" :props="props">
            {{ props.row.email }}
            <q-popup-edit v-model="props.row.email" title="Edit the Name">
              <q-input v-model="props.row.email" dense autofocus counter />
            </q-popup-edit>
          </q-td>
        </q-tr>
        <q-tr :props="props">
          <q-td key="email" :props="props">
            {{ props.row.email }}
            <q-popup-edit v-model="props.row.email" title="Edit the Name">
              <q-input v-model="props.row.email" dense autofocus counter />
            </q-popup-edit>
          </q-td>
        </q-tr> -->
      </template>
    </q-table>
    <add-user-dialog
      @addNewUser="addUser"
      :visible="addModalVisible"
      @close="addModalVisible = false"
    />
  </div>
</template>

<script>
import AddUserDialog from './AddUserDialog'
export default {
  name: 'UserListTable',
  props: {
    data: Array,
    columns: Array,
  },
  components: {
    AddUserDialog,
  },
  data() {
    return {
      selected: [],
      filter: '',
      addModalVisible: false,
      roles: ['admin', 'user'],
    }
  },
  methods: {
    saved(val, initialValue, id) {
      // {{url}}/user/update
      console.log(`original value = ${initialValue}, new value = ${val}`)
      const toSend = {
        Id: id,
        role: val,
      }
      // TODO: send to route
    },
    addUser(email, password, role) {
      // const toSend = {
      //   Email: email,
      //   Password: password,
      // }
      //TODO: Send API Create account
      this.data.push({
        ID: this.data.length,
        CreatedAt: '2020-06-13T10:24:16.630113Z',
        UpdatedAt: '2020-06-13T10:24:16.630113Z',
        DeletedAt: null,
        Role: role,
        email: email,
        password: password,
        token: '',
        Verified: false,
        Activate: false,
      })
    },
    deleteUsers() {
      //TODO: Add call API
      // TODO: check if user is admin or not and if so, dont delete
      this.selected.forEach((element) => {
        let id = element.ID
        let role = element.Role
        if (role == 'admin') {
          this.$q.notify({
            icon: 'sentiment_very_dissatisfied',
            message: `You can not delete admin users.`,
            color: 'purple',
          })
          return
        }
        this.data.splice(
          this.data.findIndex(function(i) {
            return i.id === id
          }),
          1,
        )
      })
      this.selected = []
    },
  },
  computed: {
    records() {
      return this.data
    },
  },
}
</script>

<style lang="scss" scoped></style>
