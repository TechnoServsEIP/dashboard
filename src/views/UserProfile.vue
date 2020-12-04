<template>
  <div>
    <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
      <div class="main-content">
        <dashboard-navbar></dashboard-navbar>
      </div>
    </div>
    <base-header
      class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
      style="min-height: 200px"
    >
      <!-- Mask -->
      <span class="mask bg-gradient-default opacity-8"></span>
      <!-- Header container -->
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row mb-3">
        <div class="col">
          <router-link
            to="/"
            style="color: white; align-items: center; display: flex"
          >
            <i class="ni ni-bold-left mr-1"></i>
            Dashboard
          </router-link>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <card shadow type="secondary">
            <div slot="header" class="bg-white border-0">
              <div class="row align-items-center">
                <div class="col-8">
                  <h1 class="mb-0">My account</h1>
                </div>
              </div>
            </div>
            <template>
              <form @submit.prevent>
                <h6 class="heading-small text-muted mb-4">User information</h6>
                <div>
                  <div class="row mt-4">
                    <div class="col-lg-6">
                      <h4>Your email</h4>
                      <el-input
                        :value="$store.state.user.email"
                        placeholder="Please input password"
                        disabled
                      ></el-input>
                    </div>
                  </div>
                  <h4 class="mt-4">Change your password</h4>
                  <div class="row">
                    <div class="col-lg-6">
                      <el-input
                        placeholder="Please input password"
                        v-model="newPassword"
                        show-password
                      ></el-input>
                      <el-input
                        class="mt-2"
                        placeholder="Confirm password"
                        v-model="newPasswordConfirm"
                        show-password
                      ></el-input>
                      <div class="row mt-4">
                        <div class="col-lg-6">
                          <base-button
                            type="primary"
                            size="sm"
                            :disabled="isPasswordValid"
                            @click="changePassword()"
                            >Change password</base-button
                          >
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div
                        v-if="newPassword && isPasswordValid"
                        class="list-group-heading"
                      >
                        <div>
                          <small
                            :class="[
                              $v.newPassword.minLength
                                ? 'text-green'
                                : 'text-red',
                            ]"
                          >
                            Password must have at least
                            {{ $v.newPassword.$params.minLength.min }} letters.
                          </small>
                        </div>
                        <div>
                          <small
                            :class="[
                              $v.newPassword.containsUppercase
                                ? 'text-green'
                                : 'text-red',
                            ]"
                          >
                            Password must contain at least 1 upper letter.
                          </small>
                        </div>
                        <div>
                          <small
                            :class="[
                              $v.newPassword.containsLowercase
                                ? 'text-green'
                                : 'text-red',
                            ]"
                          >
                            Password must contain at least 1 lower letter.
                          </small>
                        </div>
                        <div>
                          <small
                            :class="[
                              $v.newPassword.containsNumber
                                ? 'text-green'
                                : 'text-red',
                            ]"
                          >
                            Password must have at least 1 number.
                          </small>
                        </div>
                        <div>
                          <small
                            :class="[
                              $v.newPassword.containsSpecial
                                ? 'text-green'
                                : 'text-red',
                            ]"
                          >
                            Password must have at least 1 special character.
                          </small>
                        </div>
                        <div>
                          <small
                            :class="[
                              this.newPassword === this.newPasswordConfirm
                                ? 'text-green'
                                : 'text-red',
                            ]"
                          >
                            Passwords must be the same.
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </template>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardNavbar from '../layout/DashboardNavbar'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'user-profile',
  components: {
    DashboardNavbar,
  },
  data() {
    return {
      newPassword: '',
      newPasswordConfirm: '',
    }
  },
  validations: {
    newPassword: {
      required,
      minLength: minLength(8),
      containsUppercase: function (value) {
        return /[A-Z]/.test(value)
      },
      containsLowercase: function (value) {
        return /[a-z]/.test(value)
      },
      containsNumber: function (value) {
        return /[0-9]/.test(value)
      },
      containsSpecial: function (value) {
        return /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/.test(value)
      },
    },
  },
  computed: {
    isPasswordValid() {
      return (
        !this.$v.newPassword.minLength ||
        !this.$v.newPassword.containsUppercase ||
        !this.$v.newPassword.containsLowercase ||
        !this.$v.newPassword.containsNumber ||
        !this.$v.newPassword.containsSpecial ||
        this.newPassword !== this.newPasswordConfirm
      )
    },
  },
  methods: {
    changePassword() {
      if (!this.isPasswordValid) {
        this.$axios
          .post(
            '/user/resetpassword',
            {
              email: this.$store.state.user.email,
              password: this.newPassword,
            },
            {
              headers: {
                authorization: `Bearer ${this.$store.state.user.token}`,
              },
            },
          )
          .then((response) => {
            if (response.data.status) {
              this.$store.commit('setUser', null)
              this.$store.commit('setClient', null)
              this.$router.push('/login')
            }
          })
          .catch((e) => {
            console.log(e)
          })
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.heading-small {
  font-size: 1rem;
}
</style>
