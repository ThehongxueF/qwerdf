import Vue from 'vue'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/plugins/vue-ls'
import '@/plugins/ele-form'
import '@/plugins/froala'
import '@/plugins/socket'
import '@/plugins/dom-purify'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import { Local } from '@/utils/storage'

import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

Vue.use(Element, {
  size: Local.get('size') || 'medium' // set element-ui default size
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
