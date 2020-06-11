<template>
  <q-page>
    <div>
      <div class="flex row">
        <div v-for="plan in Plan" :key="plan.id" class="q-pa-md col-md-3">
          <div class="my-card">
            <q-card class="my-card">
              <q-card-section class="bg-grey-1">
                <div class="text-h5">
                  <b>{{ plan.name }}</b>
                </div>
                <div class="text-overline price">{{ plan.price }}€/mois</div>
              </q-card-section>

              <q-card-section>
                <div class="text-h6">{{ plan.space }}GB</div>
                <div class="subText">
                  <p>{{ plan.spaceText }}<br /></p>
                </div>
                <div v-if="plan.player > 1">
                  Up to <span class="bold">{{ plan.player }}</span> players
                  connected at the same time.
                </div>
                <div v-else>
                  Up to <span class="bold">{{ plan.player }}</span> player
                  connected at the same time.
                </div>
              </q-card-section>

              <q-card-separator />

              <q-card-section>
                <div v-if="plan.selected === false">
                <q-btn
                  outline
                  class="full-width"
                  color="secondary"
                  label="select"
                  @click="select(plan)"
                />
                </div>
                <div v-else>
                  <q-btn
                    class="full-width"
                    color="secondary"
                    label="selected"
                    @click="plan.selected = false; holder = 0"
                  />
                </div>
              </q-card-section>

              <q-card-actions>
                <button @click="plan.expanded = !plan.expanded" class="link">
                  Show more
                </button>
                <q-space />
                <q-btn
                  color="grey"
                  flat
                  round
                  dense
                  :icon="plan.expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
                  @click="plan.expanded = !plan.expanded"
                />
              </q-card-actions>
              <q-slide-transition>
                <div v-show="plan.expanded">
                  <q-separator />
                  <q-card-section class="text-subitle2 bg-grey-1">
                    Lorem Elsass ipsum amet, sed sit ornare blottkopf, Heineken
                    rucksack rhoncus et Oberschaeffolsheim turpis risus, so
                    flammekueche senectus kougelhopf s'guelt commodo elementum
                    condimentum hop Mauris amet sagittis vielmols, morbi geïz
                    libero, Gal ! ornare dui schpeck vulputate auctor, leo jetz
                    gehts los tellus semper bredele purus gal hopla mamsell
                    libero. turpis, gravida Coopé de Truchtersheim picon bière
                  </q-card-section>
                </div>
              </q-slide-transition>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PlanStepper',
  data() {
    return {
      tmp: Object,
      holder: 0,
      Plan: [
        {
          name: 'Litte',
          expanded: false,
          price: 1,
          player: 5,
          space: 5,
          spaceText: null,
          //space unit ?
          text: null,
          selected: false,
          id: '1',
        },
        {
          name: 'Medium',
          expanded: false,
          price: 4,
          player: 10,
          space: 15,
          spaceText: 'Lorem Elsass ipsum so dui ullamcorper ftomi!',
          text: null,
          selected: false,
          id: '2',
        },
        {
          name: 'Large',
          expanded: false,
          price: 8,
          player: 15,
          space: 20,
          spaceText: 'Lorem Elsass ipsum so dui ullamcorper ftomi!',
          text: null,
          selected: false,
          id: '3',
        },
        {
          name: 'Platinium',
          expanded: false,
          price: 100,
          player: 1,
          space: 1,
          spaceText: null,
          text: 'Pigeon',
          selected: false,
          id: '5',
        },
      ],
    }
  },
  methods: {
    showNotif(tmp, bool) {
      console.log(tmp)
      if (bool === true) alert(tmp+ ' was selectionned')
    },
    select(tmp) {
      this.tmp.selected = false
      this.tmp = tmp
      this.tmp.selected = true
      this.holder = tmp.id
      this.showNotif(this.holder, true)
    },
  },
}
</script>

<style lang="scss" scoped>
.card-plan {
  width: 100%;
  max-width: 200px;
}
.bold {
  font-weight: bold;
  font-size: medium;
}
.price {
  color: $primary;
  font-size: medium;
}
.subText {
  color: lightgrey;
  font-size: small;
}
.marginPlayer {
  margin-top: 2%;
}
.link {
  background: none;
  border: none;
  color: $primary;
}
</style>
