import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SearchView from '../views/SearchView.vue'
import MusicianView from '../views/MusicianView.vue'
import AlbumView from '../views/AlbumView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import UserProfileView from '../views/UserProfileView.vue'
import PlaylistView from '../views/PlaylistView.vue'

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
  },
  {
    path: '/login',
    name : 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/userprofile/:id',
    name: 'userprofile',
    component: UserProfileView,
    props: true
  },
  {
    path: '/playlist/:id',
    name: 'playlist',
    component: PlaylistView,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
