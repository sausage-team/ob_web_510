import Vue from 'vue'
import * as ElementUI from 'element-ui'
import iview from 'iview'
import lodash from 'lodash'
import jquery from 'jquery'
import echarts from 'echarts'
import Cookies from 'js-cookie'

import App from './App.vue'
import utils from './utils'
import router from './routers/router'
import store from './stores'
import { services } from './services'
import Components from './components'
import './sw/registerServiceWorker'

import 'element-ui/lib/theme-chalk/index.css'
import 'iview/dist/styles/iview.css'
import './assets/sass/main.scss'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(iview)
Components.init(Vue)

Vue.prototype = Object.assign(Vue.prototype, {
  ...services,
  _: lodash,
  $: jquery,
  utils,
  echarts,
  cookies: Cookies,
  CKEDITOR: window.CKEDITOR
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
