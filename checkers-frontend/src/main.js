import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/lara-dark-indigo/theme.css'

const app = createApp(App);

app.use(PrimeVue);
app.use(VueCookies);

app.use(router)

app.mount('#app')
