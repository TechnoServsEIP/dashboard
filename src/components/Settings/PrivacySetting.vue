<template>
  <q-page>
    <div class="sizeTab">
      <div class="text-h6">Privacy</div>
      <div class="row">
        <div class="col-1"></div>
        <div class="col-10">
          <div class="textParam">Credit Cart</div>
          <q-input
            filled
            v-model="card"
            mask="#### - #### - #### - ####"
            fill-mask="#"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PrivateSetting',
  data() {
    return {
      card: null,
    }
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.textParam {
  color: $primary;
  margin-top: 3%;
}
.sizeTab {
  width: 450px;
  height: 450px;
}
</style>
