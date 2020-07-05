<template>
  <div>
    <div class="textParam">Email</div>
    <q-input
      square
      filled
      class="fieldGeneral"
      v-model="newEmail"
      type="email"
      :placeholder="currentUser.email"
    >
    </q-input>
    <q-btn
      :disable="!newEmail"
      class="q-mt-md"
      color="primary"
      label="Update"
      @click="changeEmail"
    />

    <q-separator color="secondary" class="sep" inset />

    <div class="textParam">Role</div>
    <q-select v-model="roleSelect" :options="roles" />
    <q-btn
      class="q-mt-md"
      color="primary"
      label="Change Role"
      @click="changeEmail"
    />

    <q-separator color="secondary" class="sep" inset />

    <div class="textParam">Reset password</div>
    <q-input
      square
      filled
      class="fieldGeneral"
      label="Password"
      v-model="password1"
      :type="isPwd ? 'password' : 'text'"
      :rules="[(v) => v.length >= 6 || 'Password too short']"
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
      :rules="[(v) => v == password1 || 'Password are different']"
    >
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
    </q-input>

    <q-btn
      :loader="changePassLoader"
      :disable="
        password1 == password2 &&
        password1 &&
        password2 &&
        password1.length >= 6
          ? false
          : true
      "
      class="q-mt-md"
      color="primary"
      label="Update password"
      @click="changePassword"
    />

    <q-separator color="secondary" class="sep" inset />

    <div class="textParam">Account Handling</div>
    <div style="padding: 3%">
      <q-checkbox left-label v-model="activation" label="Activate" />
    </div>
    <div>
      <q-btn
        class="q-mt-md"
        type="delete"
        color="red"
        label="Delete User"
        @click="deleteUser"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserGeneralInfo',
  props: {
    currentUser: { type: Object },
  },
  created() {
    this.roleSelect = this.currentUser.Role
    this.activation = this.currentUser.Activate
  },
  data() {
    return {
      newEmail: null,
      password1: '',
      password2: '',
      isPwd: true,
      changePassLoader: false,
      roles: ['admin', 'user'],
      roleSelect: '',
      activation: true,
    }
  },
}
</script>
