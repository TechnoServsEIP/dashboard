<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4">
            <small>Sign in to the dashboard</small>
          </div>
          <form type="submit" role="form">
            <base-input
              class="input-group-alternative mb-3"
              placeholder="Email"
              addon-left-icon="ni ni-email-83"
              v-model="model.email"
            ></base-input>

            <base-input
              class="input-group-alternative"
              placeholder="Password"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="model.password"
            ></base-input>

            <div>
              <base-button v-on:click.prevent="loginUser()" type="primary" class="my-4">Sign in</base-button>
            </div>
          </form>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-6">
          <a href="#" class="text-light">
            <small>Forgot password?</small>
          </a>
        </div>
        <div class="col-6 text-right">
          <router-link to="/register" class="text-light">
            <small>Create new account</small>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Technoservs } from "technoservs.js";
export default {
  name: "login",
  data() {
    return {
      model: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    loginUser() {
      const technoservs = require("technoservs.js");
      technoservs
        .login(this.model.email, this.model.password)
        .then((response) => {
          this.$store.commit("setUser", response.account);
          this.$store.commit(
            "setClient",
            new Technoservs(response.account.token)
          );
          this.$router.push("/dashboard");
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>
<style></style>
