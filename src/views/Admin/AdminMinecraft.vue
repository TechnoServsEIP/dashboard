<template>
  <div>
    <div>
      <h2>Minecraft admin server properties</h2>
    </div>
    <p class="mt-4">Limit max player on all servers</p>
    <div class="d-flex mb-2">
      <div class="mr-2">
        <el-input
          v-model="maxPlayer"
          placeholder="Max amount of player"
        ></el-input>
      </div>
      <div>
        <el-button :loading="isUpdateLoading" @click="updateMaxPlayer"
          >Save</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Minecraft',
  data() {
    return {
      maxPlayer: '',
      isUpdateLoading: false,
    }
  },
  methods: {
    updateMaxPlayer() {
      this.isUpdateLoading = true
      this.$axios
        .post(
          'docker/limitnumberplayersofuserservers',
          {
            user_id: this.$store.state.user.ID.toString(),
            limit_player: Number(this.maxPlayer),
          },
          {
            headers: {
              authorization: `Bearer ${this.$store.state.user.token}`,
            },
          },
        )
        .then((response) => {
          this.isUpdateLoading = false
          this.$notify({
            type: 'success',
            title: 'Max player correctly updated',
          })
          console.log(response)
        })
        .catch((e) => {
          this.isUpdateLoading = false
          console.log(e)
          this.$notify({
            type: 'danger',
            title: 'Error while updating max player',
          })
        })
    },
  },
}
</script>
