
import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Container from '@/components/molecules/VContainer.vue'

import App from './App.vue'
import router from './router'


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('Container', Container)


app.mount('#app')
