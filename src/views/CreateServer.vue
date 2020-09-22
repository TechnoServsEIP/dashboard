<template>
  <div>
    <base-header
      type="gradient-default"
      class="pb-6 pb-8 pt-5 pt-md-8"
    ></base-header>

    <div class="container-fluid mt--7">
      <div class="row mt-5">
        <div class="card shadow" style="width: 100%">
          <div class="card-header border-0">
            <div class="row align-items-center">
              <div class="col">
                <h3 class="mb-0">Create a server</h3>
              </div>
              <div class="col-md-auto">
                <router-link to="/dashboard">
                  <base-button type="primary" size="sm"
                    >Return to dashboard</base-button
                  >
                </router-link>
              </div>
            </div>
          </div>

          <div class="table-responsive m-4">
            <div class="row mb-4">
              <div class="col-md-6">
                <input
                  type="text"
                  v-model="serverName"
                  class="form-control"
                  placeholder="Your server name"
                  aria-label="Your server name"
                  aria-describedby="button-addon2"
                  v-on:keyup.enter="createServer"
                />
              </div>
            </div>

            <div class="row mb-4">
              <div class="col-md-6"><strong>Game:</strong> Minecraft</div>
            </div>

            <div class="row mb-4">
              <div class="col-md-6">
                <strong>Plan:</strong> Standard - <strong>0€/month</strong>
              </div>
            </div>

            <div class="row mb-4">
              <div class="col-md-6">
                <base-button
                  :disabled="!allFieldsCompleted || isLoading"
                  type="success"
                  @click.prevent="checkoutOrder()"
                >
                  <half-circle-spinner
                    v-if="isLoading"
                    :animation-duration="1000"
                    :size="20"
                    color="white"
                  />
                  <strong v-else>Create</strong>
                </base-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { HalfCircleSpinner } from "epic-spinners";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51HT2XlJMhPRLHhSBEPU2UITcS3hdbima1IEwq1SMqOB9ebJlpuF48kXHnozPzCf7jttmTBo7Te3lCsK42xJoI5gK00mZykg31c"
);

export default {
  components: {
    HalfCircleSpinner,
  },
  data() {
    return {
      allFieldsCompleted: false,
      serverName: "",
      isLoading: false,
    };
  },
  watch: {
    serverName() {
      if (this.serverName != "") this.allFieldsCompleted = true;
      else this.allFieldsCompleted = false;
    },
  },
  methods: {
    async checkoutOrder() {
      if (this.allFieldsCompleted) {
        this.isLoading = true;
        const stripe = await stripePromise;
        this.$store.commit("setServerCreateInfo", {
          name: this.serverName,
        });
        try {
          const resp = await this.$axios.post(
            "/payment/new",
            {},
            {
              headers: {
                Authorization: `Bearer ${this.$store.state.user.token}`,
              },
            }
          );

          const result = await stripe.redirectToCheckout({
            sessionId: resp.data.id,
          });
          console.log(result);
          if (result.error) {
            console.log("ERROR =>", result);
            this.$store.commit("setServerCreateInfo", null);
          } else {
            this.$store.commit("setServerCreateInfo", {
              name: this.serverName,
            });
            console.log("SUCCESS =>", result);
          }
        } catch (err) {
          // Handle Error Here
          console.error("error", err);
        }
      }
    },
    createServer() {
      if (this.allFieldsCompleted) {
        this.$store.state.client.Docker.create(
          this.$store.state.user.ID.toString(),
          "minecraft",
          this.serverName
        )
          .then((response) => {
            console.log(response);
            this.$router.push({ path: "/dashboard" });
            this.$notify({
              type: "success",
              title: `Server ${this.serverName} correctly created`,
            });
          })
          .catch((e) => {
            this.$notify({
              type: "danger",
              title: `Something went wrong: ${e._message.message}`,
            });
          });
      }
    },
  },
};
</script>
<style></style>
