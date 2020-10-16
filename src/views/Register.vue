<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-body px-lg-5 pt-lg-5">
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
            <base-input
              class="input-group-alternative mb-3"
              placeholder="Email"
              type="email"
              addon-left-icon="ni ni-email-83"
              v-model="email"
            ></base-input>

            <base-input
              class="input-group-alternative mb-3"
              placeholder="Confirm your email"
              type="email"
              addon-left-icon="ni ni-email-83"
              v-model="confEmail"
            ></base-input>

            <base-input
              class="input-group-alternative"
              placeholder="Password"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="password"
            ></base-input>

            <base-input
              class="input-group-alternative"
              placeholder="Confirm your password"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="confPassword"
            ></base-input>

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
                class="my-4"
                icon="fas fa-sign-in-alt"
                v-on:click.prevent="register()"
                v-on:keyup.enter="register()"

              >
                <half-circle-spinner
                  v-if="isRegisterLoading"
                  :animation-duration="1000"
                  :size="20"
                  color="white"
                />
                <strong v-else>Create account</strong>
              </base-button>

              <div class="text-center mb-3">
                <base-button type="secondary" icon="fab fa-github" @click.prevent="loginGithub()">
                  Github
                </base-button>
              </div>
            </div>
          </form>
          <div class="row mt-3">
            <div class="col-6">
              <a href="#" class="">
                <small>Forgot password?</small>
              </a>
            </div>
            <div class="col-6 text-right">
              <router-link to="/login" class="">
                <small>Login into your account</small>
              </router-link>
            </div>
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

export default {
  name: "register",
  components: {
    HalfCircleSpinner,
  },
  data() {
    return {
      email: "",
      confEmail: "",
      password: "",
      confPassword: "",
      isRegisterLoading: false,
      error: {
        isError: false,
        message: "",
      },
    };
  },
  validations: {
    email: {
      required,
    },
    password: {
      required,
      minLength: minLength(6),
    },
  },
  methods: {
    loginGithub() {
      let githubClientID = "9e486adc90668a6818eb";
      window.open(
        `https://github.com/login/oauth/authorize?client_id=${githubClientID}&redirect_uri=https://technoservs.ichbinkour.eu/auth/github`
      );
    },
    register() {
      this.isRegisterLoading = true;
      if (this.email !== this.confEmail) {
        this.error = {
          isError: true,
          message: "Emails needs to be the same",
        };
      } else if (this.password !== this.confPassword) {
        this.error = {
          isError: true,
          message: "Passwords needs to be the same",
        };
      } else {
        const technoservs = require("technoservs.js");
        technoservs
          .register(this.email, this.password)
          .then((response) => {
            if (response.status === false) {
              this.error = {
                isError: true,
                message: response.message,
              };
              this.isRegisterLoading = false;
            } else {
              this.$notify({
                type: "success",
                title:
                  "Account correctly created ! Check your emails to activate your account 😊",
              });
            }
            this.isRegisterLoading = false;
          })
          .catch((e) => {
            this.error = {
              isError: true,
              message: e._message,
            };
            this.isRegisterLoading = false;
          });
      }
    },
  },
};
</script>
<style scoped>
.half-circle-spinner {
  margin: auto;
}
</style>
