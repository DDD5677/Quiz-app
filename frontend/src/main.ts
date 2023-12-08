import './assets/style.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import router from './router'
import DarkButtonVue from './components/UI/DarkButton.vue'

const app = createApp(App)
app.component('dark-button', DarkButtonVue);
app.use(createPinia())
app.use(router)

app.mount('#app')
