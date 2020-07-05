<template>
  <div padding>
    <div class="q-pb-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/apps/" />
        <q-breadcrumbs-el label="Admin" icon="widgets" to="/admin" />
      </q-breadcrumbs>
    </div>

    <div>
      <h3 class="center">Admin Panel</h3>
      <div class="row" style="justify-content:space-around">
        <q-card class="my-card">
          <q-card-section>
            <div class="row" style="justify-content:space-between">
              <div>
                <div class="text-h6">0</div>
                <div class="text-subtitle2">Total Users</div>
              </div>
              <div>
                <q-icon flat color="primary" name="group" size="xl" />
              </div>
            </div>
          </q-card-section>
        </q-card>
        <q-card class="my-card">
          <q-card-section>
            <div class="row" style="justify-content:space-between">
              <div>
                <div class="text-h6">0</div>
                <div class="text-subtitle2">Users Online</div>
              </div>
              <div>
                <q-icon flat color="primary" name="account_circle" size="xl" />
              </div>
            </div>
          </q-card-section>
        </q-card>
        <q-card class="my-card">
          <q-card-section>
            <div class="row" style="justify-content:space-between">
              <div>
                <div class="text-h6">0</div>
                <div class="text-subtitle2">Servers Online</div>
              </div>
              <div>
                <q-icon flat color="primary" name="dns" size="xl" />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="textParam">Users Management</div>
      <router-link tag="li" class="sublink" to="/admin/users">
        Users
      </router-link>
      <router-link tag="li" class="sublink" to="/admin/roles">
        Roles
      </router-link>

      <q-separator color="secondary" class="sep" inset />

      <div class="textParam">Servers Management</div>
      <router-link class="sublink" tag="li" to="/admin/servers">
        Servers table
      </router-link>

      <q-separator color="secondary" class="sep" inset />

      <div class="textParam">Offers management</div>
      <router-link class="sublink" tag="li" to="/admin/offers">
        Offers table
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminIndex',
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 250px;
  text-align: center;
}
.sep {
  margin-top: 3%;
}
.textParam {
  margin-top: 3%;
}
.sublink {
  margin: 1%;
  color: $primary;
  display: block;
  text-decoration: underline;
  cursor: pointer;
}
.link {
  background: none;
  border: none;
  color: black;
  font-size: medium;
}
.sizeTab {
  width: 450px;
  height: 450px !important;
}
</style>
