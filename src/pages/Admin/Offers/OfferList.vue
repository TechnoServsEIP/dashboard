<template>
  <div padding>
    <div class="q-pb-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/apps/" />
        <q-breadcrumbs-el label="Admin" icon="widgets" to="/admin" />
        <q-breadcrumbs-el
          label="Offers"
          icon="local_offer"
          to="/admin/offers"
        />
        <q-breadcrumbs-el
          :label="$route.params.game.name"
          icon="sports_esports"
          to="/admin/users/:id"
        />
      </q-breadcrumbs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OfferList',
  data() {
    return {}
  },
}
</script>

<style lang="scss"></style>
