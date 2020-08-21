<template>
  <div>
    <base-header type="gradient-default" class="pb-6 pb-8 pt-5 pt-md-8"></base-header>

    <div class="container-fluid mt--7">
      <div class="row mt-5">
        <div class="card shadow" style="width: 100%">
          <div class="card-header border-0">
            <div class="row align-items-center">
              <div class="col">
                <h3 class="mb-0">Create a server</h3>
              </div>
              <div class="col-md-auto">
                <router-link to="/dashboard">
                  <base-button type="primary" size="sm">Return to dashboard</base-button>
                </router-link>
              </div>
            </div>
          </div>

          <div class="table-responsive m-4">
            <div class="row mb-4">
              <div class="col-md-6">
                <input
                  type="text"
                  v-model="serverName"
                  class="form-control"
                  placeholder="Your server name"
                  aria-label="Your server name"
                  aria-describedby="button-addon2"
                />
              </div>
            </div>

            <div class="row mb-4">
              <div class="col-md-6">
                <strong>Game:</strong> Minecraft
              </div>
            </div>

            <div class="row mb-4">
              <div class="col-md-6">
                <base-button
                  :disabled="!allFieldsCompleted || isLoading"
                  type="success"
                  @click.prevent="createServer()"
                >Create !</base-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      allFieldsCompleted: false,
      serverName: "",
      isLoading: false,
    };
  },
  watch: {
    serverName() {
      if (this.serverName != "") this.allFieldsCompleted = true;
      else this.allFieldsCompleted = false;
    },
  },
  methods: {
    createServer() {
      if (this.allFieldsCompleted) {
        this.isLoading = true;
        this.$store.state.client.Docker.create(
          this.$store.state.user.ID.toString(),
          "minecraft",
          this.serverName
        )
          .then((response) => {
            this.isLoading = false;
            this.$router.push({ path: "/dashboard" });
            console.log(response);
          })
          .catch((e) => {
            this.isLoading = false;
            console.log(e);
          });
      }
    },
  },
};
</script>
<style></style>
