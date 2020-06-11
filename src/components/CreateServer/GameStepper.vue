<template>
  <q-page>
    <div>
    </div>
    <!--<div class="flex row">
      <div v-for="game in Games" :key="game.id" class="q-py-md">
        <q-card class="my-card">
          <q-card-section horizontal>
          <q-img
            src="https://cdn.quasar.dev/img/parallax2.jpg"
            basic
          >
            <div class="absolute-bottom text-subtitle2 text-center">
              {{game.name}}
            </div>
          </q-img>
            <q-card-actions vertical class="justify-around">
              <q-btn flat round color="red" icon="favorite" />
              <q-btn flat round color="accent" icon="bookmark" />
              <q-btn flat round color="primary" icon="share" />
            </q-card-actions>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="q-pa-md">
      <q-btn color="purple" @click="showNotif" label="Show Notification"/>
      <q-btn color="purple" @click="mouseOver" label="Show"/>
    </div>-->
    <div class="flex row">
      <div v-for="game in Games" :key="game.id" class="q-py-md">
        <div class="my-card">
          <q-img
            src="https://cdn.quasar.dev/img/parallax2.jpg"
            basic
            @mouseover="switchParam(game)"
            @mouseleave="switchParam(game)"
            @click="highlight(game)"
          >
            <div v-show="game.active" class="absolute-bottom text-center">
              {{ game.name }}
            </div>
            <div
              v-show="game.select"
              class="absolute-full text-subtitle2 flex flex-center"
            ></div>
          </q-img>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'GameStepper',
  data() {
    return {
      Games: [
        {
          name: 'Minecraft',
          active: false,
          select: false,
          id: '1',
        },
        {
          name: 'Minecraft',
          active: false,
          select: false,
          id: '2',
        },
        {
          name: 'Minecraft',
          active: false,
          select: false,
          id: '3',
        },
        {
          name: 'Minecraft',
          active: false,
          select: false,
          id: '4',
        },
        {
          name: 'Minecraft',
          active: false,
          select: false,
          id: '5',
        },
      ],
      tmp: Object,
      holder: 0,
    }
  },
  methods: {
    showNotif(tmp, bool) {
      console.log(tmp)
      if (bool === true) alert(tmp+ ' was selectionned')
    },
    highlight(tmp) {
      this.tmp.select = false
      this.tmp = tmp
      this.tmp.select = true
      this.holder = tmp.id
      this.showNotif(this.holder, true)
    },
    switchParam(tmp) {
      if (tmp.select || tmp.active === true) tmp.active = false
      else tmp.active = true
    },
  },
}
</script>

<style lang="scss" scoped>
.my-card {
  width: 350px;
  margin-right: 20px;
}
</style>
