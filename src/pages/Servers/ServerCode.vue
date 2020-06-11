<template>
  <div>
    <div class="q-pb-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/"/>
        <q-breadcrumbs-el label="Dashboard" icon="widgets" :to="'/server/' + $route.params.id"/>
        <q-breadcrumbs-el label="Code" icon="widgets" :to="'/server/' + $route.params.id + '/code'"/>
      </q-breadcrumbs>
    </div>
    <h5>ServerCode</h5>
  </div>
</template>

<script>
export default {
  name: "ServerCode"
}
</script>

<style lang="scss" scoped>
  
</style>
