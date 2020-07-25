<template>
  <div class="container auth-container">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          Sign Up
        </p>
      </header>

      <div class="card-content">
        <section>
          <b-field label="Username" :message="userUsername">
            <b-input
              type="email"
              :value="userUsername"
              validation-message="Email invalid"
              placeholder="Username"
            >
            </b-input>
          </b-field>

          <b-field label="Email" :message="emailInvalid">
            <b-input
              type="email"
              :value="userEmail"
              validation-message="Email invalid"
              placeholder="Email"
            >
            </b-input>
          </b-field>

          <b-field label="Email confirmation" :message="emailInvalid">
            <b-input
              type="email"
              :value="userEmailConfirmation"
              validation-message="Email invalid"
              placeholder="Email Confirmation"
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

          <b-field label="Password confirmation">
            <b-input
              type="password"
              placeholder="Password confirmation"
              :value="userPasswordConfirmation"
              password-reveal
            >
            </b-input>
          </b-field>

          <b-field>
            <nuxt-link to="/auth/signin">Already have an account ?</nuxt-link>
          </b-field>

          <b-button type="is-primary"><strong>Sign Up</strong></b-button>
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
      userEmailConfirmation: "",
      userPassword: "",
      userPasswordConfirmation: "",
      emailInvalid: "",
      passwordInvalid: "",
      userUsername: "",
      isEmailInvalid: true
    };
  }
};
</script>
