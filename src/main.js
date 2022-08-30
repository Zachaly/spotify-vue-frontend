import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '../node_modules/bulma/css/bulma.css'
import '../node_modules/bulmaswatch/darkly/bulmaswatch.min.css'
import Axios from 'axios'
import file from './plugins/file'
import store from './plugins/store'

Axios.defaults.baseURL = 'https://localhost:7061/api/';
Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

createApp(App)
.use(router)
.use(file)
.use(store)
.mount('#app')
