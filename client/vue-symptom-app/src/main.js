import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Assuming you set up Vue Router

const app = createApp(App)

app.use(router) // Use Vue Router

app.mount('#app')