import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import "bootstrap/dist/css/bootstrap.min.css"
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js"
import "bootstrap-icons/font/bootstrap-icons.css"
import 'sweetalert2/dist/sweetalert2.min.css'
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';


import './assets/main.css'

const app = createApp(App)


app.use(bootstrap)
app.use(createPinia())
app.use(router)
app.use(VCalendar, {})
app.mount('#app')
