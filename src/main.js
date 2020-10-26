import { createApp } from 'vue'
import App from './App.vue'
import vkSdk from './plugins/vkSdk'

createApp(App).use(vkSdk).mount('#app')
