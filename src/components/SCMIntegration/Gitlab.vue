<template>
  <div class="">
    <q-card class="ts-card-hello text-center">
      <q-img
        spinner-color="black"
        class="gitlab-picture"
        src="statics/gitlab.png"
      />
      <q-card-section>
        <div class="text-h6">Link with GitLab.com</div>
        <div class="">Here you can link with GitLab.com</div>
      </q-card-section>

      <q-separator inset></q-separator>

      <q-card-section
        align="center"
        class="fit row wrap text-center"
        style="justify-content:center"
      >
        <div v-if="!connected" class="">
          <q-btn
            unelevated
            class="btn-secondary"
            label="connect"
            @click="auth"
          />
        </div>
        <div v-else class="fit row text-center wrap">
          <q-btn
            unelevated
            class="btn-secondary col-xs-6 offset-xs-3 col-md-4 offset-md-1  "
            label="disconnect"
            @click="disconnectServer()"
          />
          <q-btn
            v-if="!activate"
            unelevated
            class="btn-secondary integrate-mobile col-xs-6 offset-xs-3 col-md-4 offset-md-2"
            label="activate"
            color="grey"
            @click="activateServer()"
          />
          <q-btn
            v-else
            unelevated
            class="integrate-mobile col-xs-6 offset-xs-3 col-md-4 offset-md-2"
            type="delete"
            color="green"
            label="Desactivate"
            @click="desactivateServer()"
          />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import config from '../../../config.json'
import { authGitlab, getTokenGitlab } from 'src/functions/authGitlab'

export default {
  name: 'Gitlab',
  props: {
    checkActivation: { type: Function },
    redirect_uri: { type: String },
  },
  data() {
    return {
      connected: false,
      activate: false,
      app_id: config.gitlab.app_id,
      secret: config.gitlab.secret,
    }
  },
  mounted() {
    // TODO: Check with server first if he already connect to gitlab
    if (this.$route.query.code) {
      getTokenGitlab(this.redirect_uri, this.$route.query.code)
        .then((this.connected = true))
        .catch((err) => console.error(err))
    }
  },
  methods: {
    auth: function() {
      authGitlab(this.redirect_uri)
    },
    disconnectServer: function() {
      this.$q.notify({
        icon: 'sentiment_very_dissatisfied',
        message: `Self-hosted GitLab server disconnect.`,
        color: 'purple',
      })
      this.connected = false
      this.checkActivation(false)
      this.activate = false
    },
    activateServer: function() {
      if (this.checkActivation(true)) {
        this.$q.notify({
          icon: 'tag_faces',
          message: `GitLab server activated.`,
          color: 'purple',
        })
        this.activate = true
      }
    },
    desactivateServer: function() {
      if (this.checkActivation(false)) {
        this.$q.notify({
          icon: 'sentiment_very_dissatisfied',
          message: `Self-hosted GitLab server desactivated.`,
          color: 'purple',
        })
        this.activate = false
      }
    },
  },
}
</script>

<style lang="scss">
.ts-card {
  width: 200px;
}
.gitlab-picture {
  height: 80px;
  max-width: 100px;
}
</style>
