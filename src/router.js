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
          component: () => import("./views/Dashboard.vue")
        },
        {
          path: "/create",
          name: "create server",
          component: () => import("./views/CreateServer.vue")
        }
      ],
      beforeEnter: (to, from, next) => {
        if (store.state.user == null) next("/login");
        else next();
      }
    },
    {
      path: "/dashboard/:id",
      component: DashboardAppLayout,
      children: [
        {
          path: "/",
          name: "Overview",
          component: () => import("./views/Dashboard/AppOverview.vue")
        },
        {
          path: "logs",
          name: "Logs",
          component: () => import("./views/Dashboard/AppLogs.vue")
        },
        {
          path: "environment",
          name: "environment",
          component: () => import("./views/Dashboard/AppEnvironment.vue")
        },
        {
          path: "invite",
          name: "invite",
          component: () => import("./views/Dashboard/AppInvite.vue")
        }
      ],
      beforeEnter: (to, from, next) => {
        if (store.state.user == null) next("/login");
        else next();
      }
    },
    {
      path: "/auth/github",
      name: "Github",
      component: () => import("./views/Github.vue")
    },
    {
      path: "/admin",
      component: () => import("./layout/AdminLayout.vue"),
      children: [
        {
          path: "",
          name: "Admin",
          component: () => import("./views/Admin/AdminHome.vue")
        },
        {
          path: "offers",
          name: "Offers",
          component: () => import("./views/Admin/AdminOffers.vue")
        },
        {
          path: "user/:id/servers",
          name: "User Servers",
          component: () => import("./views/Admin/User/AdminUserServers.vue")
        }
      ],
      beforeEnter: (to, from, next) => {
        if (store.state.user === null) next("/login");
        else if (store.state.user.Role !== "admin") next("/");
        else next();
      }
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("./views/UserProfile.vue")
    },
    {
      path: "/feedback",
      name: "feedback",
      component: () => import("./views/Feedback.vue")
    },
    {
      path: "/confirm",
      name: "confirmAccount",
      component: () => import("./components/ConfirmUser.vue")
    },
    {
      path: "/bills",
      name: "bills",
      component: () => import("./views/Bills.vue")
    },
    {
      path: "/checkout",
      name: "checkout",
      component: () => import("./views/Checkout.vue")
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
            import(/* webpackChunkName: "demo" */ "./views/Login.vue")
        },
        {
          path: "/register",
          name: "register",
          component: () =>
            import(/* webpackChunkName: "demo" */ "./views/Register.vue")
        }
      ],
      beforeEnter: (to, from, next) => {
        if (store.state.user != null) next("/dashboard");
        else next();
      }
    },
    {
      path: "/logout",
      name: "logout",
      beforeEnter: (to, from, next) => {
        console.log("coucou");
        store.commit("setUser", null);
        store.commit("setClient", null);
        next("/login");
      }
    }
  ]
});
