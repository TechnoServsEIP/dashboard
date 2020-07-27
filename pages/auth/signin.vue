<template>
  <div class="container auth-container">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          Sign In
        </p>
      </header>

      <div class="card-content">
        <section>
          <b-field label="Email" :message="emailInvalid" :type="isError">
            <b-input
              type="email"
              v-model="userEmail"
              validation-message="Email invalid"
              placeholder="Email"
            >
            </b-input>
          </b-field>

          <b-field label="Password" :message="passwordInvalid" :type="isError">
            <b-input
              type="password"
              placeholder="Password"
              v-model="userPassword"
              password-reveal
            >
            </b-input>
          </b-field>

          <b-field>
            <nuxt-link to="/auth/signup">Don't have an account yet ?</nuxt-link>
          </b-field>

          <b-button type="is-primary" @click.prevent="userSignIn"
            ><strong>Sign In</strong></b-button
          >
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: "auth",
  layout: "authentication",
  data() {
    return {
      userEmail: "",
      userPassword: "",
      emailInvalid: "",
      passwordInvalid: "",
      isError: ""
    };
  },
  methods: {
    userSignIn() {
      this.$axios
        .post("/user/login", {
          email: this.userEmail,
          password: this.userPassword
        })
        .then(response => {
          this.$store.commit("updateUser", response.data.account);
          this.$router.push({ path: "/apps" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>
