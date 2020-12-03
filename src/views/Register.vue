<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-body card-login px-lg-5 pt-lg-5">
          <div class="text-center text-muted mb-4">
            <small>Register to the dashboard</small>
          </div>

          <div v-if="error.isError">
            <base-alert type="danger" dismissible>
              <span class="alert-inner--text">
                <strong>Error !</strong>
                {{ error.message }}
              </span>
              <button
                type="button"
                class="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </base-alert>
          </div>

          <form role="form">

            <small class="error" v-if="email && !$v.email.required">Email is required.</small>
            <base-input
              class="input-group-alternative mb-3"
              :class="{ 'form-group--error': $v.email.$error }"
              placeholder="Email"
              type="email"
              addon-left-icon="ni ni-email-83"
              v-model="email"
            ></base-input>

            <base-input
              class="input-group-alternative"
              placeholder="Confirm your email"
              type="email"
              addon-left-icon="ni ni-email-83"
              v-model="confEmail"
            ></base-input>

            <div v-if="password && (!$v.password.minLength || !$v.password.containsUppercase
              || !$v.password.containsLowercase || !$v.password.containsNumber || !$v.password.containsSpecial)"
              class="list-group-heading mb-8">
              <small  :class="{'text-red': !$v.password.minLength, 'text-green': $v.password.minLength}">
                Password must have at least {{$v.password.$params.minLength.min}} letters.
              </small>
              <small :class="{'text-red': !$v.password.containsUppercase, 'text-green': $v.password.containsUppercase}">
                Password must contain at least 1 upper letter.
              </small>
              <small :class="{'text-red': !$v.password.containsLowercase, 'text-green': $v.password.containsLowercase}">
                Password must contain at least 1 lower letter.
              </small>
              <small :class="{'text-red': !$v.password.containsNumber, 'text-green': $v.password.containsNumber}">
                Password must have at least 1 number.
              </small>
              <small :class="{'text-red': !$v.password.containsSpecial, 'text-green': $v.password.containsSpecial}">
                Password must have at least 1 special character.
              </small>
            </div>

            <base-input
              class="input-group-alternative my-3"
              :class="{ 'form-group--error': $v.password.$error }"
              placeholder="Password"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="password"
            ></base-input>

            <base-input
              class="input-group-alternative mb-3"
              placeholder="Confirm your password"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="confPassword"
            ></base-input>

            <div class="mt-2 ml-1 row" style="align-items: center">
              <BaseCheckbox v-model="isTermsOfUseAccepted" inline :checked="isTermsOfUseAccepted" />
              <small>Please accept our 
                <router-link to="/terms-of-use" class="">
                  <span class="text-underline">terms of use</span>
                </router-link>
              </small>
            </div>

            <div class="text-center">
              <base-button
                :disabled="
                  $v.email.$invalid ||
                    $v.password.$invalid ||
                    this.email !== this.confEmail ||
                    this.password !== this.confPassword
                "
                style="width: 100%"
                type="primary"
                class="mt-4"
                v-on:click.prevent="register()"
                v-on:keyup.enter="register()"
              >
                <half-circle-spinner
                  v-if="isRegisterLoading"
                  :animation-duration="1000"
                  :size="20"
                  color="white"
                />
                <strong v-else>
                  <i
                    class="fas fa-sign-in-alt"
                    style="padding-right: 10px;"
                  ></i>
                  Create account
                </strong>
              </base-button>

              <div class="text-center mb-3 mt-2">
                <base-button
                  type="secondary"
                  style="width: 100%"
                  icon="fab fa-github"
                  @click.prevent="loginGithub()"
                >
                  Create account using GitHub
                </base-button>
              </div>
            </div>
          </form>
          <div class="text-center mt-3">
            <!-- <div class="col-6">
              <a href="#" class="">
                <small>Forgot password?</small>
              </a>
            </div> -->
            <!-- <div class="col-6 text-right"> -->
              <router-link to="/login" class="">
                <small>Login into your account</small>
              </router-link>
            <!-- </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { required, minLength } from "vuelidate/lib/validators";
import { HalfCircleSpinner } from "epic-spinners";
import { Technoservs } from "technoservs.js";

import BaseCheckbox from '@/components/BaseCheckbox'

export default {
  name: "register",
  components: {
    HalfCircleSpinner,
    BaseCheckbox
  },
  data() {
    return {
      email: "",
      confEmail: "",
      password: "",
      confPassword: "",
      isRegisterLoading: false,
      isTermsOfUseAccepted: false,
      error: {
        isError: false,
        message: ""
      }
    };
  },
  validations: {
    email: {
      required
    },
    password: {
      required,
      minLength: minLength(8),
      containsUppercase: function(value) {
        return /[A-Z]/.test(value)
      },
      containsLowercase: function(value) {
        return /[a-z]/.test(value)
      },
      containsNumber: function(value) {
        return /[0-9]/.test(value)
      },
      containsSpecial: function(value) {
        return /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/.test(value)
      }
    }
  },
  methods: {
    loginGithub() {
      let githubClientID = "9e486adc90668a6818eb";
      window.open(
        `https://github.com/login/oauth/authorize?client_id=${githubClientID}&redirect_uri=https://technoservs.ichbinkour.eu/auth/github`
      );
    },
    register() {
      if (this.email !== this.confEmail) {
        this.error = {
          isError: true,
          message: "Emails needs to be the same"
        };
      } else if (this.password !== this.confPassword) {
        this.error = {
          isError: true,
          message: "Passwords needs to be the same"
        };
      } else if (!this.isTermsOfUseAccepted) {
        this.error = {
          isError: true,
          message: "You need to validate our terms of use"
        };
      } else {
        this.isRegisterLoading = true
        const technoservs = require("technoservs.js");
        technoservs
          .register(this.email, this.password)
          .then(response => {
            if (response.status === false) {
              this.error = {
                isError: true,
                message: response.message
              };
              this.isRegisterLoading = false;
            } else {
              this.$notify({
                type: "success",
                title:
                  "Account correctly created ! Check your emails to activate your account 😊"
              });
            }
            this.isRegisterLoading = false;
          })
          .catch(e => {
            this.error = {
              isError: true,
              message: e._message
            };
            this.isRegisterLoading = false;
          });
      }
    }
  }
};
</script>
<style scoped>
.half-circle-spinner {
  margin: auto;
}
</style>
