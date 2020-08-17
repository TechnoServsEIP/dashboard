<template>
  <div padding>
    <div class="q-pb-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/apps/" />
        <q-breadcrumbs-el label="Admin" icon="widgets" to="/admin" />
        <q-breadcrumbs-el label="Servers" icon="dns" to="/admin/servers" />
      </q-breadcrumbs>
    </div>
    <server-list-table
      class="ts-player-table"
      :data="servers"
      :columns="columns"
    />
  </div>
</template>

<script>
import ServerListTable from '../../../components/Admin/Servers/ServerListTable'
// eslint-disable-next-line no-unused-vars
import axios from 'axios'
export default {
  name: 'AllServersList',
  components: {
    ServerListTable,
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
          name: 'label',
          required: true,
          label: 'Label',
          align: 'left',
          sortable: true,
          field: (row) => row.label,
          format: (val) => `${val}`,
        },
      ],
      servers: [],
      serverInformation: null,
      serversStatus: '',
      buttonLoading: false,
      buttonLoadingStart: false,
      buttonLoadingStop: false,
    }
  },
  created() {
    this.getServers()
  },
  methods: {
    getServers() {
      // TODO: wait to backend to develop route
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
