<template>
  <div>
    <div class="row">
      <div class="col-4">
        <stats-card
          title="Users"
          :subTitle="getUsers.length.toString()"
          icon="ni ni-single-02"
        >
        </stats-card>
      </div>
      <div class="col-4">
        <stats-card title="Users online" subTitle="0" icon="ni ni-laptop">
        </stats-card>
      </div>

      <div class="col-4">
        <stats-card title="Servers" subTitle="100" icon="ni ni-controller">
        </stats-card>
      </div>
    </div>

    <div class="mt-4">
      <table-users-list
        :users="getUsers"
        @update-user="setUserNewRole"
        @update-activate-user="updateActivatedUser"
      ></table-users-list>
    </div>
  </div>
</template>

<script>
import StatsCard from "../../components/StatsCard";
import TableUsersList from "../../components/Table/TableUsersList";

export default {
  name: "AdminHome",
  components: {
    StatsCard,
    TableUsersList,
  },
  data() {
    return {
      users: [],
    };
  },
  created() {
    this.getUsersFromApi();
  },
  computed: {
    getUsers() {
      return this.users;
    },
  },
  methods: {
    setUserNewRole(event) {
      this.users.forEach((elem) => {
        if (elem.ID == event.id) {
          elem.Role = event.role;
        }
      });
    },
    updateActivatedUser(event) {
      this.users.forEach((elem) => {
        if (elem.ID == event.id) {
          elem.Activate = event.activate;
        }
      });
    },
    getUsersFromApi() {
      this.$axios
        .get("/user/", {
          headers: {
            authorization: `Bearer ${this.$store.state.user.token}`,
          },
        })
        .then((response) => {
          this.users = response.data.res.Value;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
i {
  font-size: 25px;
}
</style>
