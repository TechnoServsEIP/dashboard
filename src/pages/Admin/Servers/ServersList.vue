<template>
  <div padding>
    <div class="q-pb-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/apps/" />
        <q-breadcrumbs-el label="Admin" icon="widgets" to="/admin" />
        <q-breadcrumbs-el label="Servers" icon="dns" to="/admin/servers" />
      </q-breadcrumbs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServersList',
}
</script>
