<template>
  <div>
    <b-table :data="appsList" :columns="appsListColumns" hoverable> </b-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      appsList: [
        {
          name: "Application 1",
          id: 1,
          status: "Running",
          connectedUsers: "100/100",
          iconEnd: ""
        },
        {
          name: "Application 2",
          id: 2,
          status: "Stopped",
          connectedUsers: "100/100",
          iconEnd: ""
        },
        {
          name: "Application 3",
          id: 3,
          status: "Stopped",
          connectedUsers: "100/100",
          iconEnd: ""
        },
        {
          name: "Application 4",
          id: 4,
          status: "Running",
          connectedUsers: "100/100",
          iconEnd: ""
        },
        {
          name: "Application 5",
          id: 5,
          status: "Running",
          connectedUsers: "100/100",
          iconEnd: ""
        }
      ],
      appsListColumns: [
        {
          field: "name",
          label: "Name"
        },
        {
          field: "status",
          label: "Status"
        },
        {
          field: "connectedUsers",
          label: "Connected"
        },
        {
          field: "iconEnd"
        }
      ]
    };
  },
  methods: {
    getUserApplications() {
      this.$axios
        .post(
          "/docker/list",
          JSON.stringify({
            user_id: this.$store.state.user.ID
          }),
          {
            headers: {
              Authorization: `Bearer ${this.$store.state.user.token}`
            }
          }
        )
        .then(response => {
          console.log(response);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  created() {
    this.getUserApplications();
  }
};
</script>

<style lang="scss" scoped>
.b-table {
  width: 100%;
}
</style>
