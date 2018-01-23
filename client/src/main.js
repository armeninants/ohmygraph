import 'font-awesome/css/font-awesome.css'
import '@/styles/app.scss'
import '@/scripts/ai-notify/ai-notify.js'
import '@/scripts/ai-notify/ai-notify.css'

import Vue from 'vue'
import VeeValidate from 'vee-validate';
import VueAnalytics from 'vue-analytics'
import QueryEngine from '@/components/QueryEngine'
import globalMixins from '@/components/global-mixins'
import App from './App'
import router from './router'
import store from './store'

import VueLocalStorage from 'vue-localstorage'
import { AJAX_TIMEOUT_MS } from '@/components/settings'


Vue.config.productionTip = false

Vue.use(VueAnalytics, {
  id: CONF.GA_TRACKING_ID,
  router,
})
Vue.use(VueLocalStorage, {
  name: 'ls',
  bind: true,
})
Vue.use(VeeValidate, { inject: false });
Vue.use(QueryEngine)

Vue.mixin(globalMixins)

store.dispatch('initState');

jQuery.ajaxSetup({
  timeout: AJAX_TIMEOUT_MS,
})

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
