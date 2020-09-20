<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="card shadow" style="width: 100%">
          <div class="card-header">
            <h3>Environment variables</h3>
          </div>

          <div class="card-body">
            <base-alert type="primary" class="mb-2">
              <strong>Info!</strong>
              Here you can manage your environment variables.
            </base-alert>

            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="name" label="Name"></el-table-column>
              <el-table-column prop="value" label="Value"></el-table-column>
              <el-table-column prop="actions" label="Actions" width="100">
                <base-button type="primary" size="sm" outline>Edit</base-button>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AppEnvironment",
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-02",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-04",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-01",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
      ],
    };
  },
  created() {
    this.getGameServerProperties();
  },
  methods: {
    getGameServerProperties() {
      var data = {
        user_id: this.$store.state.user.ID.toString(),
        container_id:
          "5e55b2a7968d5bb57a13f1ca2d2006c221c52901a2bf402c5af9a382ba7e39fe",
      };

      var config = {
        headers: {
          Authorization: `Bearer ${this.$store.state.user.token}`,
          "Content-Type": "application/json",
        },
        data: data,
      };

      this.$axios
        .get("/minecraft/serverproperties", config)
        .then(function(response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function(error) {
          console.log(error);
        });

      // this.$axios
      //   .get("/minecraft/serverproperties", {
      //     headers: {
      //       authorization: `Bearer ${this.$store.state.user.token}`,
      //     },
      //     data: {
      //       user_id: this.$store.state.user.ID.toString(),
      //       container_id:
      //         "5e55b2a7968d5bb57a13f1ca2d2006c221c52901a2bf402c5af9a382ba7e39fe",
      //     },
      //   })
      //   .then((response) => {
      //     console.log(response);
      //   })
      //   .catch((e) => {
      //     console.log(e);
      //   });
      // this.$store.state.client.Docker.playersOnline(
      //   this.$store.state.user.ID.toString(),
      //   "5e55b2a7968d5bb57a13f1ca2d2006c221c52901a2bf402c5af9a382ba7e39fe"
      // )
      //   .then((response) => {
      //     console.log(response);
      //   })
      //   .catch((e) => {
      //     console.log(e._message);
      //   });
    },
  },
};
</script>

<style></style>
