import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SearchView from '../views/SearchView.vue'
import MusicianView from '../views/MusicianView.vue'
import AlbumView from '../views/AlbumView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/search',
    name: 'search',
    component: SearchView
  },
  {
    path: '/musician/:id',
    name: 'musician',
    component: MusicianView,
    props: true
  },
  {
    path: '/album/:id',
    name: 'album',
    component: AlbumView,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
