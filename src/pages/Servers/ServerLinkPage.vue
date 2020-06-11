<template>
  <q-page>
    <div class="row">
      <q-card dark class="ts-card-hello bg-grey-9">
        <q-card-section>
          <div class="text-h6">Link to your GitLab</div>
        </q-card-section>

        <q-separator inset></q-separator>

        <div class="">
          <q-card-section>
            <div class="">
              Below you can link your Gitlab or your self-hosted Git
              repositories.
            </div>
          </q-card-section>
          <div style="padding:10px">
            <q-btn
              unelevated
              class="btn-secondary"
              label="Link with GitLab"
              @click="dialog = true"
            ></q-btn>
          </div>
        </div>
      </q-card>
    </div>

    <q-dialog
      v-model="dialog"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Link to your GitLab</div>
        </q-card-section>

        <q-separator inset />

        <q-card-section class="scroll">
          <q-stepper v-model="step" ref="stepper" color="primary" animated>
            <q-step
              :name="1"
              title="Connection"
              icon="settings"
              :done="step > 1 && choosen != null"
              :error="choosen == null"
            >
              <div class="text-center">
                <div style="padding-bottom: 24px">
                  <div class="text-h6 ">
                    Connect to your GitLab
                  </div>
                  <div class="">
                    Your about to deploy your application with GitLab
                  </div>
                  <div class="">
                    Choose one of your services to deploy your application on
                  </div>
                </div>

                <q-separator style="margin-bottom: 24px" />

                <div class="row" style="justify-content:space-between">
                  <q-btn
                    v-if="!gitlabConnected"
                    label="Connect with GitLab"
                    color="purple"
                    v-on:click="connectGitlab"
                  />
                  <div v-else>
                    <q-btn
                      :label="
                        choosen === 'gitlab'
                          ? 'Gitlab choosen'
                          : 'Choose GitLab'
                      "
                      :color="choosen === 'gitlab' ? 'green' : 'primary'"
                      v-on:click="getGroupsGitlab"
                    />
                  </div>
                  <q-btn
                    v-if="!selfHostedConnected"
                    label="Connect with Self-hosted GitLab"
                    color="purple"
                    v-on:click="selfHostedVisible = true"
                  />
                  <div v-else>
                    <q-btn
                      :label="
                        choosen === 'self_hosted'
                          ? 'Self hosted choosen'
                          : 'Choose Self-hosted'
                      "
                      :color="choosen === 'self_hosted' ? 'green' : 'primary'"
                      v-on:click="getGroupsSelfHosted"
                    />
                  </div>
                </div>
              </div>
            </q-step>

            <q-step
              :name="2"
              title="Groups"
              icon="group"
              :done="step > 2"
              :error="choosenGroupId === null"
            >
              <div style="max-height: 50vh">
                <div class="text-h6 text-center">Choose your group</div>

                <q-separator style="margin-bottom: 24px" />

                <div v-if="choosen == null">
                  Please select a Service before choosing a group
                </div>

                <div v-else class="row wrap">
                  <div class="col-3 text-center group-container">
                    <q-img
                      v-on:click="selectGroup(0)"
                      v-bind:class="{ 'active-group': choosenGroupId == 0 }"
                      :src="user.avatar_url"
                      spinner-color="white"
                      class="group-image"
                    />
                    <div class="text-center">
                      {{ user.name }}
                    </div>
                  </div>
                  <div
                    v-for="item in groups"
                    :key="item.id"
                    class="col-3 text-center group-container"
                  >
                    <q-img
                      v-on:click="selectGroup(item.id)"
                      v-bind:class="{
                        'active-group': choosenGroupId == item.id,
                      }"
                      :src="item.avatar_url"
                      spinner-color="white"
                      class="group-image"
                    />
                    <div class="text-center">
                      {{ item.name }}
                    </div>
                  </div>
                </div>
              </div>
            </q-step>

            <q-step :name="3" title="Repositories" icon="folder">
              <div style="max-height: 50vh">
                <div class="text-h6 text-center">Choose your Repository</div>

                <q-separator style="margin-bottom: 24px" />
                <div v-if="choosenGroupId == null">
                  Please select a group before choosing a Repository
                </div>
                <q-list v-else bordered separator>
                  <div v-if="choosenGroupId == user.id">
                    <q-item
                      clickable
                      v-ripple
                      v-for="item in user.repositories"
                      :key="item.id"
                      v-on:click="selectRepository(item.id)"
                    >
                      <q-item-section>
                        <q-item-label>{{ item.name }}</q-item-label>
                        <q-item-label caption lines="2">{{
                          item.description
                        }}</q-item-label>
                      </q-item-section>
                      <q-item-section
                        v-show="repositoryChoosen == item.id"
                        side
                      >
                        <q-icon name="check" color="green" />
                      </q-item-section>
                    </q-item>
                  </div>
                  <div v-else>
                    <q-item
                      clickable
                      v-ripple
                      v-for="item in groups.find(
                        (item) => item.id === choosenGroupId,
                      ).repositories"
                      :key="item.id"
                      v-on:click="selectRepository(item.id)"
                    >
                      <q-item-section>
                        <q-item-label>{{ item.name }}</q-item-label>
                        <q-item-label caption lines="2">{{
                          item.description
                        }}</q-item-label>
                      </q-item-section>
                      <q-item-section
                        v-show="repositoryChoosen == item.id"
                        side
                      >
                        <q-icon name="check" color="green" />
                      </q-item-section>
                    </q-item>
                  </div>
                </q-list>
              </div>
            </q-step>
          </q-stepper>
        </q-card-section>

        <q-separator />

        <q-card-actions align="between">
          <div>
            <q-btn
              label="Close"
              color="primary"
              v-close-popup
              @click="dialog = false"
            />
          </div>
          <div>
            <q-btn
              v-if="step > 1"
              flat
              color="primary"
              @click="$refs.stepper.previous()"
              label="Back"
              class="q-ml-sm"
            />
            <q-btn
              v-if="step < 3"
              @click="$refs.stepper.next()"
              color="primary"
              label="Continue"
            />
            <q-btn
              v-if="step === 3"
              color="primary"
              v-close-popup
              label="Finish"
              v-on:click="finishSteps"
              :disable="
                choosenGroupId === null ||
                  choosen === null ||
                  repositoryChoosen === null
              "
            />
          </div>
        </q-card-actions>
      </q-card>
      <self-hosted-dialog
        @addTokenParent="connectSelfHosted"
        :visible="selfHostedVisible"
        @close="selfHostedVisible = false"
      />
    </q-dialog>
  </q-page>
