import jQuery from 'jquery/src/jquery.js'
import 'bootstrap/dist/js/bootstrap.js'
import 'font-awesome/css/font-awesome.css'
import '@/styles/app.scss'
import '@/scripts/ai-notify/ai-notify.js'
import '@/scripts/ai-notify/ai-notify.css'
import globalMixins from '@/components/global-mixins'
import QueryEngine from '@/components/QueryEngine'
import VeeValidate from 'vee-validate';

import Vue from 'vue'
import VueLocalStorage from 'vue-localstorage'
import App from './App'
import router from './router'
import { AJAX_TIMEOUT_MS } from '@/components/settings'

import VueAnalytics from 'vue-analytics'

Vue.config.productionTip = false

Vue.use(VueAnalytics, {
  id: 'UA-112492138-1'
})

Vue.use(VueLocalStorage, {
  name: 'ls',
  bind: true
})
Vue.use(VeeValidate);

Vue.use(QueryEngine)

Vue.mixin(globalMixins)

jQuery.ajaxSetup({
  timeout: AJAX_TIMEOUT_MS,
})

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
