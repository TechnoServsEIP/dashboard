<template>
  <div>
    <h4>Redirection...</h4>
  </div>
</template>

<script>
export default {
  name: "Github",
  created() {
    this.$axios
      .get(`login/github/callback?code=${this.$route.query.code}`)
      .then((response) => {
        this.$store.commit("setUser", response.data.account);
        this.$router.push("/dashboard");
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
</script>
