<template>
  <q-expansion-item>
    <template v-slot:header>
      <q-item-section avatar top>
        <q-avatar v-if="success" icon="done" color="green" text-color="white" />
        <q-avatar v-else icon="clear" color="red" text-color="white" />
      </q-item-section>

      <q-item-section top>
        <q-item-label lines="1">
          <span v-if="success" class="text-weight-medium text-green"
            >Success</span
          >
          <span v-else class="text-weight-medium text-red">Failed</span>
          <span> - {{ description }}</span>
        </q-item-label>
        <q-item-label caption lines="1">
          {{ reference }}
        </q-item-label>
      </q-item-section>

      <q-item-section side>
        <div class="q-gutter-xs">
          <span class="">{{ day }}</span>
        </div>
      </q-item-section>

      <q-item-section side>
        <div class="q-gutter-xs">
          <span class="text-weight-medium">{{ stamp }} ago</span>
        </div>
      </q-item-section>
    </template>

    <q-card class="">
      <q-card-section>
        <div
          class="mode-console text-white bg-grey-10"
          style="white-space: pre-line;"
        >
          {{ console }}
        </div>
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script>
export default {
  name: 'Deployment',
  props: {
    success: Boolean,
    reference: String,
    duration: Number,
    description: String,
    day: String,
    time: String,
    stamp: String,
    console: String,
  },
  data() {
    return {
      expanded: false,
    }
  },
}
</script>

<style>
.mode-console {
  padding: 20px;
  background-color: 'black';
}
</style>
