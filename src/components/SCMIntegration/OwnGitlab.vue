<template>
  <div class="">
    <q-card class="ts-card-hello text-center">
      <q-img
        spinner-color="black"
        class="gitlab-picture"
        src="statics/gitlab.png"
      />
      <q-card-section>
        <div class="text-h6">
          Link with your self-hosted GitLab
        </div>
        <div class="">
          Here you can setup your self-hosted GitLab
        </div>
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
            @click.stop="showDialog = true"
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
            label="Activate"
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
    <self-hosted-dialog
      @addTokenParent="addToken"
      :visible="showDialog"
      @close="showDialog = false"
    />
  </div>
</template>

<script>
import SelfHostedDialog from 'src/components/SelfHostedGitlab/SelfHostedDialog'

export default {
  name: 'OwnGitlab',
  props: {
    checkActivation: { type: Function },
  },
  components: {
    SelfHostedDialog,
  },
  data() {
    return {
      showDialog: false,
      token: '',
      address: '',
      connected: false,
      activate: false,
    }
  },
  methods: {
    addToken: function(token, address) {
      this.token = token
      this.address = address
      if (!this.token) {
        return
      }
      this.$q.notify({
        icon: 'tag_faces',
        message: `Self-hosted GitLab server added.`,
        color: 'purple',
      })
      this.connected = true
      // authSelfHosted(redirect_uri, state, address, token)
      // TODO: Send to the server
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
        this.activate = true
        this.$q.notify({
          icon: 'tag_faces',
          message: `Self-hosted GitLab server activated.`,
          color: 'purple',
        })
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
.gitlab-picture {
  height: 80px;
  max-width: 100px;
}
.ts-card {
  width: 200px;
}
@media screen and (max-width: 768px) {
  .integrate-mobile {
    margin-top: 17px;
  }
}
</style>
