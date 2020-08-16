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
          :label="
            $route.params.name.charAt(0).toUpperCase() +
              $route.params.name.slice(1)
          "
          icon="sports_esports"
          to="/admin/offers/:name"
        />
      </q-breadcrumbs>
    </div>
    <offer-list-table />
  </div>
</template>

<script>
import OfferListTable from '../../../components/Admin/Offers/OfferListTable'
export default {
  name: 'OfferList',
  components: {
    OfferListTable,
  },
  created() {
    // Check if game exist
    // Get all offer
    this.getOffers()
  },
  methods: {
    getOffers() {
      const game = this.$route.params.name
      // TODO: Add API
    },
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss"></style>
