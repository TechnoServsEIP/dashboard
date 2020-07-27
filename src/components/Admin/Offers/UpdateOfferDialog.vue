<template>
  <q-dialog v-model="visible" persistent>
    <div class="my-card">
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6">Update Plan {{ offer.name }}</div>
        </q-card-section>
        <q-separator inset></q-separator>

        <q-card-separator />

        <q-card-section>
          <div>
            <q-btn
              outline
              class="full-width"
              color="secondary"
              label="Update"
              @click="update(plan)"
            />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-dialog>
</template>
<script>
export default {
  name: 'AddOfferDialog',
  props: {
    visible: { type: Boolean },
    method: { type: Function },
    offer: { type: Object },
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
    update: function() {
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

<style lang="scss" scoped>
.card-plan {
  width: 100%;
  max-width: 200px;
}
.bold {
  font-weight: bold;
  font-size: medium;
}
.price {
  color: $primary;
  font-size: medium;
}
.subText {
  color: lightgrey;
  font-size: small;
}
.marginPlayer {
  margin-top: 2%;
}
.link {
  background: none;
  border: none;
  color: $primary;
}
</style>
