export default {
  Offers: [
    {
      uuid: 1,
      name: 'Minecraft Offers',
      offer_types: [
        {
          uuid: 1,
          name: 'Starter',
          type: 'shared',
          models: [
            {
              uuid: 1,
              name: 'Starter-2048',
              players_slots: 10,
              plugins_limit: 10,
              ram_memory: 2048,
              disk_space: {
                current_disk_space: 0,
                min: 0,
                max: 0,
                monthly_price: 0.0,
                hourly_price: 0.0,
              },
              port: {
                current_nb_port: 0,
                min: 0,
                max: 5,
                monthly_price: 0.0,
                hourly_price: 0.0,
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
              monthly_price: 1.99,
              hourly_price: 0.0035,
            },
          ],
        },
      ],
    },
  ],
}
