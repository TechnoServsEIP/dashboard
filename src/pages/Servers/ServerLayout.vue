<template>
  <div>
    <q-drawer
      show-if-above
      side="left"
      :v-model="true"
      :width="300"
      overlay
      persistent
      content-class="bg-light ts-drawer"
    >
      <q-scroll-area class="fit">
        <q-list>
          <q-item clickable :to="'/apps/server/' + $route.params.id">
              <q-item-section>
                <q-item-label>
                  Dashboard
                </q-item-label>
              </q-item-section>
            </q-item>
          <q-expansion-item
            icon="code"
            label="Code"
            header-class="ts-header-item"
            expand-icon-class="ts-header-item"
            :default-opened="true"
          >
            <q-item clickable :to="{name: 'Resources'}">
              <q-item-section>
                <q-item-label>
                  Resources
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable :to="{name: 'Environment'}">
              <q-item-section>
                <q-item-label>
                  Environment
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable :to="{name: 'Deployments'}">
              <q-item-section>
                <q-item-label>
                  Deployments
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable :to="{name: 'Code'}">
              <q-item-section>
                <q-item-label>
                  Code
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-expansion-item>

          <q-separator></q-separator>

          <q-expansion-item
            icon="build"
            :default-opened="true"
            header-class="ts-header-item"
            expand-icon-class="ts-header-item"
            label="Monitoring"
          >
            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label style="padding-left: 0px">
                  Metrics
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label>
                  Logs
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label>
                  Timeline
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label>
                  Notifications
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-expansion-item>

          <q-separator></q-separator>
          
          <q-expansion-item
            icon="settings"
            label="Configuration"
            header-class="ts-header-item"
            expand-icon-class="ts-header-item"
            :default-opened="true"
          >
            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label style="padding-left: 0px">
                  Domain/SSL
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label>
                  Collaborators
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label>
                  Settings
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click.native="deleteServer">
              <q-item-section>
                <q-item-label>
                  Delete Server
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-expansion-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    
    <router-view class="q-pa-md ts-server-layout"/>
  </div>
</template>

<script>
export default {
  name: "ServerLayout",
  methods: {
    
  }
}
</script>

<style lang="scss">
.ts-header-item {
  color: $primary;
  font-weight: bold;
}
.ts-server-layout {
  padding-left: 320px;
}
</style>
