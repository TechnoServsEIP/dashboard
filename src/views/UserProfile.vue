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
                  <h3 class="mb-0">My account</h3>
                </div>
              </div>
            </div>
            <template>
              <form @submit.prevent>
                <h6 class="heading-small text-muted mb-4">User information</h6>
                <div>
                  <div class="row mt-4">
                    <div class="col-lg-6">
                      <h5>Your email</h5>
                      <el-input
                        :value="$store.state.user.email"
                        placeholder="Please input password"
                        disabled
                      ></el-input>
                    </div>
                  </div>
                  <div class="row mt-4">
                    <div class="col-lg-6">
                      <h5>Change your password</h5>
                      <el-input
                        placeholder="Please input password"
                        v-model="model.newPassword"
                        show-password
                      ></el-input>
                    </div>
                  </div>
                  <div class="row mt-4">
                    <div class="col-lg-6">
                      <base-button
                        type="primary"
                        size="sm"
                        :disabled="model.newPassword === '' ? true : false"
                        >Save</base-button
                      >
                    </div>
                  </div>
                </div>
              </form>
            </template>
          </card>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col">
          <card shadow type="secondary">
            <div slot="header" class="bg-white border-0">
              <div class="row align-items-center">
                <div class="col">
                  <h3 class="mb-0">Your payment methods</h3>
                </div>
                <div class="col-md-auto">
                  <base-button
                    type="success"
                    size="sm"
                    @click="opendAddCardModal()"
                    >Add a credit card</base-button
                  >
                </div>
              </div>
            </div>
            <template>
              <div class="row pb-4">
                <div class="col-3">
                  <h4>Card holder name</h4>
                </div>
                <div class="col-3">
                  <h4>Card number</h4>
                </div>
                <div class="col-2">
                  <h4>CVC</h4>
                </div>
                <div class="col-2">
                  <h4>Expiration Date</h4>
                </div>
              </div>

              <div v-for="card in creditCards" :key="card.id" class="pt-2">
                <div class="row">
                  <div class="col-3">
                    <span>
                      {{ card.cardHolder }}
                    </span>
                  </div>
                  <div class="col-3">
                    <span>
                      {{ card.cardNumber }}
                    </span>
                  </div>
                  <div class="col-2">
                    <span>
                      {{ card.expDate }}
                    </span>
                  </div>
                  <div class="col-2">
                    <span>
                      {{ card.cvc }}
                    </span>
                  </div>

                  <div class="col-1">
                    <base-button
                      type="default"
                      size="sm"
                      icon="ni ni-settings-gear-65"
                      @click="openUpdateCardModal(card)"
                    ></base-button>
                    <base-button
                      type="danger"
                      size="sm"
                      icon="ni ni-fat-delete"
                      @click="openDeleteCardModal(card)"
                    ></base-button>
                  </div>
                </div>
              </div>
            </template>
          </card>
        </div>
      </div>
    </div>

    <modal :show.sync="modals.delete">
      <div>
        <h4>Are you sure to delete this card ?</h4>
      </div>
      <template slot="footer">
        <base-button type="secondary" @click="modals.delete = false"
          >Close</base-button
        >
        <base-button type="danger" @click="deleteCard">Confirm</base-button>
      </template>
    </modal>

    <modal :show.sync="modals.update">
      <div>
        <h4>Update your card</h4>
        <div>
          <div class="row mt-4">
            <div class="col-lg-6">
              <h5>Card holder name</h5>
              <el-input v-model="selectedCardModal.cardHolder"></el-input>
            </div>
          </div>

          <div class="row mt-4">
            <div class="col-lg-6">
              <h5>Card number</h5>
              <el-input v-model="selectedCardModal.cardNumber"></el-input>
            </div>
          </div>

          <div class="row mt-4">
            <div class="col-lg-3">
              <h5>CVC</h5>
              <el-input v-model="selectedCardModal.cvc"></el-input>
            </div>
          </div>

          <div class="row mt-4">
            <div class="col-lg-6">
              <h5>Expiration date</h5>
              <el-input v-model="selectedCardModal.expDate"></el-input>
            </div>
          </div>
        </div>
      </div>
      <template slot="footer">
        <base-button type="secondary" @click="modals.update = false"
          >Close</base-button
        >
        <base-button type="success" @click="updateCard">Confirm</base-button>
      </template>
    </modal>

    <modal :show.sync="modals.create">
      <div>
        <h4>Add a new card</h4>
        <div>
          <div class="row mt-4">
            <div class="col-lg-6">
              <h5>Card holder name</h5>
              <el-input v-model="newCreditCard.cardHolder"></el-input>
            </div>
          </div>

          <div class="row mt-4">
            <div class="col-lg-6">
              <h5>Card number</h5>
              <el-input v-model="newCreditCard.cardNumber"></el-input>
            </div>
          </div>

          <div class="row mt-4">
            <div class="col-lg-3">
              <h5>CVC</h5>
              <el-input v-model="newCreditCard.cvc"></el-input>
            </div>
          </div>

          <div class="row mt-4">
            <div class="col-lg-6">
              <h5>Expiration date</h5>
              <el-input v-model="newCreditCard.expDate"></el-input>
            </div>
          </div>
        </div>
      </div>
      <template slot="footer">
        <base-button type="secondary" @click="modals.create = false"
          >Close</base-button
        >
        <base-button type="success" @click="createCard">Confirm</base-button>
      </template>
    </modal>
  </div>
