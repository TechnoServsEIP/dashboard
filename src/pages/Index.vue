<template>
  <div>
    <nav-bar></nav-bar>
    <router-view />
  </div>
  <div class="q-pa-md">
  <q-card class="ts-card" style="width: 40%; margin-left: 30%">
    <form action="https://formspree.io/mwkwkkza" method="POST">
      <q-item class="bg-primary text-white">
        <q-item-section>
          <q-item-label class="text-h5">Having an Issue ?</q-item-label>
          <q-item-label class="text-subtitle2">let's stay in touch &#128526;</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-item>
        <q-item-section>
          <q-item-label>
            Your email:
          </q-item-label>
          <input type="text" name="_replyto"/>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section>
          <q-item-label>
            Title
          </q-item-label>
          <input type="text" name="_title" />
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section>
          <q-item-label>
            Your message:
          </q-item-label>
          <textarea name="message"></textarea>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-card-actions>
        <q-btn color="primary" type="submit">Send</q-btn>
      </q-card-actions>
      <q-item-label>
        If you have further questions join our <a href="https://discord.gg/PBESq3c">Discord server</a>
      </q-item-label>
    </form>
  </q-card>
  </div>
</template>

<script>
import NavBar from "../components/NavBar"

export default {
  name: 'Index',
  components: {
    NavBar
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="scss">

</style>
