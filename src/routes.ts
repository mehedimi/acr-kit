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
    component: () => import('./pages/Utilities.vue'),
    name: 'utilities',
  },
  {
    path: '/configurations',
    component: () => import('./pages/Configuration.vue'),
    name: 'configurations',
  },
]