</template>

<script>
import DashboardNavbar from "../layout/DashboardNavbar";

export default {
  name: "user-profile",
  components: {
    DashboardNavbar,
  },
  data() {
    return {
      model: {
        newPassword: "",
      },
      modals: {
        delete: false,
        update: false,
        create: false,
      },
      selectedCardModal: {},
      creditCards: [
        {
          id: 1,
          cardHolder: "Valentin Ichkour",
          cardNumber: "1234 5678 9123 4567",
          cvc: "404",
          expDate: "09/2021",
        },
        {
          id: 3,
          cardHolder: "Valentin Ichkour",
          cardNumber: "1234 5678 9123 4567",
          cvc: "404",
          expDate: "09/2021",
        },
        {
          id: 4,
          cardHolder: "Valentin Ichkour",
          cardNumber: "1234 5678 9123 4567",
          cvc: "404",
          expDate: "09/2021",
        },
      ],
      newCreditCard: {
        id: Math.random(),
        cardHolder: "",
        cardNumber: "",
        cvc: "",
        expDate: "",
      },
    };
  },
  methods: {
    openUpdateCardModal(card) {
      this.modals.update = true;
      this.selectedCardModal = card;
    },
    openDeleteCardModal(card) {
      this.modals.delete = true;
      this.selectedCardModal = card;
    },
    opendAddCardModal() {
      this.modals.create = true;
    },
    createCard() {
      this.creditCards.push(this.newCreditCard);
      this.newCreditCard = {
        id: "",
        cardHolder: "",
        cardNumber: "",
        cvc: "",
        expDate: "",
      };
      this.$notify({
        type: "success",
        title: "Card correctly created",
      });
      this.modals.create = false;
    },
    updateCard() {
      this.creditCards.filter((v) => {
        if (v.id === this.selectedCardModal.id) {
          v.cardHolder = this.selectedCardModal.cardHolder;
          v.cardNumber = this.selectedCardModal.cardNumber;
          v.cvc = this.selectedCardModal.cvc;
          v.expDate = this.selectedCardModal.expDate;
        }
      });
      this.$notify({
        type: "success",
        title: "Card correctly updated",
      });
      this.modals.update = false;
    },
    deleteCard() {
      this.creditCards = this.creditCards.filter((v) => {
        return v.id != this.selectedCardModal.id;
      });
      this.modals.delete = false;
      this.$notify({
        type: "success",
        title: "Card correctly deleted",
      });
      this.selectedCardModal = null;
    },
  },
};
</script>
<style></style>
