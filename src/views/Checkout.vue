<template>
  <div>
    Checkout redirection, please wait...
  </div>
</template>

<script>
export default {
  name: "Checkout",
  mounted() {
    if (this.$route.query.success === "true") {
      this.createServer();
    } else if (this.$route.query.canceled === "true") {
      this.$notify({
        type: "danger",
        title: "Couldn't create the server, please try again",
      });
      this.$router.push("/");
      this.$store.commit("setCreateServerInfo", null);
    }
  },
  methods: {
    createServer() {
      this.$store.state.client.Docker.create(
        this.$store.state.user.ID.toString(),
        "minecraft",
        this.$store.state.serverCreateInfo.name
      )
        .then((response) => {
          this.$store.commit("setCreateServerInfo", null);
          console.log(response);
          this.$router.push({ path: "/dashboard" });
          this.$notify({
            type: "success",
            title: `Server ${this.serverName} correctly created`,
          });
        })
        .catch((e) => {
          this.$store.commit("setCreateServerInfo", null);
          this.$router.push({ path: "/dashboard" });
          this.$notify({
            type: "danger",
            title: `Something went wrong: ${e._message.message}`,
          });
        });
    },
  },
};
</script>
