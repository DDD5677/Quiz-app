import './assets/style.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import router from './router'
import DarkButton from './components/UI/DarkButton.vue'
import Checkbox from './components/UI/checkbox.vue'
import MainInput from './components/UI/MainInput.vue'
import Loader from './components/UI/Loader.vue'

const app = createApp(App)
app.component('dark-button', DarkButton);
app.component('check-box', Checkbox);
app.component('main-input', MainInput);
app.component('Loader', Loader);
app.use(createPinia())
app.use(router)

app.mount('#app')