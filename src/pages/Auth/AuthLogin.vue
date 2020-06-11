<template>
  <div>
    <div class="q-pa-md justify-center">
      <h5>Hosting Game Server Platform <br> Designed for Gamers</h5>
      <p class="q-pb-md body-light">Welcome back ! <br> Please login to your account.</p>
      <div style="max-width: 500px">
        <q-form
          @submit="logUser"
          class="q-gutter-md" 
        >
          <q-input
            outlined
            v-model="login"
            type="email"
            label="Login"
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          >
            <template v-slot:prepend>
              <q-icon name="mail" />
            </template>
          </q-input>

          <q-input
              outlined
              v-model="password"
              label="Password"
              type="password"
              :rules="[ val => val && val.length >= 6 || 'Enter correct password']"
          >
            <template v-slot:prepend>
              <q-icon name="fingerprint" />
            </template>
          </q-input>
          
          <p v-if="errorMessage != ''" style="color: red">{{errorMessage}}</p>

          <div class="q-pa-md">
            <q-btn :loading="loginLoader" color="primary" type="submit" label="Login" style="width: 100px"></q-btn>
          </div>
        </q-form>
      </div>
    </div>
  </div>
</template>

<script>
  import fetch from "node-fetch"
  import {clientFromAuth} from "technoservs"

  export default {
    name: "AuthLogin",
    data() {
      return {
        login: '',
        password: '',
        remember: '',
        loginLoader: false,
        errorMessage: ''
      }
    },
    created() {
      
    },
    methods: {
      async logUser() {
        this.loginLoader = false

        this.errorMessage = ''
        let client = await clientFromAuth({username: this.login, password: this.password}).catch(e => {
          this.errorMessage = e
          console.log("ERROR", e)
          this.loginLoader = false
        })

        if (this.errorMessage == '') {
          console.log("client dockers", client)
          this.$store.dispatch('setClient', client)
          this.$store.dispatch('setToken', client._user.token)
          this.loginLoader = false
          this.$router.push(this.$route.query.redirect || '/apps');
        }
      }
    }
  }
</script>

<style scoped>
</style>
