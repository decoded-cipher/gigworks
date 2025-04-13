import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/Home.vue'
import BusinessView from '../views/Business.vue'
import NotFoundView from '../views/404.vue'
import LoginView from '../views/Login.vue'
import category from '../views/Category.vue'
import SubCategory from '../views/SubCategory.vue'
import SubCategoryOptions from '../views/subCategoryOptions.vue'
import licenseTypes from '../views/licenseTypes.vue'
import partners from '../views/partners.vue'

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
      path: '/business',
      name: 'business',
      component: BusinessView,
      meta: {
        title: 'Business',
      },
    },
    {
      path: '/partners',
      name: 'partners',
      component: partners,
      meta: {
        title: 'partners',
      },
    },
    
    {
      path: '/category',
      name: 'category',
      component: category,
      meta: {
        title: 'category',
      },
    },
    {
      path: '/SubCategory/:id',
      name: 'SubCategory',
      component:  SubCategory,
      meta: {
        title: 'SubCategory',
      },
    },
    {
      path: '/SubCategoryOptions/:id',
      name: 'SubCategoryOptions',
      component:  SubCategoryOptions,
      meta: {
        title: 'SubCategoryOptions',
      },
    },
    {
      path: '/license-types',
      name: 'licenseTypes',
      component:  licenseTypes,
      meta: {
        title: 'licenseTypes',
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
