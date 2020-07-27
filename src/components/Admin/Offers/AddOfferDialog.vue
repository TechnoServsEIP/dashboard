<template>
  <q-dialog v-model="visible" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">New User</div>
      </q-card-section>

      <q-separator inset></q-separator>
      <form
        @submit.prevent.stop="submitForm"
        @delete.prevent.stop="onReset"
        class="q-gutter-md"
      >
        <q-card-section class="q-pt-none">
          <q-input
            bottom-slots
            v-model="email"
            type="email"
            label="Email"
            dense
            autofocus
          />
          <q-input
            bottom-slots
            label="Password"
            v-model="password"
            :type="isPwd ? 'password' : 'text'"
            dense
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <q-select v-model="role" :options="roles" label="Role" />
        </q-card-section>

        <q-card-actions
          style="justify-content:space-between"
          class="text-primary"
        >
          <q-btn flat type="reset" label="Reset" color="red" @click="onReset" />
          <div style="align-items:right">
            <q-btn
              flat
              label="Cancel"
              @click="
                () => {
                  onReset()
                  closeModal()
                }
              "
            />
            <q-btn
              flat
              type="submit"
              label="Add"
              :disable="email === '' || password === ''"
            />
          </div>
        </q-card-actions>
      </form>
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  name: 'AddOfferDialog',
  props: {
    visible: { type: Boolean },
    method: { type: Function },
  },
  computed: {
    show: {
      get() {
        return this.visible
      },
      set(value) {
        if (!value) {
          this.$emit('close')
        }
      },
    },
  },
  data() {
    return {
      email: '',
      password: '',
      role: 'user',
      isPwd: true,
      roles: ['user', 'admin'],
    }
  },
  methods: {
    submitForm: function() {
      this.$emit('close')
      this.$emit('modify')
      this.onReset()
    },
    onReset: function() {
      this.email = ''
      this.password = ''
      this.role = 'user'
    },
    closeModal: function() {
      this.$emit('close')
    },
  },
}
</script>
