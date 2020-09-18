<template>
  <div class="container-fluid">
    <div class="row">
      <div
        v-if="serverInfos.length != 0"
        class="card shadow mr-4 col-md-7"
        style="width: 100%"
        :class="type === 'dark' ? 'bg-default' : ''"
      >
        <div
          class="card-header"
          :class="type === 'dark' ? 'bg-transparent' : ''"
        >
          <div class="row align-items-center">
            <div class="col">
              <h3 class="mb-0" :class="type === 'dark' ? 'text-white' : ''">
                {{ serverInfos[0].server_name }}
              </h3>
            </div>
            <div class="col-md-auto">
              <badge
                v-if="serverInfos[0].server_status == 'Started'"
                type="success"
                >{{ serverInfos[0].settings.State.Status }}</badge
              >
              <badge v-else type="danger">{{
                serverInfos[0].settings.State.Status
              }}</badge>
            </div>
          </div>
        </div>
        <div class="card-body">
          <p>
            Name:
            <strong>{{ serverInfos[0].server_name }}</strong>
          </p>
          <p>
            IP:
            <strong
              >x2021alsablue1371139462001.northeurope.cloudapp.azure.com</strong
            >
          </p>
          <p>
            Port:
            <strong>{{
              serverInfos[0].settings.HostConfig["PortBindings"][
                "25565/tcp"
              ][0]["HostPort"]
            }}</strong>
          </p>
        </div>
      </div>

      <div
        v-if="serverInfos.length != 0"
        class="card shadow col ml-auto"
        :class="type === 'dark' ? 'bg-default' : ''"
      >
        <div
          class="card-header"
          :class="type === 'dark' ? 'bg-transparent' : ''"
        >
          <div class="row align-items-center">
            <div class="col">
              <h3 class="mb-0" :class="type === 'dark' ? 'text-white' : ''">
                Actions
              </h3>
            </div>
          </div>
        </div>
        <div class="card-body">
          <base-button
            v-if="serverInfos[0].server_status == 'Started'"
            :disabled="isBtnLoading"
            @click.prevent="restartServer()"
            >Restart</base-button
          >
          <base-button
            v-else
            :disabled="isBtnLoading"
            type="success"
            @click.prevent="startServer"
            >Start</base-button
          >
          <base-button
            :disabled="isBtnLoading || serverInfos[0].server_status == 'Stoped'"
            type="warning"
            @click.prevent="stopServer()"
            >Stop</base-button
          >
          <base-button
            :disabled="isBtnLoading"
            type="danger"
            @click.prevent="deleteServer()"
            >Delete</base-button
          >
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
      serverInfos: [],
      type: "",
      isBtnLoading: false,
    };
  },
  methods: {
    getServerInfo() {
      this.$store.state.client.Docker.list(this.$store.state.user.ID.toString())
        .then((response) => {
          this.serverInfos = response.list.filter((v) => {
            return v.ID == this.$route.params.id;
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updateServerStatus(server) {
      this.serverInfos[0].settings.State.Status = server;
    },
    startServer() {
      this.isBtnLoading = true;
      this.$store.state.client.Docker.start(
        this.$store.state.user.ID.toString(),
        this.serverInfos[0].id_docker
      )
        .then((response) => {
          this.isBtnLoading = false;
          this.serverInfos[0].server_status = "Started";
          this.updateServerStatus(response.settings.State.Status);
          this.$notify({
            type: "success",
            title: "Server correctly started",
          });
        })
        .catch((e) => {
          this.$notify({
            type: "danger",
            title: "An error occured while starting server",
          });
          console.log(e._message);
        });
    },
    stopServer() {
      this.isBtnLoading = true;
      this.$store.state.client.Docker.stop(
        this.$store.state.user.ID.toString(),
        this.serverInfos[0].id_docker
      )
        .then((response) => {
          this.serverInfos[0].server_status = "Stoped";
          this.updateServerStatus("exited");
          this.isBtnLoading = false;
          this.$notify({
            type: "success",
            title: "Server correctly stoped",
          });
        })
        .catch((e) => {
          this.isBtnLoading = false;
          this.$notify({
            type: "danger",
            title: "An error occured while stoping server",
          });
          console.log(e._message);
        });
    },
    restartServer() {
      this.isBtnLoading = true;
      this.$store.state.client.Docker.stop(
        this.$store.state.user.ID.toString(),
        this.serverInfos[0].id_docker
      )
        .then(() => {
          this.$store.state.client.Docker.start(
            this.$store.state.user.ID.toString(),
            this.serverInfos[0].id_docker
          )
            .then((response) => {
              this.serverInfos[0].server_status = "Started";
              this.updateServerStatus(response.settings.State.Status);
              this.isBtnLoading = false;
            })
            .catch((e) => {
              console.log(e._message);
            });
          this.$notify({
            type: "success",
            title: "Server correctly restared",
          });
        })
        .catch((e) => {
          console.log(e);
          this.$notify({
            type: "danger",
            title: "An error occured while restarting server",
          });
          this.isBtnLoading = false;
        });
    },
    deleteServer() {
      this.isBtnLoading = true;
      this.$store.state.client.Docker.delete(
        this.$store.state.user.ID.toString(),
        this.serverInfos[0].id_docker
      )
        .then((response) => {
          console.log(response);
          this.isBtnLoading = false;
          this.$router.push({ path: "/dashboard" });
          this.$notify({
            type: "success",
            title: "Server correctly deleted",
          });
          this.isBtnLoading = false;
        })
        .catch((e) => {
          this.isBtnLoading = false;
          this.$notify({
            type: "danger",
            title: "An error occured while deleting server",
          });
          this.isBtnLoading = false;
          console.log(e._message);
        });
    },
  },
  created() {
    this.getServerInfo();
  },
};
</script>
<style></style>
