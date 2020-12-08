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
            <base-button
              type="success"
              :disabled="isLoading"
              @click.prevent="updateProperties()"
            >
              <half-circle-spinner
                v-if="isLoading"
                :animation-duration="1000"
                :size="20"
                color="white"
              />
              <span v-else>Save</span>
            </base-button>
            <el-table
              :data="serverProperties"
              style="width: 100%"
              :empty-text="emptyTextValue"
            >
              <el-table-column prop="Name" label="Name"></el-table-column>
              <el-table-column prop="Choices" label="Value">
                <template slot-scope="scope">
                  <el-switch
                    v-if="scope.row.DataType == 'boolean'"
                    v-model="scope.row.Value"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                  >
                  </el-switch>

                  <el-input-number
                    v-if="scope.row.DataType == 'Number'"
                    v-model="scope.row.Value"
                  ></el-input-number>

                  <el-input
                    v-if="
                      scope.row.DataType == 'string' &&
                      scope.row.Choices.length === 0
                    "
                    v-model="scope.row.Value"
                  ></el-input>

                  <div v-if="scope.row.Choices.length > 0">
                    <el-select
                      v-if="scope.row.Name === 'gamemode'"
                      v-model="scope.row.Value"
                      :placeholder="selectValues[scope.row.id]"
                    >
                      <el-option
                        v-for="item in getCorrectChoicesOptions(scope.row.id)
                          .choices"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>

                    <el-select
                      v-if="scope.row.Name === 'difficulty'"
                      v-model="scope.row.Value"
                      :placeholder="selectValues[scope.row.id]"
                    >
                      <el-option
                        v-for="item in getCorrectChoicesOptions(scope.row.id)
                          .choices"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>

                    <el-select
                      v-if="scope.row.Name === 'level-type'"
                      v-model="scope.row.Value"
                      :placeholder="selectValues[scope.row.id]"
                    >
                      <el-option
                        v-for="item in getCorrectChoicesOptions(scope.row.id)
                          .choices"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </template>
              </el-table-column>
              <!-- <el-table-column prop="actions" label="Actions" width="100">
                <base-button type="primary" size="sm" outline>Edit</base-button>
              </el-table-column> -->
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { HalfCircleSpinner } from 'epic-spinners'

export default {
  name: 'AppEnvironment',
  components: {
    HalfCircleSpinner,
  },
  data() {
    return {
      containerId: null,
      serverProperties: [],
      selectOptions: [],
      selectValues: [],
      values: {
        gamemode: '',
        difficulty: '',
        levelType: '',
      },
      switchValues: {},
      stringValues: {},
      isLoading: false,
      emptyTextValue: 'No server properties',
      rawServerProperties: {},
    }
  },
  created() {
    this.$store.state.client.Docker.list(this.$store.state.user.ID.toString())
      .then((response) => {
        this.containerId = response.list.filter((v) => {
          return v.ID == this.$route.params.id
        })[0].id_docker
        if (this.containerId != null) {
          this.getGameServerProperties()
        } else {
          throw 'Error => no such container id'
        }
      })
      .catch((e) => {
        console.log(e)
      })
  },
  watch: {
    serverProperties() {
      console.log('Change')
    },
  },
  computed: {
    serverPropertiesLocal() {
      return this.serverProperties
    },
  },
  methods: {
    resetProperties() {
      let obj = {}
    },
    updateProperties() {
      let obj = {
        // user_id: this.$store.state.user.ID.toString(),
        // container_id: this.containerId,
      }
      // console.log(this.serverProperties);
      let tmp = Object.keys(this.rawServerProperties)
      for (var i = 0; i < tmp.length; i++) {
        obj[tmp[i]] = this.serverProperties[i].Value
      }
      this.isLoading = true
      this.$axios
        .post(
          '/minecraft/updateserverproperties',
          {
            container_id: this.containerId,
            user_id: this.$store.state.user.ID.toString(),
            ...obj,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$store.state.user.token}`,
            },
          },
        )
        .then((response) => {
          this.isLoading = false
          this.$notify({
            title: 'Server properties has been correctly updated',
            type: 'success',
          })
          console.log(response)
        })
        .catch((e) => {
          this.isLoading = false
          this.$notify({
            title: 'Error while updating server properties',
            type: 'danger',
          })
          console.log(e)
        })
    },
    getCorrectChoicesOptions(id) {
      return this.selectOptions.filter((v) => {
        return v.id == id
      })[0]
    },
    setSelectOptions(options) {
      let opt = []
      options.forEach((elem) => {
        let choices = []
        elem.Choices.forEach((value) => {
          choices.push({
            value: value,
            label: value,
          })
        })
        let obj = {
          id: elem.id,
          choices: choices,
        }
        this.selectOptions.push(obj)
        this.selectValues.push({ [obj.id]: elem.Value })
      })
    },
    updateValues() {
      this.serverProperties.forEach((e) => {
        switch (e.Name) {
          case 'gamemode':
            this.values.gamemode = e.Value
            break
          case 'difficulty':
            this.values.difficulty = e.Value
            break
          case 'level-type':
            this.values.levelType = e.Value
            break
        }
      })
    },
    getGameServerProperties() {
      var data = {
        user_id: this.$store.state.user.ID.toString(),
        container_id: this.containerId,
      }

      var config = {
        headers: {
          Authorization: `Bearer ${this.$store.state.user.token}`,
          'Content-Type': 'application/json',
        },
        data: data,
      }

      this.$axios
        .post('/minecraft/getserverproperties', data, config)
        .then((response) => {
          response.data.properties['WhitLlist'].Value = 'true'
          console.log('server properties from api =>', response.data.properties)
          this.rawServerProperties = response.data.properties
          this.serverProperties = Object.values(response.data.properties)
          for (var i = 0; i < this.serverProperties.length; i++) {
            this.serverProperties[i].id = i
            if (this.serverProperties[i].DataType == 'boolean')
              this.serverProperties[i].Value =
                this.serverProperties[i].Value == 'true'
          }

          this.setSelectOptions(
            this.serverProperties.filter((v) => {
              return v.Choices.length > 0
            }),
          )
          this.updateValues()
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>

<style></style>
