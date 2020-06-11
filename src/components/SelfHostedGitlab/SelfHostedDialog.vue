<template>
  <q-dialog v-model="show" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Add your Personal Access Tokens</div>
        <div class="text-h6">Setup your self-hosted GitLab</div>
      </q-card-section>

      <q-separator inset></q-separator>

      <form
        @submit.prevent.stop="addToken"
        @delete.prevent.stop="onReset"
        class="q-gutter-md"
      >
        <q-card-section class="q-pt-none">
          <q-input
            bottom-slots
            v-model="address"
            label="Address"
            dense
            autofocus
          >
            <template v-slot:append>
              <q-icon
                name="file_copy"
                @click="text = pasteFunctionAddress()"
                class="cursor-pointer"
                style="color: #027BE3"
              >
                <q-tooltip>
                  Paste
                </q-tooltip>
              </q-icon>
            </template>

            <template v-slot:hint>
              Enter your GitLab URL
            </template>
          </q-input>
          <q-input bottom-slots v-model="token" label="Token" dense>
            <template v-slot:append>
              <q-icon
                name="file_copy"
                @click="text = pasteFunctionToken()"
                class="cursor-pointer"
                style="color: #027BE3"
              >
                <q-tooltip>
                  Paste
                </q-tooltip>
              </q-icon>
            </template>

            <template v-slot:hint>
              Enter your access token
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions
          style="justify-content:space-between"
          class="text-primary"
        >
          <q-btn
            flat
            type="delete"
            label="Reset"
            color="red"
            @click="onReset"
          />
          <div style="align-items:right">
            <q-btn
              flat
              type="reset"
              label="Cancel"
              @click.stop="show = false"
            />
            <q-btn
              flat
              type="submit"
              label="Link"
              @click.stop="show = false"
              :disable="token === '' && address === ''"
            />
          </div>
        </q-card-actions>
      </form>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'SelfHostedDialog',
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
      token: '',
      address: '',
    }
  },
  methods: {
    onReset: function() {
      ;(this.token = ''), (this.address = '')
    },
    pasteFunctionAddress: function() {
      navigator.clipboard
        .readText()
        .then((text) => {
          console.log('Pasted content: ', text)
          this.address = text
        })
        .catch((err) => {
          console.error('Failed to read clipboard contents: ', err)
        })
    },
    pasteFunctionToken: function() {
      navigator.clipboard
        .readText()
        .then((text) => {
          console.log('Pasted content: ', text)
          this.token = text
        })
        .catch((err) => {
          console.error('Failed to read clipboard contents: ', err)
        })
    },
    addToken: function() {
      this.show = false
      this.$emit('addTokenParent', this.address, this.token)
    },
  },
}
</script>
