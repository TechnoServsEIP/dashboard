<template>
  <div>
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Type your password</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model="tmp"
            autofocus
            @keyup.enter="prompt = false"
            lazy-rules
            :rules="[ val => val && val === password  || 'Please type something']"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Confirm" v-close-popup />
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

      password: 'test',
      tmp: '',
    }
  },
}
</script>
