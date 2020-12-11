<template>
  <div>Checkout redirection, please wait...</div>
</template>

<script>
export default {
  name: 'Checkout',
  created() {
    if (this.$route.query.success === 'true') {
      this.createServer()
    } else if (this.$route.query.canceled === 'true') {
      this.$notify({
        type: 'danger',
        title: "Couldn't create the server, please try again",
      })
      this.$router.push('/')
      this.$store.commit('setCreateServerInfo', null)
    }
  },
  methods: {
    insertBill() {
      this.$axios
        .post(
          '/user/insertbill',
          {
            email: this.$store.state.user.email,
            product: 'minecraft',
            price: '100',
          },
          {
            headers: {
              Authorization: `Bearer ${this.$store.state.user.token}`,
            },
          },
        )
        .then((response) => {
          console.log(response)
        })
        .catch((e) => {
          console.log(e)
        })
    },
    createServer() {
      this.$store.state.client.Docker.create(
        this.$store.state.user.ID.toString(),
        'minecraft',
        this.$store.state.serverCreateInfo.name,
      )
        .then((response) => {
          this.$store.commit('setCreateServerInfo', null)
          console.log(response)
          this.$router.push({ path: '/dashboard' })
          this.insertBill()
          this.$notify({
            type: 'success',
            title: `Server ${this.serverName} correctly created`,
          })
        })
        .catch((e) => {
          this.$store.commit('setCreateServerInfo', null)
          this.$router.push({ path: '/dashboard' })
          this.$notify({
            type: 'danger',
            title: `Something went wrong: ${e._message.message}`,
          })
        })
    },
  },
}
</script>
