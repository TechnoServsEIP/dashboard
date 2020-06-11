<template>
  <div>
    <div class="q-pb-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/apps"/>
        <q-breadcrumbs-el label="Dashboard" icon="widgets" :to="'/apps/server/' + $route.params.id"/>
        <q-breadcrumbs-el label="Environment" icon="widgets" :to="'/apps/server/' + $route.params.id + '/environment'"/>
      </q-breadcrumbs>
    </div>

    <h5>Environment Variables</h5>

    <div class="doc-note doc-note--tip">
      <p class="doc-note__title">TIP</p>
      <p>For all the examples below, also see the browser console while you check them out.</p>
    </div>

    <div class="q-pb-md q-gutter-sm">
      <q-btn label="Update" color="primary" :disable="updateButtonDisable" />
      <q-btn label="Add" color="green" @click="addNewEnvironmentVariable" />
    </div>


    <div v-for="variable in environmentVariables" :key="variable.name">
      <div class="q-pt-md">
        <div class="q-gutter-md row ">
          <q-input id="variableName" v-model="variable.name" filled label="Name" style="min-width: 300px" />
          <q-input id="variableValue" v-model="variable.value" filled label="Value" style="min-width: 300px" />
          <q-btn class="delete-btn" size="11px" round color="red" icon="clear" unelevated @click="promptDeleteVariableDialog(variable)"/>
        </div>
      </div>
    </div>

    <q-dialog v-if="wantToDelete != null" v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Are you sure to delete <br> {{wantToDelete.name + "=" + wantToDelete.value}}</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="green" v-close-popup />
          <q-btn flat label="Delete" color="red" v-close-popup @click="deleteVariable(wantToDelete)"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: "ServerEnvironment",
  data() {
    return {
      updateButtonDisable: true,
      formatedEnvironmentVariables: null,
      environmentVariables: [
        {name: "TECHNOSERV_IP", value: "127.0.0.1"},
        {name: "AUTHOR", value: "Valentin Ichkour"},
        {name: "YEAR", value: "2020"}
      ],
      confirm: false,
      wantToDelete: null
    }
  },
  methods: {
    addNewEnvironmentVariable() {
      let checkEnv = this.environmentVariables.filter((v) => {
        return (v.name == "" && v.value == "")
      })
      if (checkEnv.length == 0) {
        this.environmentVariables.push({name: "", value: ""})
      }
    },
    promptDeleteVariableDialog(variable) {
      this.wantToDelete = variable
      this.confirm = true
    },
    deleteVariable(variable) {
      let deletedVarArr = this.environmentVariables.filter((v) => {
        return v != variable
      })
      this.environmentVariables = deletedVarArr
    }
  },
  created() {
    this.formatedEnvironmentVariables = JSON.stringify(this.environmentVariables)
  },
  computed: {
    flatVariables() {
      return JSON.stringify(this.environmentVariables)
    }
  },
  watch: {
    flatVariables() {
      if (this.formatedEnvironmentVariables != JSON.stringify(this.environmentVariables)) {
        this.updateButtonDisable = false
      } else {
        this.updateButtonDisable = true
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.environment-input {
  margin-bottom: 10px;
}
.delete-btn {
  margin-top: 30px;
}
</style>
