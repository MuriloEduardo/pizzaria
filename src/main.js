import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import HomeComponent from './components/HomeComponent.vue'

import ProfileComponent from './components/auth/ProfileComponent.vue'
import LoginComponent from './components/auth/LoginComponent.vue'
import RegisterComponent from './components/auth/RegisterComponent.vue'

import Error404Component from './components/Error404Component.vue'

// Pizzas
import BrowseComponent from './components/pizzas/BrowseComponent.vue'
import ReadComponent from './components/pizzas/ReadComponent.vue'

Vue.config.productionTip = false
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeComponent
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileComponent
    },
    {
      path: '/login',
      name: 'login',
      component: LoginComponent
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterComponent
    },
    {
      path: '/pizzas',
      name: 'pizzas',
      component: BrowseComponent,
      children: [
        {
          path: ':pizza_id',
          name: 'pizza',
          component: ReadComponent
        }
      ]
    },
    {
      path: '*',
      name: '404',
      component: Error404Component
    }
  ]
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
