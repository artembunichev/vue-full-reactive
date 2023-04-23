import { createApp } from 'vue'
import App from './app.vue'
import { counterStore } from './store/counter-store'
import './style.css'

createApp( App ).provide( 'counterStore', counterStore ).mount( '#app' )
