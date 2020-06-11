import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

export default function ({store}) {
  let Router = new VueRouter({
    /*
     * NOTE! Change Vue Router mode from quasar.conf.js -> build -> vueRouterMode
     *
     * If you decide to go with "history" mode, please also set "build.publicPath"
     * to something other than an empty string.
     * Example: '/' instead of ''
     */
  
    // Leave as is and change from quasar.conf.js instead!
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE,
    scrollBehavior: () => ({ y: 0 }),
    routes
  })

  Router.beforeEach((to, from, next) => {
    if (to.name == 'Apps' && store.getters['token'] == null) next({ name: 'Login' })
    else next()

    if ((to.name == 'Login' || to.name == 'Register') && store.getters['token'] != null) next({name: 'Apps'})
    else next()

  })

  return Router
}

