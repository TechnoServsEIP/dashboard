import Vue from "vue";
import Router from "vue-router";
import store from "./store";

import DashboardLayout from "@/layout/DashboardLayout";
import AuthLayout from "@/layout/AuthLayout";
import DashboardAppLayout from "@/layout/DashboardAppLayout";

Vue.use(Router);

const router = new Router({
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/",
      redirect: "dashboard",
      component: DashboardLayout,
      meta : {
        title: 'TechnoServs - Dashboard'
      },
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          component: () => import("./views/Dashboard.vue"),
          meta : {
            title: 'TechnoServs - Dashboard'
          },
        },
        {
          path: "/create",
          name: "create server",
          component: () => import("./views/CreateServer.vue"),
          meta : {
            title: 'TechnoServs - Create Server'
          },
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
          component: () => import("./views/Dashboard/AppOverview.vue"),
          meta : {
            title: 'TechnoServs - Overview'
          },
        },
        {
          path: "logs",
          name: "Logs",
          component: () => import("./views/Dashboard/AppLogs.vue"),
          meta : {
            title: 'TechnoServs - Logs'
          },
        },
        {
          path: "environment",
          name: "environment",
          component: () => import("./views/Dashboard/AppEnvironment.vue"),
          meta : {
            title: 'TechnoServs - Environment'
          },
        },
        {
          path: "invite",
          name: "invite",
          component: () => import("./views/Dashboard/AppInvite.vue"),
          meta : {
            title: 'TechnoServs - Invite Friends'
          },
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
      meta : {
        title: 'TechnoServs Admin'
      },
      children: [
        {
          path: "",
          name: "Admin",
          component: () => import("./views/Admin/AdminHome.vue"),
        },
        {
          path: "offers",
          name: "Offers",
          component: () => import("./views/Admin/AdminOffers.vue"),
          meta : {
            title: 'TechnoServs Admin - Offers'
          },
        },
        {
          path: "users",
          name: "Users",
          component: () => import("./views/Admin/AdminUser.vue"),
          meta : {
            title: 'TechnoServs Admin - Users'
          },
        },
        {
          path: "servers",
          name: "Servers",
          component: () => import("./views/Admin/AdminServer.vue"),
          meta : {
            title: 'TechnoServs Admin - Servers'
          },
        },
        {
          path: "user/:id/servers",
          name: "User Servers",
          component: () => import("./views/Admin/User/AdminUserServers.vue"),
          meta : {
            title: 'TechnoServs Admin - User Servers'
          },
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
      component: () => import("./views/UserProfile.vue"),
      meta : {
        title: 'TechnoServs - Profile'
      },
    },
    {
      path: "/feedback",
      name: "feedback",
      component: () => import("./views/Feedback.vue"),
      meta : {
        title: 'TechnoServs - Feedback'
      },
    },
    {
      path: "/confirm",
      name: "confirmAccount",
      component: () => import("./components/ConfirmUser.vue")
    },
    {
      path: "/bills",
      name: "bills",
      component: () => import("./views/Bills.vue"),
      meta : {
        title: 'TechnoServs - Bills'
      },
    },
    {
      path: "/checkout",
      name: "checkout",
      component: () => import("./views/Checkout.vue"),
      meta : {
        title: 'TechnoServs - Checkout'
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
          meta : {
            title: 'TechnoServs - Login'
          },
          component: () =>
            import(/* webpackChunkName: "demo" */ "./views/Login.vue")
        },
        {
          path: "/register",
          name: "register",
          meta : {
            title: 'TechnoServs - Register'
          },
          component: () =>
            import(/* webpackChunkName: "demo" */ "./views/Register.vue")
        },
        {
          path: "/terms-of-use",
          name: "terms-of-use",
          meta : {
            title: 'TechnoServs - Terms of use'
          },
          component: () =>
            import(/* webpackChunkName: "demo" */ "./views/TermsOfUse.vue")
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
        store.commit("setUser", null);
        store.commit("setClient", null);
        next("/login");
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if(nearestWithTitle) document.title = nearestWithTitle.meta.title;

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if(!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta');

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key]);
    });

    // We use this to track which meta tags we create, so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '');

    return tag;
  })
  // Add the meta tags to the document head.
  .forEach(tag => document.head.appendChild(tag));

  next();
});

export default router