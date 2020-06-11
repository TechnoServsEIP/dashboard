<template>
  <div>
    <div class="q-pb-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/"/>
        <q-breadcrumbs-el label="Dashboard" icon="widgets" :to="'/server/' + $route.params.id"/>
        <q-breadcrumbs-el label="Resources" icon="widgets" :to="'/server/' + $route.params.id + '/resources'"/>
      </q-breadcrumbs>
    </div>
    <h5>ServerResources</h5>
  </div>
</template>

<script>
export default {
  name: "ServerResources"
}
</script>

<style lang="scss" scoped>
  
</style>
