<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <q-page>
    <div class="sizeTab">
      <div class="text-h6">General</div>
      <div class="row">
        <div class="col-md-5">
          <div class="textParam">Name</div>
          <q-input square filled class="nameField" v-model="realname">
          </q-input>
        </div>

        <div class="col-2"></div>

        <div class="col-md-5">
          <div class="textParam">Surname</div>
          <q-input square filled class="nameField" v-model="surname"> </q-input>
        </div>
      </div>

      <q-separator class="sep" color="secondary" inset />

      <!-- <div class="textParam">Username</div>
      <q-input square filled class="fieldGeneral" v-model="username"> </q-input> -->

      <div class="textParam">Email</div>
      <q-input square filled class="fieldGeneral" v-model="email" type="email">
      </q-input>

      <q-separator color="secondary" class="sep" inset />
      <div class="textParam">Reset password</div>
      <q-input
        square
        filled
        class="fieldGeneral"
        label="Password"
        v-model="password1"
        :type="isPwd ? 'password' : 'text'"
        :rules="[v => v.length >= 6 || 'Password too short']"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <q-input
        square
        filled
        class="fieldGeneral q-mt-md"
        v-model="password2"
        label="Confirm password"
        :type="isPwd ? 'password' : 'text'"
        :rules="[v => v == password1 || 'Password are different']"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      
      <q-btn :loader="changePassLoader" v-if="password1 == password2" class="q-mt-md" color="primary" label="Save" @click="changePassword"/>
      <q-btn v-else  disabled class="q-mt-md" color="primary" label="Save" />
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'GeneralSetting',
  data() {
    return {
      tmp: Object,
      username: 'ichbinkour',
      email: 'oui@test.com',
      password1: '',
      password2: '',
      realname: 'Valentin',
      surname: 'Ichkour',
      isPwd: true,
      changePassLoader: false
    }
  },
  methods: {
    changePassword() {
      this.axios.post('/user/resetpassword', {
        Email: this.$store.getters['client']._user.email,
        Password: this.password2
      }).then(response => {
        console.log(response)
      }).catch(e => {
        console.log(e)
      })
    }
  },
  created() {
    this.email = this.$store.getters['client']._user.email
  }
}
</script>

<style lang="scss" scoped>
.fieldGeneral {
  max-width: 80%;
}

.sep {
  margin-top: 3%;
}
.textParam {
  color: $primary;
  margin-top: 3%;
}
.link {
  background: none;
  border: none;
  color: black;
  font-size: medium;
}
.sizeTab {
  width: 450px;
  height: 450px !important;
}
</style>
