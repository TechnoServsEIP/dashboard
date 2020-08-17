<template>
  <div padding>
    <div class="q-pb-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/apps/" />
        <q-breadcrumbs-el label="Admin" icon="widgets" to="/admin" />
        <q-breadcrumbs-el label="Users" icon="group" to="/admin/users" />
      </q-breadcrumbs>
    </div>

    <div class="row q-pt-md">
      <user-list-table
        class="ts-player-table"
        :data="users"
        @addUser="addUser"
      ></user-list-table>
    </div>
  </div>
</template>

<script>
import UserListTable from '../../../components/Admin/UserListTable'

export default {
  name: 'UserList',
  components: {
    UserListTable,
  },
  data() {
    return {
      deleteLoader: false,
      users: [],
      serverInformation: null,
      serversStatus: '',
      buttonLoading: false,
      buttonLoadingStart: false,
      buttonLoadingStop: false,
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
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
      this.users = result.res.Value
    },
    addUser(newUser) {
      console.log(newUser)
      this.users.push(newUser)
    },
  },
}
</script>

<style lang="scss" scoped>
.ts-player-table {
  width: 100%;
}
.ts-resources-card {
  background: $light;
  padding: 10px;
  height: 100%;
}
.ts-server-info-card {
  background: $light;
  padding: 10px;
}
.ts-server-info-label {
  padding-top: 10px;
}
.ts-server-info-item {
  color: $primary;
  font-weight: bold;
}
p {
  margin: 0;
  padding-top: 7px;
}
#server-notification {
  background: #03a64d;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  margin-top: 12px;
  background-color: #03a64d;
  box-shadow: 0 0 10px 5px rgba(3, 166, 77, 1);
  -webkit-box-shadow: 0px 0px 10px 0px rgba(3, 166, 77, 1);
  -moz-box-shadow: 0px 0px 10px 0px rgba(3, 166, 77, 1);
}
#file-input {
  padding-left: 20px;
}
</style>
