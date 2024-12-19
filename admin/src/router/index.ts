import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/Home.vue'
import NotFoundView from '../views/404.vue'
import LoginView from '../views/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home',
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: NotFoundView,
      meta: { title: '404' }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        title: 'Login',
      },
    }

  ]
})


// Change page title on route change
router.beforeEach((to, _from, next) => {
  document.title = `${to.meta.title} - Admin | Gigworks` || 'Gigworks'
  next()
})


export default router
