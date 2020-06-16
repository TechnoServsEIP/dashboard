<template>
  <div padding>
    <div class="q-pb-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/apps/" />
        <q-breadcrumbs-el label="Admin" icon="widgets" to="/admin" />
      </q-breadcrumbs>
    </div>
  </div>
</template>

<script>
import UserListTable from '../../components/Admin/UserListTable'
// eslint-disable-next-line no-unused-vars
import axios from 'axios'
export default {
  name: 'AdminIndex',
  components: {
    UserListTable,
  },
  data() {
    return {
      deleteLoader: false,
      columns: [
        {
          name: 'id',
          required: true,
          label: 'ID',
          align: 'left',
          sortable: true,
          field: (row) => row.ID,
          format: (val) => `${val}`,
        },
        {
          name: 'email',
          required: true,
          label: 'Email',
          align: 'left',
          sortable: true,
          field: (row) => row.email,
          format: (val) => `${val}`,
        },
        {
          name: 'connected',
          required: true,
          label: 'Connected',
          align: 'left',
          sortable: true,
          field: (row) => row.token,
          format: (val) => (val ? 'true' : 'false'),
        },
        {
          name: 'account_created',
          required: true,
          label: 'Account created',
          align: 'left',
          sortable: true,
          field: (row) => row.CreatedAt,
          format: (val) => `${val}`,
        },
        {
          name: 'role',
          required: true,
          label: 'Role',
          align: 'left',
          sortable: true,
          field: (row) => row.Role,
          format: (val) => `${val}`,
        },
        {
          name: 'verified',
          required: true,
          label: 'Verified',
          align: 'left',
          sortable: true,
          field: (row) => row.Verified,
          format: (val) => `${val}`,
        },
        {
          name: 'activate',
          required: true,
          label: 'Activate',
          align: 'left',
          sortable: true,
          field: (row) => row.Activate,
          format: (val) => `${val}`,
        },
      ],
      users: [
        {
          ID: '0',
          CreatedAt: '2020-06-13T10:24:16.630113Z',
          UpdatedAt: '2020-06-13T10:24:16.630113Z',
          DeletedAt: null,
          Role: 'admin',
          email: 'jeremie.bruhwiler@epitech.eu',
          password:
            '$2a$10$0Bo6v/UjnfzdMPqdnMUiM.tGulroMFO6BlCXGuerDFiN4yUhmqsAG',
          token: '',
          Verified: true,
          Activate: true,
        },
        {
          ID: '1',
          CreatedAt: '2020-06-13T10:24:16.630113Z',
          UpdatedAt: '2020-06-13T10:24:16.630113Z',
          DeletedAt: null,
          Role: 'user',
          email: 'jeremie.bruhwiler@gmail.com',
          password:
            '$2a$10$0Bo6v/UjnfzdMPqdnMUiM.tGulroMFO6BlCXGuerDFiN4yUhmqsAG',
          token: '',
          Verified: true,
          Activate: true,
        },
      ],
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
    getUser() {},
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
