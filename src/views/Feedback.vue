<template>
  <div>
    <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
      <div class="main-content">
        <dashboard-navbar></dashboard-navbar>
      </div>
    </div>
    <base-header
      class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
      style="min-height: 200px;"
    >
      <!-- Mask -->
      <span class="mask bg-gradient-default opacity-8"></span>
      <!-- Header container -->
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <card shadow type="secondary">
            <div slot="header" class="bg-white border-0">
              <div class="row align-items-center">
                <div class="col-8">
                  <h3 class="mb-0">Send us a feedback !</h3>
                </div>
              </div>
            </div>
            <template>
              <form action="https://formspree.io/mwkwkkza" method="POST">
                <div class="row">
                  <div class="col-2">
                    <span>Your email:</span>
                  </div>
                  <div class="col-7">
                    <el-input
                      placeholder="Your email"
                      disabled
                      type="email"
                      v-model="email"
                      name="_replyto"
                    ></el-input>
                  </div>
                </div>

                <div class="row mt-3">
                  <div class="col-2">Title:</div>
                  <div class="col-7">
                    <el-input
                      placeholder="Title"
                      type="text"
                      v-model="title"
                      name="_title"
                    ></el-input>
                  </div>
                </div>

                <div class="row mt-3">
                  <div class="col-2">
                    <span>Your message:</span>
                  </div>
                  <div class="col-7">
                    <el-input
                      type="textarea"
                      :rows="4"
                      v-model="message"
                      placeholder="Your message"
                      name="message"
                    >
                    </el-input>
                  </div>
                </div>

                <div class="row mt-3">
                  <div class="col-3">
                    <!-- <base-button
                      :disabled="message.length == 0 && email.length == 0"
                      @click.prevent="submitForm()"
                      type="default"
                      >Submit</base-button
                    > -->
                    <button class="submit-button" type="submit">Send</button>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col">
                    <span>
                      If you have further questions join our
                      <a href="https://discord.gg/PBESq3c" target="_blank"
                        >Discord server</a
                      >
                    </span>
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
import DashboardNavbar from "../layout/DashboardNavbar";
import axios from "axios";

export default {
  name: "Feedback",
  components: {
    DashboardNavbar
  },
  data() {
    return {
      message: "",
      title: ""
    };
  },
  computed: {
    email() {
      return this.$store.state.user.email;
    }
  }
};
</script>

<style lang="scss" scoped>
.submit-button {
  border: 1px solid #18194d;
  background: #18194d;
  color: white;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  padding-left: 2em;
  padding-right: 2em;
  border-radius: 7px;
}
</style>
