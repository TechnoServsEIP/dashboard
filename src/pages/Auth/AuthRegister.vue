<template>
  <div>
    <div class="q-pa-md justify-center">
      <h5>Hosting Game Server Platform Designed for Gamers</h5>
      <p class="q-pb-md body-light">Welcome abroad TechnoServs user !</p>
      <div style="max-width: 500px">
        <q-form @submit="createAccount" class="q-gutter-md">
          <q-input
            outlined
            type="email"
            v-model="email"
            label="Email"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          >
            <template v-slot:prepend>
              <q-icon name="mail" />
            </template>
          </q-input>

          <q-input
            outlined
            v-model="confirm_email"
            type="email"
            label="Confirm email"
            lazy-rules
            :rules="[ val => val == email || 'Emails must be the same']"
          >
            <template v-slot:prepend>
              <q-icon name="mail" />
            </template>
          </q-input>

          <q-input
            outlined
            type="password"
            v-model="password"
            label="Password"
            lazy-rules
            :rules="[ val => val && val.length >= 6 || 'Password must be 6 characters minimum']"
          >
            <template v-slot:prepend>
              <q-icon name="fingerprint" />
            </template>
          </q-input>

          <q-input
            outlined
            type="password"
            v-model="confirm_password"
            label="Confirm password"
            lazy-rules
            :rules="[ val => val == password || 'Passwords must be the same']"
          >
            <template v-slot:prepend>
              <q-icon name="fingerprint" />
            </template>
          </q-input>

          <p v-if="errorMessage != ''" style="color: red">{{errorMessage}}</p>

          <div class="q-pa-md">
            <q-btn
              :loading="registerLoader"
              color="primary"
              type="submit"
              label="Register"
              style="width: 100px"
            ></q-btn>
          </div>
        </q-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AuthLogin',
  data() {
    return {
      email: '',
      confirm_email: '',
      password: '',
      confirm_password: '',
      registerLoader: false,
      errorMessage: '',
    }
  },
  methods: {
    createAccount() {
      this.registerLoader = true

      let body = {
        email: this.email,
        password: this.password,
      }
      this.axios
        .post('/user/new', body)
        .then((response) => {
          this.$router.push(this.$route.query.redirect || '/auth/login')
        })
        .catch((e) => {
          console.log(e)
        })
    },
  },
  created() {},
}
</script>

<style scoped>
</style>
