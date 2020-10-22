<template>
  <div>
    <div
      class="card shadow"
      style="width: 100%"
      :class="type === 'dark' ? 'bg-default' : ''"
    >
      <div class="card-header" :class="type === 'dark' ? 'bg-transparent' : ''">
        <div class="row align-items-center">
          <div class="col">
            <h3 class="mb-0" :class="type === 'dark' ? 'text-white' : ''">
              Users
            </h3>
          </div>
          <div>
            <div class="col mr-auto">
              <el-input
                placeholder="Search a user"
                v-model="searchInput"
              ></el-input>
            </div>
          </div>
        </div>
      </div>

      <div class="table-responsive" style="height: 50vh;">
        <base-table
          v-if="usersLocal.length > 0"
          class="table align-items-center table-flush"
          :class="type === 'dark' ? 'table-dark' : ''"
          :thead-classes="type === 'dark' ? 'thead-dark' : 'thead-light'"
          tbody-classes="list"
          :data="usersLocal"
        >
          <template slot="columns">
            <th>ID</th>
            <th>Email</th>
            <th>Role</th>
            <th>Activated</th>
            <th>Verified</th>
            <th></th>
          </template>
          <template slot-scope="{ row }">
            <th scope="row">
              <div class="media align-items-center">
                <div class="media-body">
                  <span class="name mb-0 text-sm">{{ row.ID }}</span>
                </div>
              </div>
            </th>

            <td>
              <div class="media align-items-center">
                <div class="media-body">
                  <span class="name mb-0 text-sm">{{ row.email }}</span>
                </div>
              </div>
            </td>

            <td>
              <div class="media align-items-center">
                <div class="media-body">
                  <badge
                    class="badge"
                    :type="row.Role == 'admin' ? 'primary' : 'info'"
                  >
                    <span class="status">{{
                      row.Role.slice(0, 1).toUpperCase() + row.Role.slice(1)
                    }}</span>
                  </badge>
                </div>
              </div>
            </td>

            <td>
              <div class="media align-items-center">
                <div class="media-body">
                  <span class="name mb-0 text-sm">{{
                    row.Activate === true ? "✅" : "❌"
                  }}</span>
                </div>
              </div>
            </td>

            <td>
              <div class="media align-items-center">
                <div class="media-body">
                  <span class="name mb-0 text-sm">{{
                    row.Verified === true ? "✅" : "❌"
                  }}</span>
                </div>
              </div>
            </td>

            <td class="text-right">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <base-button type="dark" size="sm">Edit</base-button>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    @click.native="
                      updateUser(
                        row.ID.toString(),
                        row.Role === 'admin' ? 'user' : 'admin'
                      )
                    "
                  >
                    {{
                      row.Role === "admin"
                        ? "Change to user"
                        : "Change to admin"
                    }}
                  </el-dropdown-item>

                  <el-dropdown-item
                    @click.native="
                      updateActivateUser(!row.Activate, row.ID.toString())
                    "
                  >
                    {{
                      row.Activate === true
                        ? "Deactivate User"
                        : "Activate User"
                    }}
                  </el-dropdown-item>
                  <el-dropdown-item
                    @click.native="
                      updateVerifiedUser(!row.Verified, row.ID.toString())
                    "
                  >
                    {{
                      row.Verified === false
                        ? "Verify User"
                        : "Remove Verified User"
                    }}
                  </el-dropdown-item>
                  <el-dropdown-item
                    @click.native="toUserServers(row.ID.toString())"
                  >
                    See user servers
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </td>
          </template>
        </base-table>

        <div v-else class="text-center mt-3">
          <h4>No users</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TableUsersList",
  props: {
    users: Array,
    type: {
      type: String,
    },
  },
  data() {
    return {
      selectedUser: {},
      searchInput: "",
      usersLocal: [],
    };
  },
  created() {
    this.usersLocal = this.users;
  },
  methods: {
    updateVerifiedUser(verified, id) {
      console.log(verified);
      if (!verified == false) {
        this.$axios
          .post(
            "user/verify",
            {
              Id: id.toString(),
            },
            {
              headers: {
                authorization: `Bearer ${this.$store.state.user.token}`,
              },
            }
          )
          .then((response) => {
            this.$emit("update-verified-user", { id: id, verified: !verified });
            this.$notify({
              type: "success",
              title: `User correctly unverified`,
            });
            console.log(response);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (!verified == true) {
        this.$axios
          .post(
            "user/removeverification",
            {
              Id: id.toString(),
            },
            {
              headers: {
                authorization: `Bearer ${this.$store.state.user.token}`,
              },
            }
          )
          .then((response) => {
            this.$emit("update-verified-user", { id: id, verified: !verified });
            this.$notify({
              type: "success",
              title: `User correctly unverified`,
            });
            console.log(response);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    toUserServers(id) {
      this.$router.push(`/admin/user/${id}/servers`);
    },
    updateActivateUser(value, id) {
      this.$axios
        .post(
          `/user/${value === false ? "deactivate" : "activate"}`,
          {
            Id: id,
          },
          {
            headers: {
              authorization: `Bearer ${this.$store.state.user.token}`,
            },
          }
        )
        .then((response) => {
          this.$emit("update-activate-user", { id: id, activate: value });
          this.$notify({
            type: "success",
            title: `User correctly ${
              value === false ? "deactivated" : "activated"
            }`,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updateUser(id, role) {
      this.$axios
        .post(
          "/user/update",
          {
            Id: id,
            Role: role,
          },
          {
            headers: {
              authorization: `Bearer ${this.$store.state.user.token}`,
            },
          }
        )
        .then(() => {
          this.$emit("update-user", { id: id, role: role });
          this.$notify({
            type: "success",
            title: "User role updated",
          });
        })
        .catch((e) => {
          this.$notify({
            type: "danger",
            title: e,
          });
        });
    },
  },
  watch: {
    users() {
      this.usersLocal = this.users;
    },
    searchInput() {
      if (this.searchInput == "") {
        this.usersLocal = this.users;
        return;
      } else {
        this.usersLocal = this.users.filter((v) => {
          return v.email.includes(this.searchInput);
        });
      }
    },
  },
};
</script>

<style lang="scss">
.el-form-item__label {
  text-align: left;
}
</style>
