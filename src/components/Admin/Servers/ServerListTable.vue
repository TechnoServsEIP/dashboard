<template>
  <div>
    <q-table
      color="primary"
      card-class="bg-light"
      flat
      title="Servers"
      :data="data"
      :columns="columns"
      :rows-per-page="10"
      :filter="filter"
      row-key="server_id"
      :selected.sync="selected"
      selection="multiple"
      :rows-per-page-options="[]"
    >
      <template v-slot:top-right>
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
          <q-td key="server_id" :props="props">
            {{ props.row.ID }}
          </q-td>
          <q-td key="user_id" :props="props">
            {{ props.row.user_id }}
          </q-td>
          <q-td key="game" :props="props">
            {{ props.row.game }}
          </q-td>
          <q-td key="id_docker" :props="props">
            {{ props.row.id_docker }}
          </q-td>
          <q-td key="server_status" :props="props">
            {{ props.row.server_status }}
          </q-td>
          <q-td key="edit" :props="props">
            <q-btn
              flat
              color="black"
              round
              icon="info"
              @click="
                $router.push({
                  path: `/admin/server/${props.row.ID}`,
                  params: { id: props.row.ID },
                })
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
  </div>
</template>

<script>
export default {
  name: 'ServerListTable',
  props: {
    data: Array,
  },
  data() {
    return {
      selected: [],
      columns: [
        {
          name: 'server_id',
          required: true,
          label: 'Server ID',
          align: 'left',
          sortable: true,
          field: (row) => row.ID,
          format: (val) => `${val}`,
        },
        {
          name: 'user_id',
          required: true,
          label: 'User ID',
          align: 'left',
          sortable: true,
          field: (row) => row.user_id,
          format: (val) => `${val}`,
        },
        {
          name: 'game',
          required: true,
          label: 'Game',
          align: 'left',
          sortable: true,
          field: (row) => row.game,
          format: (val) => `${val}`,
        },
        {
          name: 'id_docker',
          required: true,
          label: 'Docker ID',
          align: 'left',
          sortable: true,
          field: (row) => row.id_docker,
          format: (val) => `${val}`,
        },
        {
          name: 'server_status',
          required: true,
          label: 'Status',
          align: 'left',
          sortable: true,
          field: (row) => row.server_status,
          format: (val) => `${val}`,
        },
        {
          name: 'edit',
          required: false,
          label: 'Edit',
          align: 'left',
          sortable: false,
        },
      ],
      filter: '',
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
  },
  computed: {
    records() {
      return this.data
    },
  },
}
</script>

<style lang="scss" scoped></style>