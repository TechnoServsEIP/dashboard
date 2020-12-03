<template>
  <div>
    <el-card>
      <h1>Reset your password</h1>

      <el-input v-model="user.email" class="mb-3" type="email" placeholder="Enter your email" @keypress.enter.native="resetPassword"></el-input>
      <base-button :disabled="user.email.length == 0 || $v.user.$invalid">Reset my password!</base-button>
      
      <div class="mt-2">
        <router-link to="/">
          Go back
        </router-link>
      </div>
    </el-card>
  </div>
</template>

<script>
import { email } from "vuelidate/lib/validators";

export default {
  name: 'ResetPassword',
  data() {
    return {
      user: {
        email: ''
      }
    }
  },
  validations: {
    user: {
      email: {
        email
      }
    }
  },
  methods: {
    resetPassword() {
      if (this.user.email !== '' && !this.$v.user.$invalid) {
        
      }
    }
  }
}
</script>
