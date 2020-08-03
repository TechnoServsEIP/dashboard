<template>
  <div>
    <section>
      <h2 class="title is-3">Server information</h2>
      <div>
        <b-field label="Name">
          <b-input
            v-model="serverName"
            placeholder="Enter the name of the server"
          ></b-input>
        </b-field>
      </div>
    </section>

    <section>
      <h2 class="title is-3">Game</h2>
      <div class="card ts-game-card">
        <div class="card-image">
          <figure class>
            <img
              src="https://i.pinimg.com/originals/1c/aa/d9/1caad9cdc429d0baabc00764cde5237f.png"
              alt="Minecraft Logo"
            />
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <b-button type="is-primary" disabled style="width: 100%"
              >Selected</b-button
            >
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2 class="title is-3">Validation</h2>
      <b-button
        class="is-success"
        :disabled="serverName !== '' ? false : true"
        @click="createServer()"
        :loading="isCreationLoading"
        >Create server</b-button
      >
    </section>
  </div>
</template>

<script>
export default {
  name: "create",
  data() {
    return {
      serverName: "",
      selectedGame: "minecraft",
      isCreationLoading: false
    };
  },
  created() {},
  methods: {
    createServer() {
      this.isCreationLoading = true;
      this.$axios
        .post("/docker/create", {
          // Si user_id en digit => incrementation de l'id des server mais pas de création
          user_id: this.$store.state.user.ID.toString(),
          game: this.selectedGame,
          server_name: this.serverName
        })
        .then(response => {
          this.isCreationLoading = false;
          this.$router.push("/apps");
        })
        .catch(e => {
          console.log(e);
          this.isCreationLoading = false;
        });
    }
  }
};
</script>

<style lang="scss">
section {
  margin-bottom: 2em;
}
.ts-game-card {
  width: 20%;
}
</style>
