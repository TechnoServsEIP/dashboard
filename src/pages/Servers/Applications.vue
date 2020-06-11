<template>
  <q-layout>
    <q-page padding>
      <p></p>
      <h3>Instances</h3>
      <q-btn color="primary" icon="add" label="New instance" :to="{name: 'Create'}"/>
      <servers-list></servers-list>
    </q-page>
  </q-layout>
</template>

<script>
import ServersList from "../../components/Servers/ServersList"
import request from "request"

export default {
  name: 'Applications',
  components: {
    ServersList
  },
  data() {
    return {
      errorMessageVerified: ''
    }
  },
  created() {
  }
}
</script>

<style lang="scss">
  
</style>
