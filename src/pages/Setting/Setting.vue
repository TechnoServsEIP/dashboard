<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <q-page>
    <div class="q-pa-md doc-container">
      <!-- <h4>My profile</h4>
      <div class="" style="max-width: 40%">
        <user-profile></user-profile>
      </div> -->
      <!-- SCM Integation -->
      <div >
        <h5>SCM</h5>
        <scm-integration :redirect_uri="redirect_uri"></scm-integration>
      </div>
      <!--  Settings  -->
      <h5>Settings</h5>
      <div>
        <div>
          <div class="column ">
            <div class="col">
              <q-card>
                <q-tabs
                  v-model="tab"
                  dense
                  class="text-grey"
                  active-color="primary"
                  indicator-color="primary"
                  align="justify"
                  narrow-indicator
                >
                  <q-tab name="general" label="General"></q-tab>
                  <q-tab name="privacy" label="Privacy"></q-tab>
                </q-tabs>

                <q-separator></q-separator>

                <q-tab-panels v-model="tab" animated>
                  <q-tab-panel name="general">
                    <general-setting></general-setting>
                  </q-tab-panel>

                  <q-tab-panel name="privacy">
                    <privacy-setting></privacy-setting>
                  </q-tab-panel>
                </q-tab-panels>
              </q-card>
            </div>
          </div>
        </div>
      </div>
      <!--  Sever List  -->
      <div></div>
    </div>
  </q-page>
</template>

<script>
import UserProfile from '../../components/Settings/UserProfile.vue'
import GeneralSetting from '../../components/Settings/GeneralSetting.vue'
import PrivacySetting from '../../components/Settings/PrivacySetting.vue'
import ScmIntegration from '../../components/SCMIntegration/ScmIntegration.vue'

export default {
  name: 'Settings',
  components: { UserProfile, GeneralSetting, PrivacySetting, ScmIntegration },
  data() {
    return {
      expanded: false,
      tab: 'general',
      redirect_uri: 'http://localhost:8080/apps/settings',
    }
  },
}
</script>

<style lang="scss" scoped></style>
