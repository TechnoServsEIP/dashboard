<template>
  <div>
    <q-table
      color="primary"
      card-class="bg-light"
      flat
      title="List of Roles"
      :data="data"
      :columns="columns"
      :rows-per-page="10"
      :filter="filter"
      row-key="ID"
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
    </q-table>
  </div>
</template>

<script>
export default {
  name: 'RoleListTable',
  props: {
    data: Array,
    columns: Array,
  },
  data() {
    return {
      filter: '',
    }
  },
}
</script>

<style lang="scss" scoped></style>
