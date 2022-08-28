import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '../node_modules/bulma/css/bulma.css'
import '../node_modules/bulmaswatch/darkly/bulmaswatch.min.css'
import Axios from 'axios'
import image from './plugins/image'
import store from './plugins/authorization'

Axios.defaults.baseURL = 'https://localhost:7061/api/';
Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

createApp(App)
.use(router)
.use(image)
.use(store)
.mount('#app')
