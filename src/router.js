import Vue from "vue";
import Router from "vue-router";
import store from "./store";

import DashboardLayout from "@/layout/DashboardLayout";
import AuthLayout from "@/layout/AuthLayout";
import DashboardAppLayout from "@/layout/DashboardAppLayout";

Vue.use(Router);

export default new Router({
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/",
      redirect: "dashboard",
      component: DashboardLayout,
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          component: () => import("./views/Dashboard.vue"),
        },
        {
          path: "/create",
          name: "create server",
          component: () => import("./views/CreateServer.vue"),
        },
      ],
      beforeEnter: (to, from, next) => {
        if (store.state.user == null) next("/login");
        else next();
      },
    },
    {
      path: "/dashboard/:id",
      component: DashboardAppLayout,
      children: [
        {
          path: "/",
          name: "Overview",
          component: () => import("./views/Dashboard/AppOverview.vue"),
        },
        {
          path: "logs",
          name: "Logs",
          component: () => import("./views/Dashboard/AppLogs.vue"),
        },
      ],
      beforeEnter: (to, from, next) => {
        if (store.state.user == null) next("/login");
        else next();
      },
    },
    {
      path: "/admin",
      component: () => import("./layout/AdminLayout.vue"),
      children: [
        {
          path: "",
          name: "Admin",
          component: () => import("./views/Admin/AdminHome.vue"),
        },
      ],
      beforeEnter: (to, from, next) => {
        if (store.state.user === null) next("/login");
        else if (store.state.user.Role !== "admin") next("/");
        else next();
      },
    },
    {
      path: "/",
      redirect: "login",
      component: AuthLayout,
      children: [
        {
          path: "/login",
          name: "login",
          component: () =>
            import(/* webpackChunkName: "demo" */ "./views/Login.vue"),
        },
        {
          path: "/register",
          name: "register",
          component: () =>
            import(/* webpackChunkName: "demo" */ "./views/Register.vue"),
        },
      ],
      beforeEnter: (to, from, next) => {
        if (store.state.user != null) next("/dashboard");
        else next();
      },
    },
    {
      path: "/logout",
      name: "logout",
      beforeEnter: (to, from, next) => {
        console.log("coucou");
        store.commit("setUser", null);
        store.commit("setClient", null);
        next("/login");
      },
    },
  ],
});
