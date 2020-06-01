import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/layout/Main'
import Auth from '@/layout/Auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/redirect',
    component: Main,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: Auth,
    children: [
      {
        path: '',
        component: () => import('@/views/login/index.vue'),
        name: 'Login',
        hidden: true
      }
    ]
  },
  {
    path: '/register',
    component: Auth,
    children: [
      {
        path: '',
        component: () => import('@/views/register/index.vue'),
        name: 'Register',
        hidden: true
      }
    ]
  },
  {
    path: '/thank-you',
    component: Auth,
    children: [
      {
        path: '',
        component: () => import('@/views/register/ThankYou.vue'),
        name: 'ThankYou',
        hidden: true
      }
    ]
  },
  {
    path: '/dashboard',
    redirect: 'ws/redirect'
  },
  {
    path: '/',
    component: Main,
    redirect: { name: 'WorkspaceRedirect' },
    children: [
      {
        path: 'ws/redirect',
        hidden: true,
        name: 'WorkspaceRedirect',
        component: () => import('@/views/workspace/redirect')
      },
      {
        path: 'ws/:slug',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
        name: 'Dashboard',
        props: true,
        meta: {
          title: 'dashboard'
        }
      },
      {
        path: '/ws/:slug/settings',
        name: 'Workspace',
        component: () =>
          import('@/views/workspace/index.vue'),
        children: [
          {
            path: '',
            name: 'WorkspaceSettings'
          }
        ]
      }
    ]
  },
  {
    path: '/maps',
    component: Main,
    meta: { hidden: true },
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "maps" */ '@/views/maps/index.vue'),
        name: 'Maps',
        meta: {
          title: 'Maps'
        }
      }
    ]
  },
  {
    path: '/reports',
    component: Main,
    meta: { hidden: true },
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "reports" */ '@/views/reports/index.vue'),
        name: 'Reports',
        meta: {
          title: 'Reports'
        }
      }
    ]
  },
  {
    path: '/profile',
    component: Main,
    meta: { hidden: true },
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "profile" */ '@/views/profile/index.vue'),
        name: 'Profile',
        meta: {
          title: 'Profile'
        }
      }
    ]
  },
  {
    path: '/tables',
    component: Main,
    meta: { hidden: true },
    children: [
      {
        path: '',
        component: () =>
          import(/* webpackChunkName: "tables" */ '@/views/tables/index.vue'),
        name: 'Tables',
        meta: {
          title: 'Table List'
        }
      },
      {
        path: 'details/:tableUuid',
        component: () =>
          import(
            /* webpackChunkName: "tables-details" */ '@/views/tables/TableDetails.vue'
          ),
        name: 'TableDetails',
        meta: {
          title: 'Table Data'
        }
      }
    ]
  },
  { path: '*', redirect: { name: 'error404' }},
  {
    path: '/404',
    name: 'error404',
    component: () => import('@/views/error/404.vue')
  },
  {
    path: '/403',
    name: 'error403',
    component: () => import('@/views/error/403.vue')
  },
  {
    path: '/welcome',
    component: Main,
    meta: { hidden: true },
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "workspace" */ '@/views/workspace/Welcome.vue'),
        name: 'Welcome',
        meta: {
          title: 'Welcome'
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
