<template>
  <div id="q-app">
    <q-layout view="hHh Lpr fFf">
      <q-page-container>
        <q-page>
          <router-view />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      drawer: false
    }
  },
  created() {
  }
}
</script>

<style lang="scss">
</style>
