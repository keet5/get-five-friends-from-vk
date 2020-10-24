import { createApp } from 'vue'
import App from './App.vue'
import vkSdk from './plugins/vkSdk'



const access_token = [0, 'c87ce6bf83f4a947dfe4ef6fb0cffa841c5686225b1054be6be45a7ab31b62d507c50da8eace75c000b7c']

createApp(App).use(vkSdk, access_token[1]).mount('#app')
