import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import App from './App.vue'
import store from './store'

import './plugins/bootstrap-vue'
import './plugins/instant-search'


Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
