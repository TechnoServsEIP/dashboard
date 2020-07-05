const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('layouts/Authentication.vue'),
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('pages/Auth/AuthLogin.vue'),
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('pages/Auth/AuthRegister.vue'),
      },
    ],
  },
  {
    path: '/admin/',
    component: () => import('pages/Admin/AdminRouter.vue'),
    children: [
      {
        path: '/',
        component: () => import('pages/Admin/AdminLayout.vue'),
        children: [
          {
            path: '/',
            component: () => import('pages/Admin/AdminIndex.vue'),
          },
          {
            path: 'users',
            name: 'UserList',
            component: () => import('pages/Admin/Users/UserList.vue'),
          },
          {
            path: 'users/:id',
            name: 'UserInfo',
            component: () => import('pages/Admin/Users/UserInfo.vue'),
          },
          {
            path: 'roles',
            name: 'RoleList',
            component: () => import('pages/Admin/Users/RoleList.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/apps/',
    component: () => import('pages/Index.vue'),
    children: [
      {
        path: '/',
        name: 'Apps',
        component: () => import('pages/Servers/Applications.vue'),
      },
      {
        path: 'server/:id',
        component: () => import('pages/Servers/ServerLayout.vue'),
        children: [
          {
            path: '/',
            component: () => import('pages/Servers/ServerIndex.vue'),
          },
          {
            path: '/apps/server/:id/resources',
            name: 'Resources',
            component: () => import('pages/Servers/ServerResources.vue'),
          },
          {
            path: '/apps/server/:id/environment',
            name: 'Environment',
            component: () => import('pages/Servers/ServerEnvironment.vue'),
          },
          {
            path: '/apps/server/:id/deploy',
            name: 'Deployments',
            component: () => import('pages/Servers/ServerDeployments.vue'),
          },
          {
            path: '/apps/server/:id/code',
            name: 'Code',
            component: () => import('pages/Servers/ServerCode.vue'),
          },
        ],
      },
      {
        path: 'create',
        name: 'Create',
        component: () => import('pages/CreateServer/Stepper.vue'),
      },
      {
        path: 'create/name',
        name: 'CreateName',
        component: () => import('components/CreateServer/NameStepper.vue'),
      },
      {
        path: 'create/game',
        name: 'CreateGame',
        component: () => import('components/CreateServer/GameStepper.vue'),
      },
      {
        path: 'create/plan',
        name: 'CreatePlan',
        component: () => import('components/CreateServer/PlanStepper.vue'),
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('pages/Setting/Setting.vue'),
      },
    ],
  },
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  })
}

export default routes
