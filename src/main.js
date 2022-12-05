import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router/index.js"
import store from "./store/index.js"

const server = createApp(App)
server.use(router)
server.use(store)
server.mount('#app')
