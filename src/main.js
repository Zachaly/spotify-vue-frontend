import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '../node_modules/bulmaswatch/darkly/bulmaswatch.min.css'
import Axios from 'axios'

Axios.defaults.baseURL = 'https://localhost:7061/api/';
Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

createApp(App).use(router).mount('#app')
