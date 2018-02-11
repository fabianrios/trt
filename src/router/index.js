import Vue from 'vue'
import Router from 'vue-router'
import VueSession from 'vue-session'
import VueScrollTo from 'vue-scrollto'

import VueNotifications from 'vue-notifications'
import miniToastr from 'mini-toastr'

import HelloWorld from '@/components/HelloWorld'
import Content from '@/components/Content'
import About from '@/components/About'
import Terms from '@/components/Terms'
import Privacy from '@/components/Privacy'
import Careers from '@/components/Careers'
import HelpCenter from '@/components/HelpCenter'
import ContactUs from '@/components/ContactUs'
import Series from '@/components/Series'
import Serie from '@/components/Serie'
import Episode from '@/components/Episode'
import Profile from '@/components/Profile'
import Adminseries from '@/components/Adminseries'
import Adminepisodes from '@/components/Adminepisodes'
import Adminusers from '@/components/Adminusers'

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
      path: '/helpcenter',
      name: 'HelpCenter',
      component: HelpCenter
    },
    {
      path: '/content',
      name: 'Content',
      component: Content
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/terms',
      name: 'Terms',
      component: Terms
    },
    {
      path: '/careers',
      name: 'Careers',
      component: Careers
    },
    {
      path: '/contactus',
      name: 'ContactUs',
      component: ContactUs
    },
    {
      path: '/privacy',
      name: 'Privacy',
      component: Privacy
    },
    {
      path: '/series',
      name: 'Series',
      component: Series
    },
    {
      path: '/serie/:id',
      name: 'Serie',
      component: Serie
    },
    {
      path: '/profile/:id',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/episode/:id',
      name: 'Episode',
      component: Episode
    },
    {
      path: '/admin/series',
      name: 'Adminseries',
      component: Adminseries
    },
    {
      path: '/admin/episodes',
      name: 'Adminepisodes',
      component: Adminepisodes
    },
    {
      path: '/admin/users',
      name: 'Adminusers',
      component: Adminusers
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (to.hash) {
        return {
          selector: to.hash
        }
      } else {
        return { x: 0, y: 0 }
      }
    }
  }
})
