<template>
  <div class="row">
    <div class="fit row wrap text-center">
      <div class="col-xs-7 offset-xs-2 col-md-4 offset-md-1 integration-card">
        <gitlab
          :checkActivation="checkActivation"
          :redirect_uri="redirect_uri"
        />
      </div>
      <div class="col-xs-7 offset-xs-2 col-md-4 offset-md-2 integration-card">
        <own-gitlab :checkActivation="checkActivation" />
      </div>
    </div>
  </div>
</template>

<script>
import Gitlab from './Gitlab'
import OwnGitlab from './OwnGitlab'

export default {
  name: 'SCMIntegration',
  props: {
    redirect_uri: { type: String },
  },
  components: {
    Gitlab,
    OwnGitlab,
  },
  data() {
    return {
      activate: false,
    }
  },
  methods: {
    checkActivation(value) {
      if (value) {
        if (this.activate) {
          // This an error
          this.$q.notify({
            icon: 'sentiment_very_dissatisfied',
            message: `You can only integrate one service.`,
            color: 'purple',
          })
          return false
        } else {
          // It's good, the value in child can be true
          this.activate = true
          return true
        }
      } else {
        this.activate = false
        return true
      }
    },
  },
}
</script>

<style lang="scss">
.ts-card-hello {
  margin: 1em;
  width: 100%;
}
.itegration-card {
  margin-top: 10px;
}
</style>
