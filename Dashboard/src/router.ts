import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

import Login from './views/Login.vue'
import Main from './views/Main.vue'
import Manage from './views/ManageGraph.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { layout: 'empty' },
  },
  {
    path: '/Main',
    name: 'Main',
    component: Main,
  },
  {
    path: '/Graphs/:id',
    name: 'Manage',
    component: Manage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
