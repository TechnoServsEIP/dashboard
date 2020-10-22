<template>
  <div></div>
</template>

<script>
export default {
  name: "ConfirmAccount",
  created() {
    this.$axios
      .post("/user/confirm", null, {
        params: {
          token: this.$route.query.token
        }
      })
      .then(response => {
        this.$router.push("/login");
      })
      .catch(e => {
        this.$router.push("/login");
      });
  }
};
</script>
