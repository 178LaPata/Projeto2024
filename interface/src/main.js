import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './index.css'
import App from './App.vue'
import router from "./routers/routers.js";

createApp(App).use(router).use(createPinia()).mount('#app')
