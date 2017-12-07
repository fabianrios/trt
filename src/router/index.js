import Vue from 'vue'
import Router from 'vue-router'
import VueSession from 'vue-session'
import VueScrollTo from 'vue-scrollto'

import VueNotifications from 'vue-notifications'
import miniToastr from 'mini-toastr'

import HelloWorld from '@/components/HelloWorld'
import Content from '@/components/Content'
import Series from '@/components/Series'
import Profile from '@/components/Profile'

const toastTypes = {
  success: 'success',
  error: 'error',
  info: 'info',
  warn: 'warn'
}

// This step requires only for mini-toastr, just an initialization
miniToastr.init({types: toastTypes})

function toast ({title, message, type, timeout, cb}) {
  return miniToastr[type](message, title, timeout, cb)
}

const options = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast
}

Vue.use(Router)
Vue.use(VueSession)
Vue.use(VueNotifications, options)
Vue.use(VueScrollTo)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    },
    {
      path: '/content',
      name: 'Content',
      component: Content
    },
    {
      path: '/series',
      name: 'Series',
      component: Series
    },
    {
      path: '/profile/:id',
      name: 'Profile',
      component: Profile
    }
  ]
})
