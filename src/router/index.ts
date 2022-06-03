import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../pages/homePage.vue'
import About from '../pages/aboutPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
