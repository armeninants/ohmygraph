import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Home from '@/components/Home'
import About from '@/components/About'
import TheQueryBrowser from '@/components/TheQueryBrowser'
import TheResourceBrowser from '@/components/TheResourceBrowser'

import { TITLE_TEMPLATE } from '@/components/settings.js' 

const router = new Router({
  linkActiveClass: 'active',
  saveScrollPosition: true,
  mode: 'history',
  routes: [
    {
      path: '/query',
      name: 'query-browser',
      component: TheQueryBrowser,
      meta: {
        title: route => TITLE_TEMPLATE('Query Browser'),
      },
    },
    {
      path: '/resource',
      name: 'resource-browser',
      component: TheResourceBrowser,
      meta: {
        title: route => route.query.r ? TITLE_TEMPLATE('Describe ' + route.query.r) : TITLE_TEMPLATE('Resource Browser'),
      },
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: {
        title: route => TITLE_TEMPLATE('About'),
      },
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: route => TITLE_TEMPLATE('Home'),
      },
    },
    {
      path: '*',
      redirect: { name: 'home' },
    },
  ],
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title(to)
  next()
})

export default router
