import { createRouter, createWebHistory } from 'vue-router'
import Game from '../views/Game.vue'
import Menu from '../views/Menu.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/Game',
      name: 'Game',
      component: Game
    },
    {
      path: '/',
      name: 'Menu',
     
      component: Menu
    }
  ]
})

export default router
