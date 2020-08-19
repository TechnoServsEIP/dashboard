<template>
  <q-page>
    <div class="flex row">
      <div class="q-py-md" v-if="serversList.length == 0">
        <p>You have no instances, please create one !</p>
      </div>
      <div
        v-else
        v-for="server in serversList"
        :key="server.ID"
        class="q-py-md"
      >
        <q-card class="ts-card">
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-h5">{{
                server.server_name
              }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator />

          <q-item>
            <q-item-section>
              <q-item-label>CPU:</q-item-label>
              <q-linear-progress size="20px" :value="0.2" color="primary">
                <div class="absolute-full flex flex-center">
                  <q-badge color="white" text-color="primary" label="20%" />
                </div>
              </q-linear-progress>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label>RAM:</q-item-label>
              <q-linear-progress size="20px" :value="0.7" color="primary">
                <div class="absolute-full flex flex-center">
                  <q-badge color="white" text-color="primary" label="70%" />
                </div>
              </q-linear-progress>
            </q-item-section>
          </q-item>

          <q-separator />

          <q-item>
            <q-item-section>
              <q-item-label caption> Game: {{ server.game }} </q-item-label>
            </q-item-section>
            <router-link :to="'/apps/server/' + server.ID">
              <template>
                <q-btn flat round color="#008466" icon="settings" />
              </template>
            </router-link>
          </q-item>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'ServersList',
  data() {
    return {
      serversList: [],
    }
  },
  methods: {
    getServers() {},
  },
  created() {
    this.axios
      .post(
        '/docker/list',
        { user_id: this.$store.getters['client'].ID.toString() },
        {
          headers: {
            Authorization: `Bearer ${this.$store.getters['client'].token}`,
          },
        },
      )
      .then((response) => {
        this.serversList = response.data.list
      })
      .catch((e) => {
        console.log('ERROR', e)
      })
  },
}
</script>

<style lang="scss" scoped>
.ts-card {
  width: 350px;
  margin-right: 20px;
}
</style>
