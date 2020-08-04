import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _2fcd1eb5 = () => interopDefault(import('../pages/apps/index.vue' /* webpackChunkName: "pages/apps/index" */))
const _1ce9faae = () => interopDefault(import('../pages/apps/create.vue' /* webpackChunkName: "pages/apps/create" */))
const _3ba5fd59 = () => interopDefault(import('../pages/auth/signin.vue' /* webpackChunkName: "pages/auth/signin" */))
const _503c53cf = () => interopDefault(import('../pages/auth/signup.vue' /* webpackChunkName: "pages/auth/signup" */))
const _3734ad62 = () => interopDefault(import('../pages/apps/_app.vue' /* webpackChunkName: "pages/apps/_app" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/apps",
    component: _2fcd1eb5,
    name: "apps"
  }, {
    path: "/apps/create",
    component: _1ce9faae,
    name: "apps-create"
  }, {
    path: "/auth/signin",
    component: _3ba5fd59,
    name: "auth-signin"
  }, {
    path: "/auth/signup",
    component: _503c53cf,
    name: "auth-signup"
  }, {
    path: "/apps/:app?",
    component: _3734ad62,
    name: "apps-app"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
