<template>
  <div class="my-card">
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">
          {{ offer.name }}
        </div>
        <div class="text-overline price">{{ offer.monthly_price }}€/month</div>
        <div class="text-overline">or</div>
        <div class="text-overline price">{{ offer.hourly_price }}€/hour</div>

        <q-separator inset class="q-ma-md" />

        <div v-if="offer.player > 1">
          Up to <span class="bold">{{ offer.players_slots }}</span> players
          connected at the same time.
        </div>
        <div v-else>
          Up to <span class="bold">{{ offer.players_slots }}</span> player
          connected at the same time.
        </div>
        <div>
          Up to <span class="bold">{{ offer.plugins_limit }}</span> plugins
        </div>
        <div>
          Up to <span class="bold">{{ offer.ram_memory }}</span> Go of RAM
        </div>
      </q-card-section>

      <q-card-separator />

      <q-card-section>
        <div>
          <q-btn
            outline
            class="full-width"
            color="secondary"
            label="modify"
            @click="updateModal = true"
          />
        </div>
      </q-card-section>

      <q-card-actions>
        <button @click="expand_disk_space = !expand_disk_space" class="link">
          Disk Space
        </button>
        <q-space />
        <q-btn
          color="grey"
          flat
          round
          dense
          :icon="
            expand_disk_space ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
          "
          @click="expand_disk_space = !expand_disk_space"
        />
      </q-card-actions>
      <q-slide-transition>
        <div v-show="expand_disk_space">
          <q-separator />
          <q-card-section class="text-subitle2 bg-grey-1">
            <li>
              <span class="bold">{{
                offer.disk_space.current_disk_space
              }}</span>
              GB
            </li>
          </q-card-section>
        </div>
      </q-slide-transition>

      <q-card-actions>
        <button @click="expand_port = !expand_port" class="link">
          Port
        </button>
        <q-space />
        <q-btn
          color="grey"
          flat
          round
          dense
          :icon="expand_port ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="expand_port = !expand_port"
        />
      </q-card-actions>
      <q-slide-transition>
        <div v-show="expand_port">
          <q-separator />
          <q-card-section class="text-subitle2 bg-grey-1">
            <li>
              <span class="bold">{{ offer.port.current_nb_port }}</span> Ports
              available
            </li>
          </q-card-section>
        </div>
      </q-slide-transition>

      <q-card-actions>
        <button
          @click="expand_dedicated_ip_address = !expand_dedicated_ip_address"
          class="link"
        >
          Dedicated IP Address
        </button>
        <q-space />
        <q-btn
          color="grey"
          flat
          round
          dense
          :icon="
            expand_dedicated_ip_address
              ? 'keyboard_arrow_up'
              : 'keyboard_arrow_down'
          "
          @click="expand_dedicated_ip_address = !expand_dedicated_ip_address"
        />
      </q-card-actions>
      <q-slide-transition>
        <div v-show="expand_dedicated_ip_address">
          <q-separator />
          <q-card-section class="text-subitle2 bg-grey-1">
            <li v-if="offer.dedicated_ip_address.dedicated_ip">
              Dedicated Ip Available
            </li>
            <li v-else>
              No Dedicated Ip Available
            </li>
            <li v-if="offer.dedicated_ip_address.dedicated_ip">
              <span class="bold">{{ offer.port.monthly_price }}</span
              >€/month
            </li>
            <li v-if="offer.dedicated_ip_address.dedicated_ip">
              <span class="bold">{{ offer.port.hourly_price }}</span
              >€/hour
            </li>
          </q-card-section>
        </div>
      </q-slide-transition>

      <q-card-actions>
        <button @click="expand_read_more = !expand_read_more" class="link">
          Show more
        </button>
        <q-space />
        <q-btn
          color="grey"
          flat
          round
          dense
          :icon="expand_read_more ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="expand_read_more = !expand_read_more"
        />
      </q-card-actions>
      <q-slide-transition>
        <div v-show="expand_read_more">
          <q-separator />
          <q-card-section class="text-subitle2 bg-grey-1">
            <li v-if="offer.custom_domain_address">
              Custom domain address
            </li>
            <li v-if="offer.modded_servers_allowed">
              Modded Servers allowed
            </li>
            <li v-if="offer.automated_backups">
              Automated backups
            </li>
            <li v-if="offer.planned_tasks">
              Planned tasks
            </li>
            <li v-if="offer.prioritized_support">
              Prioritized Support
            </li>
          </q-card-section>
        </div>
      </q-slide-transition>
    </q-card>
    <update-offer-dialog
      :offer="offer"
      :visible="updateModal"
      @close="updateModal = false"
    />
  </div>
</template>

<script>
import UpdateOfferDialog from './UpdateOfferDialog'

export default {
  name: 'SingleOfferCard',
  components: {
    UpdateOfferDialog,
  },
  props: {
    offer: { type: Object },
  },
  data() {
    return {
      expand_read_more: false,
      expand_disk_space: false,
      expand_port: false,
      expand_dedicated_ip_address: false,
      updateModal: false,
    }
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
