import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Home from '@/components/Home'
import Contributors from '@/components/Contributors'
import TheLayout from '@/components/TheLayout'
import TheQueryBrowser from '@/components/TheQueryBrowser'
import TheResourceBrowser from '@/components/TheResourceBrowser'

import { TITLE_TEMPLATE } from '@/components/settings.js' 

const router = new Router({
  linkActiveClass: 'active',
  saveScrollPosition: true,
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: route => TITLE_TEMPLATE('Home'),
      },
    },
    {
      path: '/',
      component: TheLayout,
      children: [
        {
          path: '/query',
          name: 'query-browser',
          component: TheQueryBrowser,
          meta: {
            title: route => TITLE_TEMPLATE('Query Browser'),
          },
        },
        {
          path: '/browse',
          name: 'resource-browser',
          component: TheResourceBrowser,
          meta: {
            title: route => route.query.r ? TITLE_TEMPLATE('Describe ' + route.query.r) : TITLE_TEMPLATE('Resource Browser'),
          },
        },
        {
          path: '/contributors',
          name: 'contributors',
          component: Contributors,
          meta: {
            title: route => TITLE_TEMPLATE('Contributors'),
          },
        },
        {
          path: '/useful-links',
          name: 'useful-links',
          component: () => import('@/components/UsefulLinks'),
          meta: {
            title: route => TITLE_TEMPLATE('Useful Links'),
          },
        },
        {
          path: '/contact-us',
          name: 'contact-us',
          component: () => import('@/components/ContactUs'),
          meta: {
            title: route => TITLE_TEMPLATE('Contact Us'),
          },
        },
      ]
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
