import '@/assets/styles/bootstrap.scss'
import { createApp } from 'vue'
import Vue3Toastify, { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

import App from './App.vue'
import router from './router'
import pinia from './store'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.use(Vue3Toastify, {
  theme: 'colored',
  autoClose: 3000,
  position: toast.POSITION.BOTTOM_CENTER,
})

app.mount('#app')
