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
    component: () => import('./pages/RecoveryOption.vue'),
    name: 'recovery.options',
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
