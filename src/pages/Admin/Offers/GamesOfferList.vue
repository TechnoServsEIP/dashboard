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
      </q-breadcrumbs>
    </div>

    <h5>Offers</h5>
    <div class="row justify-center">
      <div v-for="game in Games" :key="game.id" class="col-3 q-ma-sm">
        <q-img
          src="https://cdn.quasar.dev/img/parallax2.jpg"
          basic
          @mouseover="switchParam(game)"
          @mouseleave="switchParam(game)"
          @click="highlight(game)"
        >
          <div
            v-show="
              (hoverGame && hoverGame.id === game.id) ||
                (selectedGame && selectedGame.id === game.id)
            "
            class="absolute-bottom text-center"
          >
            {{ game.name }}
          </div>
          <div
            v-show="selectedGame && selectedGame.id === game.id"
            class="absolute-full text-subtitle2 flex flex-center"
          >
            <q-btn
              @click="
                $router.push({
                  name: 'OfferList',
                  params: { name: game.name.toLowerCase(), game: game },
                })
              "
              color="primary"
              text-color="white"
              label="See offers"
            />
          </div>
        </q-img>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GamesOfferList',
  data() {
    return {
      Games: [
        {
          name: 'Minecraft',
          id: '1',
        },
        // {
        //   name: 'Hytale',
        //   id: '2',
        // },
        // {
        //   name: 'Dofus',
        //   id: '3',
        // },
      ],
      hoverGame: null,
      selectedGame: null,
      holder: 0,
    }
  },
  methods: {
    showNotif(game, bool) {
      if (bool === true) alert(game.id + ' was selectionned')
    },
    highlight(game) {
      this.selectedGame = game
    },
    switchParam(game) {
      this.hoverGame = game
    },
  },
}
</script>

<style lang="scss" scoped>
.my-card {
  width: 350px;
}
</style>