</template>

<script>
import { authGitlab, getTokenGitlab } from 'src/functions/authGitlab'
import SelfHostedDialog from 'src/components/SelfHostedGitlab/SelfHostedDialog'
import {
  getTokenSelfHosted,
  authSelfHosted,
} from 'src/functions/authSelfHosted'

export default {
  components: {
    SelfHostedDialog,
  },
  data() {
    return {
      dialog: false,
      user: {
        id: 0,
        name: 'Jeremie Bruhwiler',
        avatar_url:
          'https://gitlab.sysroot.ovh/uploads/-/system/user/avatar/11/avatar.png',
        repositories: [
          {
            id: 0,
            name: 'EPITECH_TEK2_MEMORY',
            description: 'Epitech Memory Tek2 Project',
          },
          {
            id: 1,
            name: 'MINECRAFT_SERVER_1',
            description: 'First minecraft repository',
          },
          {
            id: 2,
            name: 'MINECRAFT_SERVER_2',
            description: 'Second minecraft repository',
          },
          {
            id: 3,
            name: 'DOFUS_SERVER',
            description: 'Dofus repository',
          },
          {
            id: 4,
            name: 'HYTALE_SERVER',
            description: 'Hytale repo',
          },
        ],
      },
      groups: [
        {
          id: 97,
          name: 'Epitech MSc',
          avatar_url:
            'https://gitlab.sysroot.ovh/uploads/-/system/group/avatar/97/msc.jpg',
          repositories: [
            {
              id: 0,
              name: 'Script nul',
              description: 'Second minecraft repository',
            },
            {
              id: 1,
              name: 'Script nul',
            },
            {
              id: 2,
              name: 'Script nul',
            },
          ],
        },
        {
          id: 99,
          name: 'TechnoServs',
          avatar_url:
            'https://gitlab.sysroot.ovh/uploads/-/system/group/avatar/97/msc.jpg',
          repositories: [
            {
              id: 0,
              name: 'MINECRAFT',
              description: 'Minecraft Server',
            },
            {
              id: 1,
              name: 'DOFUS',
            },
            {
              id: 2,
              name: 'Test_project',
            },
          ],
        },
      ],
      gitlabConnected: false,
      selfHostedConnected: false,
      selfHostedVisible: false,

      choosen: null,
      selfHostedToken: null,
      gitlabToken: null,
      step: 1,

      choosenGroupId: null,

      repositoryChoosen: null,

      redirect_uri: 'http://localhost:8080/link-page',
    }
  },
  mounted() {
    // TODO: Check with server first if he already connect to gitlab
    // Also check if self hosted already connected
    // Check if gitlab or self hosted with state
    if (this.$route.query.code && this.$route.query.state == '12345') {
      getTokenGitlab(this.redirect_uri, this.$route.query.code)
        .then(() => {
          this.gitlabConnected = true
          this.dialog = true
          this.step = 1
        })
        .catch((err) => console.error(err))
    } else if (this.$route.query.state == '1234') {
      getTokenSelfHosted(this.redirect_uri, this.$route.query.code)
        .then(() => {
          this.selfHostedConnected = true
        })
        .catch((err) => console.error(err))
    }
  },
  methods: {
    finishSteps: function() {
      if (this.step === 3) {
        this.dialog = false
        this.step = 1
        // TODO: Send to API All the informations
        this.choosen = null
        this.repositoryChoosen = null
        this.choosenGroupId = null
      }
    },
    connectGitlab: function() {
      // TODO: get token from Gitlab
      authGitlab(this.redirect_uri, '12345')
    },
    connectSelfHosted: function(address, token) {
      // TODO: get token of self hosted
      authSelfHosted(this.redirect_uri, '1234', address)
      this.selfHostedConnected = true
    },
    getGroupsGitlab: function() {
      if (this.choosen === 'gitlab') {
        this.choosen = null
      } else {
        this.choosen = 'gitlab'
      }
      this.repositoryChoosen = null
      this.choosenGroupId = null
      // TODO: get all groups from gitlab
    },
    getGroupsSelfHosted: function() {
      if (this.choosen === 'self_hosted') {
        this.choosen = null
      } else {
        this.choosen = 'self_hosted'
      }
      this.repositoryChoosen = null
      this.choosenGroupId = null
      // TODO: get all groups from self hosted gitlab
    },
    selectGroup: function(id) {
      if (this.choosenGroupId == id) {
        this.choosenGroupId = null
      } else {
        this.choosenGroupId = id
      }
      this.repositoryChoosen = null
    },
    selectRepository: function(id) {
      if (this.repositoryChoosen === id) this.repositoryChoosen = null
      else this.repositoryChoosen = id
    },
  },
}
</script>

<style lang="scss">
.ts-card-hello {
  margin: 1em;
  width: 100%;
}
.group-container {
  padding-left: 10px;
  padding-right: 10px;
}
.group-image {
  height: 140px;
  max-width: 150px;
  border-radius: 30px;
}
.active-group {
  box-shadow: 0 0 2px 4px rgba(0, 140, 186, 0.5);
}
.q-img:hover {
  box-shadow: 0 0 2px 4px rgba(0, 140, 186, 0.5);
}
</style>
