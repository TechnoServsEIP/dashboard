<template>
  <q-page>
    <div>
      <div class="flex">
        <div v-for="plan in Plan" :key="plan.uuid" class="q-pa-md col-md-3">
          <div class="text-h5">
            <b>{{ plan.name }}</b>
          </div>
          <div class="flex row">
            <div
              v-for="offer in plan.models"
              :key="offer.name"
              class="q-pa-md col-md-3"
            >
              <single-offer-card :offer="offer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import SingleOfferCard from './SingleOfferCard'
export default {
  name: 'OfferListTable',
  components: {
    SingleOfferCard,
  },
  created() {
    for (let index = 0; index < this.result.length; index++) {
      const element = this.result[index]
      // Minecraft UUID
      if (element.uuid == '5f1ea7ca7582b146cf0a44d0') {
        this.Plan = element.offer_types
        console.log(this.Plan)
      }
    }
  },
  data() {
    return {
      tmp: Object,
      holder: 0,
      Plan: [],
      result: [
        {
          uuid: '5f1ea7ca7582b146cf0a44d0',
          name: 'Minecraft Offers',
          offer_types: [
            {
              uuid: '',
              name: 'Starter',
              type: 'shared',
              models: [
                {
                  uuid: '',
                  name: 'Starter-2048',
                  players_slots: 64000,
                  plugins_limit: 64000,
                  ram_memory: 2048,
                  disk_space: {
                    current_disk_space: 0,
                    min: 0,
                    max: 0,
                    monthly_price: 0,
                    hourly_price: 0,
                  },
                  port: {
                    current_nb_port: 0,
                    min: 0,
                    max: 5,
                    monthly_price: 0,
                    hourly_price: 0,
                  },
                  custom_domain_address: true,
                  dedicated_ip_address: {
                    dedicated_ip: false,
                    monthly_price: 1.99,
                    hourly_price: 0.00035,
                  },
                  modded_servers_allowed: true,
                  automated_backups: true,
                  planned_tasks: true,
                  prioritized_support: false,
                  sla: 99.95,
                  monthly_price: 0,
                  hourly_price: 0,
                },
                {
                  uuid: '',
                  name: 'Starter-3072',
                  players_slots: 64000,
                  plugins_limit: 64000,
                  ram_memory: 3072,
                  disk_space: {
                    current_disk_space: 0,
                    min: 0,
                    max: 0,
                    monthly_price: 0,
                    hourly_price: 0,
                  },
                  port: {
                    current_nb_port: 0,
                    min: 0,
                    max: 5,
                    monthly_price: 0,
                    hourly_price: 0,
                  },
                  custom_domain_address: true,
                  dedicated_ip_address: {
                    dedicated_ip: false,
                    monthly_price: 1.99,
                    hourly_price: 0.00035,
                  },
                  modded_servers_allowed: true,
                  automated_backups: true,
                  planned_tasks: true,
                  prioritized_support: false,
                  sla: 99.95,
                  monthly_price: 0,
                  hourly_price: 0,
                },
                {
                  uuid: '',
                  name: 'Starter-4096',
                  players_slots: 64000,
                  plugins_limit: 64000,
                  ram_memory: 4096,
                  disk_space: {
                    current_disk_space: 0,
                    min: 0,
                    max: 0,
                    monthly_price: 0,
                    hourly_price: 0,
                  },
                  port: {
                    current_nb_port: 0,
                    min: 0,
                    max: 5,
                    monthly_price: 0,
                    hourly_price: 0,
                  },
                  custom_domain_address: true,
                  dedicated_ip_address: {
                    dedicated_ip: false,
                    monthly_price: 1.99,
                    hourly_price: 0.00035,
                  },
                  modded_servers_allowed: true,
                  automated_backups: true,
                  planned_tasks: true,
                  prioritized_support: false,
                  sla: 99.95,
                  monthly_price: 0,
                  hourly_price: 0,
                },
                {
                  uuid: '',
                  name: 'Starter-6144',
                  players_slots: 64000,
                  plugins_limit: 64000,
                  ram_memory: 6144,
                  disk_space: {
                    current_disk_space: 0,
                    min: 0,
                    max: 0,
                    monthly_price: 0,
                    hourly_price: 0,
                  },
                  port: {
                    current_nb_port: 0,
                    min: 0,
                    max: 5,
                    monthly_price: 0,
                    hourly_price: 0,
                  },
                  custom_domain_address: true,
                  dedicated_ip_address: {
                    dedicated_ip: false,
                    monthly_price: 1.99,
                    hourly_price: 0.00035,
                  },
                  modded_servers_allowed: true,
                  automated_backups: true,
                  planned_tasks: true,
                  prioritized_support: false,
                  sla: 99.95,
                  monthly_price: 0,
                  hourly_price: 0,
                },
                {
                  uuid: '',
                  name: 'Starter-8192',
                  players_slots: 64000,
                  plugins_limit: 64000,
                  ram_memory: 8192,
                  disk_space: {
                    current_disk_space: 0,
                    min: 0,
                    max: 0,
                    monthly_price: 0,
                    hourly_price: 0,
                  },
                  port: {
                    current_nb_port: 0,
                    min: 0,
                    max: 5,
                    monthly_price: 0,
                    hourly_price: 0,
                  },
                  custom_domain_address: true,
                  dedicated_ip_address: {
                    dedicated_ip: false,
                    monthly_price: 1.99,
                    hourly_price: 0.00035,
                  },
                  modded_servers_allowed: true,
                  automated_backups: true,
                  planned_tasks: true,
                  prioritized_support: false,
                  sla: 99.95,
                  monthly_price: 0,
                  hourly_price: 0,
                },
                {
                  uuid: '',
                  name: 'Starter-10240',
                  players_slots: 64000,
                  plugins_limit: 64000,
                  ram_memory: 10240,
                  disk_space: {
                    current_disk_space: 0,
                    min: 0,
                    max: 0,
                    monthly_price: 0,
                    hourly_price: 0,
                  },
                  port: {
                    current_nb_port: 0,
                    min: 0,
                    max: 5,
                    monthly_price: 0,
                    hourly_price: 0,
                  },
                  custom_domain_address: true,
                  dedicated_ip_address: {
                    dedicated_ip: false,
                    monthly_price: 1.99,
                    hourly_price: 0.00035,
                  },
                  modded_servers_allowed: true,
                  automated_backups: true,
                  planned_tasks: true,
                  prioritized_support: false,
                  sla: 99.95,
                  monthly_price: 0,
                  hourly_price: 0,
                },
                {
                  uuid: '',
                  name: 'Starter-12288',
                  players_slots: 64000,
                  plugins_limit: 64000,
                  ram_memory: 12288,
                  disk_space: {
                    current_disk_space: 0,
                    min: 0,
                    max: 0,
                    monthly_price: 0,
                    hourly_price: 0,
                  },
                  port: {
                    current_nb_port: 0,
                    min: 0,
                    max: 5,
                    monthly_price: 0,
                    hourly_price: 0,
                  },
                  custom_domain_address: true,
                  dedicated_ip_address: {
                    dedicated_ip: false,
                    monthly_price: 1.99,
                    hourly_price: 0.00035,
                  },
                  modded_servers_allowed: true,
                  automated_backups: true,
                  planned_tasks: true,
                  prioritized_support: false,
                  sla: 99.95,
                  monthly_price: 0,
                  hourly_price: 0,
                },
              ],
            },
            {
              uuid: '',
              name: 'Premium',
              type: 'Dedicated',
              models: [
                {
                  uuid: '',
                  name: 'Premium-2048',
                  players_slots: 64000,
                  plugins_limit: 64000,
                  ram_memory: 2048,
                  disk_space: {
                    current_disk_space: 20000,
                    min: 20000,
                    max: 120000,
                    monthly_price: 0,
                    hourly_price: 0,
                  },
                  port: {
                    current_nb_port: 0,
                    min: 0,
                    max: 5,
                    monthly_price: 0,
                    hourly_price: 0,
                  },
                  custom_domain_address: true,
                  dedicated_ip_address: {
                    dedicated_ip: true,
                    monthly_price: 1.99,
                    hourly_price: 0.00035,
                  },
                  modded_servers_allowed: true,
                  automated_backups: true,
                  planned_tasks: true,
                  prioritized_support: true,
                  sla: 99.95,
                  monthly_price: 0,
                  hourly_price: 0,
                },
                {
                  uuid: '',
                  name: 'Premium-4096',
                  players_slots: 64000,
                  plugins_limit: 64000,
                  ram_memory: 4096,
                  disk_space: {
                    current_disk_space: 40000,
                    min: 40000,
                    max: 120000,
                    monthly_price: 0,
                    hourly_price: 0,
                  },
                  port: {
                    current_nb_port: 0,
                    min: 0,
                    max: 5,
                    monthly_price: 0,
                    hourly_price: 0,
                  },
                  custom_domain_address: true,
                  dedicated_ip_address: {
                    dedicated_ip: true,
                    monthly_price: 1.99,
                    hourly_price: 0.00035,
                  },
                  modded_servers_allowed: true,
                  automated_backups: true,
                  planned_tasks: true,
                  prioritized_support: true,
                  sla: 99.95,
                  monthly_price: 0,
                  hourly_price: 0,
                },
                {
                  uuid: '',
                  name: 'Premium-8192',
                  players_slots: 64000,
                  plugins_limit: 64000,
                  ram_memory: 8192,
                  disk_space: {
                    current_disk_space: 80000,
                    min: 80000,
                    max: 120000,
                    monthly_price: 0,
                    hourly_price: 0,
                  },
                  port: {
                    current_nb_port: 0,
                    min: 0,
                    max: 5,
                    monthly_price: 0,
                    hourly_price: 0,
                  },
                  custom_domain_address: true,
                  dedicated_ip_address: {
                    dedicated_ip: true,
                    monthly_price: 1.99,
                    hourly_price: 0.00035,
                  },
                  modded_servers_allowed: true,
                  automated_backups: true,
                  planned_tasks: true,
                  prioritized_support: true,
                  sla: 99.95,
                  monthly_price: 0,
                  hourly_price: 0,
                },
                {
                  uuid: '',
                  name: 'Premium-12288',
                  players_slots: 64000,
                  plugins_limit: 64000,
                  ram_memory: 12288,
                  disk_space: {
                    current_disk_space: 120000,
                    min: 120000,
                    max: 240000,
                    monthly_price: 0,
                    hourly_price: 0,
                  },
                  port: {
                    current_nb_port: 0,
                    min: 0,
                    max: 5,
                    monthly_price: 0,
                    hourly_price: 0,
                  },
                  custom_domain_address: true,
                  dedicated_ip_address: {
                    dedicated_ip: true,
                    monthly_price: 1.99,
                    hourly_price: 0.00035,
                  },
                  modded_servers_allowed: true,
                  automated_backups: true,
                  planned_tasks: true,
                  prioritized_support: true,
                  sla: 99.95,
                  monthly_price: 0,
                  hourly_price: 0,
                },
              ],
            },
          ],
        },
      ],
    }
  },
  methods: {
    modify(tmp) {
      this.modifyPlan = tmp
      this.modifyModal = true
    },
    updateOffer() {},
  },
}
</script>

<style lang="scss" scoped>
.card-plan {
  width: 100%;
  max-width: 200px;
}
.bold {
  font-weight: bold;
  font-size: medium;
}
.price {
  color: $primary;
  font-size: medium;
}
.subText {
  color: lightgrey;
  font-size: small;
}
.marginPlayer {
  margin-top: 2%;
}
.link {
  background: none;
  border: none;
  color: $primary;
}
</style>
