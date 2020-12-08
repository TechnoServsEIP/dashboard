<template>
  <div>
    <div class="row">
      <div class="col-2"></div>
      <div class="col m-auto">
        <div
          class="card shadow mr-2 ml-2"
          style="width: 80%"
          :class="type === 'dark' ? 'bg-default' : ''"
        >
          <div
            class="card-header"
            :class="type === 'dark' ? 'bg-transparent' : ''"
          >
            <h3>Invite your friends to join this server !</h3>
            <small>After entering an email, press the enter key</small>
          </div>

          <div class="card-body">
            <div class="row">
              <div class="col">
                <el-input
                  v-model="firstEmail"
                  placeholder="Enter an email"
                  @keyup.enter.native="addToListFirstEmail"
                ></el-input>
              </div>
            </div>
            <!-- <div
              class="row mt-2"
              v-for="elem in inviteCurrentList"
              :key="elem.id"
            >
              <div class="col">
                <el-input
                  v-model="elem.email"
                  placeholder="Enter an email"
                  @keyup.enter.native="addToCurrentList"
                ></el-input>
              </div>
            </div> -->
            <div class="row">
              <div class="col-12 mt-3 text-center">
                <base-button
                  type="success"
                  :disabled="inviteList.length == 0 || submitLoading"
                  @click.prevent="sendEmails()"
                >
                  <half-circle-spinner
                    v-if="submitLoading"
                    :animation-duration="1000"
                    :size="20"
                    color="white"
                  />
                  <strong v-else>Submit</strong>
                </base-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-2"></div>
    </div>
  </div>
</template>

<script>
import { HalfCircleSpinner } from 'epic-spinners'

export default {
  name: 'AppInvite',
  props: {
    type: String,
  },
  components: {
    HalfCircleSpinner,
  },
  data() {
    return {
      containerId: null,
      inviteList: [],
      inviteCurrentList: [],
      inviteEmail: '',
      firstEmail: '',
      submitLoading: false,
    }
  },
  created() {
    this.$store.state.client.Docker.list(this.$store.state.user.ID.toString())
      .then((response) => {
        this.containerId = response.list.filter((v) => {
          return v.ID == this.$route.params.id
        })[0].id_docker
        if (this.containerId != null) {
          this.getGameServerProperties()
        } else {
          throw 'Error => no such container id'
        }
      })
      .catch((e) => {
        console.log(e)
      })
  },
  methods: {
    addToListFirstEmail() {
      this.inviteList.push({
        id: this.inviteList.length + 1,
        email: this.firstEmail,
      })
      this.inviteCurrentList.push({
        id: this.inviteCurrentList.length + 1,
        email: '',
      })
    },
    addToCurrentList() {
      this.inviteCurrentList.push({
        id: this.inviteCurrentList.length + 1,
        email: this.inviteEmail,
      })
      this.inviteEmail = ''
    },
    sendEmails() {
      this.submitLoading = true
      let obj = [...this.inviteCurrentList, ...this.inviteList]
      obj = obj.filter((v) => {
        return v.email != ''
      })

      this.$axios
        .post(
          '/invitation',
          {
            user_id: this.$store.state.user.ID.toString(),
            container_id: this.containerId,
            recipient: obj[0].email,
          },
          {
            headers: {
              authorization: `Bearer ${this.$store.state.user.token}`,
            },
          },
        )
        .then((response) => {
          this.submitLoading = false
          this.$notify({
            title: 'Invitations sent !',
            type: 'success',
          })
          console.log(response)
        })
        .catch((e) => {
          this.submitLoading = false
          this.$notify({
            title: 'Invitations failed !',
            type: 'danger',
          })
          console.log(e)
        })
    },
  },
}
</script>
