<template>
  <div>
    <q-table
      color="primary"
      card-class="bg-light"
      flat
      title="Billing"
      :data="data"
      :columns="columns"
      :rows-per-page="10"
      :filter="filter"
      row-key="ID"
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
          <q-td key="date" :props="props">
            {{ props.row.date }}
          </q-td>
          <q-td key="id" :props="props">
            {{ props.row.id }}
          </q-td>
          <q-td key="server_name" :props="props">
            {{ props.row.server_name }}
          </q-td>
          <q-td key="game" :props="props">
            {{ props.row.game }}
          </q-td>
          <q-td key="total" :props="props">
            {{ props.row.total.toFixed(2) }} $
          </q-td>
          <q-td key="status" :props="props">
            {{ props.row.status }}
          </q-td>
          <q-td key="edit" :props="props">
            <q-btn flat color="black" round icon="info" />
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
  name: 'BillingListTable',
  props: {
    data: Array,
  },
  data() {
    return {
      columns: [
        {
          name: 'date',
          required: true,
          label: 'Date',
          align: 'left',
          sortable: true,
          field: (row) => row.date,
          format: (val) => `${val}`,
        },
        {
          name: 'id',
          required: true,
          label: 'Server ID',
          align: 'left',
          sortable: true,
          field: (row) => row.id,
          format: (val) => `${val}`,
        },
        {
          name: 'server_name',
          required: true,
          label: 'Server Name',
          align: 'left',
          sortable: true,
          field: (row) => row.server_name,
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
          name: 'total',
          required: true,
          label: 'Total',
          align: 'left',
          sortable: true,
          field: (row) => row.total,
          format: (val) => `${val}`,
        },
        {
          name: 'status',
          required: true,
          label: 'Status',
          align: 'left',
          sortable: true,
          field: (row) => row.status,
          format: (val) => `${val}`,
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
