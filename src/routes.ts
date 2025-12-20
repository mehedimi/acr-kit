import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('./pages/Overview.vue'),
    name: 'overview',
  },
  {
    path: '/connect',
    component: () => import('./pages/Connect.vue'),
    name: 'connect',
  },
  {
    path: '/carts',
    component: () => import('./pages/cart/Index.vue'),
    name: 'cart.index',
    children: [
      {
        path: ':id',
        component: () => import('./pages/cart/Show.vue'),
        name: 'cart.show',
      },
    ],
  },
  {
    path: '/recovery-options',
    component: () => import('./pages/recover/Recover.vue'),
    children: [
      {
        path: '',
        component: () => import('./pages/recover/Index.vue'),
        name: 'recovery.options',
      },
      {
        path: 'emails',
        component: () => import('./pages/recover/Email.vue'),
        name: 'recovery.options.email',
      },
      {
        path: 'emails/:emailId',
        component: () => import('./pages/recover/Builder.vue'),
        name: 'recovery.email.builder',
      },
    ],
  },
  {
    path: '/utilities',
    component: () => import('./pages/utilities/Utilities.vue'),
    children: [
      {
        path: '',
        component: () => import('./pages/utilities/Index.vue'),
        name: 'utilities.index',
      },
      {
        path: 'tab-notification',
        component: () => import('./pages/utilities/TabNotification.vue'),
        name: 'utilities.tab-notification',
      }
    ],
  },
  {
    path: '/settings',
    component: () => import('./pages/settings/Configuration.vue'),
    children: [
      {
        path: '',
        component: () => import('./pages/settings/Index.vue'),
        name: 'configurations',
      },
      {
        path: 'email',
        name: 'configurations.email',
        component: () => import('./pages/settings/Email.vue'),
      },
    ],
  },
]
