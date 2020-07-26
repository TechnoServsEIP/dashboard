<template>
  <div>
    <section class="section">
      <div class="columns">
        <h1 class="title is-3">Applications</h1>
      </div>
      <div class="columns">
        <b-table :data="appsList" :columns="appsListColumns" hoverable>
        </b-table>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "AppsIndex",
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
  }
};
</script>

<style lang="scss" scoped>
.b-table {
  width: 100%;
}
</style>
