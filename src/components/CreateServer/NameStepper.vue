<template>
  <q-page>
    <div class="q-pa-md" style="max-width: 350px">
      <q-form
        @submit.prevent.stop="onSubmit"
        @reset.prevent.stop="onReset"
        class="q-gutter-md"
      >
        <div>
        <q-input
          ref="name"
          square
          v-model="name"
          label="Your Server Name..."
          lazy-rules
          :rules="[(val) => (val && val.length > 4) || 'Type something at least 4 character']"
        />
        <!--v-on:keyup="enterCase"-->

          <q-btn
            label="Reset"
            type="reset"
            color="secondary"
            flat
            class="float-right"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'NameStepper',
  components: {},
  data() {
    return {
      name: null,
      accept: false,
    }
  },

  methods: {
    onReset() {
      this.name = null

      this.$refs.name.resetValidation()
    },
    onSubmit() {
      this.$refs.name.validate()

      if (this.$refs.name.hasError) {
        this.formHasError = true
      } else {
        alert({
          icon: 'done',
          color: 'positive',
          message: 'Submitted',
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
