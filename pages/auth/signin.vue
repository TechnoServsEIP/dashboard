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
          <b-field label="Email" :message="emailInvalid">
            <b-input
              type="email"
              :value="userEmail"
              validation-message="Email invalid"
              placeholder="Email"
            >
            </b-input>
          </b-field>

          <b-field label="Password">
            <b-input
              type="password"
              placeholder="Password"
              :value="userPassword"
              password-reveal
            >
            </b-input>
          </b-field>

          <b-field>
            <nuxt-link to="/auth/signup">Don't have an account yet ?</nuxt-link>
          </b-field>

          <b-button type="is-primary" @click="userSignIn"
            ><strong>Sign In</strong></b-button
          >
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "authentication",
  data() {
    return {
      userEmail: "",
      userPassword: "",
      emailInvalid: "",
      passwordInvalid: "",
      isEmailInvalid: true
    };
  },
  methods: {
    userSignIn() {
      this.$axios
        .$post("/user/login", {
          email: this.userEmail,
          password: this.userPassword
        })
        .then(response => {
          console.log(response);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>
