import Vue from 'vue'
import App from './App'
import MessageTree from '../src/main.js'
import { InputNumber } from 'element-ui'



Vue.use(InputNumber)
Vue.use(MessageTree)


new Vue({
  render(h) {
    return h(App)
  },
}).$mount('#app')
