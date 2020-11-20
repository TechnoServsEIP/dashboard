<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-body px-lg-5 pt-lg-5">
          <div class="text-center text-muted mb-4">
            <small>Sign in to the dashboard</small>
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

          <form type="submit" role="form">
            <base-input
              class="input-group-alternative mb-3"
              placeholder="Email"
              addon-left-icon="ni ni-email-83"
              v-model.trim="email"
            ></base-input>

            <base-input
              class="input-group-alternative"
              placeholder="Password"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="password"
              v-on:keyup.enter="loginUser"
              :error="errorMsg"
            ></base-input>

            <div class="text-center">
              <base-button
                v-on:click.prevent="loginUser"
                v-on:keyup.enter="loginUser"
                type="primary"
                class="my-2 container"
                :disabled="$v.email.$invalid"
              >
                <half-circle-spinner
                  v-if="isLoginLoading"
                  :animation-duration="1000"
                  :size="20"
                  color="white"
                />
                <strong v-else>
                  <i
                    class="fas fa-sign-in-alt"
                    style="padding-right: 10px;"
                  ></i>
                  Sign in
                </strong>
              </base-button>
            </div>
          </form>
          <div class="text-center mt-1">
            <base-button
              type="secondary"
              class="my-2 container"
              icon="fab fa-github"
              @click.prevent="loginGithub()"
            >
              Sign in using Github
            </base-button>
          </div>
          <div class="row mt-3">
            <div class="col-6">
              <a href="#" class="">
                <small>Forgot password?</small>
              </a>
            </div>
            <div class="col-6 text-right">
              <router-link to="/register" class="">
                <small>No account yet ?</small>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Technoservs } from "technoservs.js";
import { required, minLength } from "vuelidate/lib/validators";
import { HalfCircleSpinner } from "epic-spinners";

export default {
  name: "login",
  components: {
    HalfCircleSpinner
  },
  data() {
    return {
      email: "",
      password: "",
      error: {
        isError: false,
        message: ""
      },
      isLoginLoading: false,
      errorMsg: null
    };
  },
  validations: {
    email: {
      required
    },
    password: {
      required,
      minLength: minLength(8)
    }
  },
  created() {
    console.log(this.$store.state.user);
  },
  methods: {
    loginGithub() {
      let githubClientID = "9e486adc90668a6818eb";
      window.open(
        `https://github.com/login/oauth/authorize?client_id=${githubClientID}&redirect_uri=https://technoservs.ichbinkour.eu/auth/github`
      );
    },
    loginUser() {
      if (this.password && this.password.length < 6) {
        this.errorMsg = "Password must be 6 characters long";
        return;
      }
      this.errorMsg = "";
      this.isLoginLoading = true;
      const technoservs = require("technoservs.js");
      technoservs
        .login(this.email, this.password)
        .then(response => {
          this.$store.commit("setUser", response.account);
          this.$store.commit(
            "setClient",
            new Technoservs(response.account.token)
          );
          this.isLoginLoading = false;
          this.$router.push("/dashboard");
        })
        .catch(e => {
          this.isLoginLoading = false;
          if (e._message.message) {
            this.error = {
              isError: true,
              message: e._message.message
            };
          }
        });
    }
  }
};
</script>
<style>
.half-circle-spinner {
  margin: auto;
}
</style>
