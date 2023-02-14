import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入自己的UI组件库
import UI from '@/components/library/index.js'

// 重置样式
import 'normalize.css'
// 自己的重置样式和公共样式
import '@/assets/styles/common.less'

createApp(App).use(store).use(router).use(UI).mount('#app')
