<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Forgot password ?</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            v-model="Password"
            filled
            :type="isPwd ? 'password' : 'text'"
            autofocus
            lazy-rules
            :rules="[
              (val) => (val && val.length > 3) || 'Please type something',
            ]"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            v-model="newPassword"
            filled
            :type="isPwd ? 'password' : 'text'"
            @keyup.enter="prompt = false"
            autofocus
            lazy-rules
            :rules="[(val) => val || 'Please type someting']"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <div v-if="isOk == true">
            <q-btn flat label="Confirm" v-close-popup />
          </div>
          <div v-else>
            <q-btn flat label="Confirm" @click="onReset"/>
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
`
<script>
export default {
  name: 'dialogPassword',
  data() {
    return {
      prompt: false,

      newPassword: '',
      password: '',
      isPwd: true,
      isOk: false,
    }
  },
  methods: {
    verify() {
      if (
        this.password.isEmpty() ||
        this.newPassword.isEmpty() ||
        this.password != this.newPassword
      )
        this.isOk = true
      else this.isOk = false
    },
    onReset() {
      this.password = null
      this.newPassword = null
    },
  },
}
</script>
